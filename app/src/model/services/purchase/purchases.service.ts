import { Category, Purchase, PurchaseCategory } from '@model/domain';
import { defaultCategories } from '@model/domain/constants/categories';
import { getDB } from '@model/firebase-config';
import { UserService } from '@model/services/user';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentSnapshot,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  QueryConstraint,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import i18n from 'i18n-js';
import { BaseService } from '../base.service';
import { CategoryService } from '../category';

export type PurchaseModel = {
  id: string;
  userId: string;
  amount: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  category: PurchaseCategory | string;
  secondaryCategory?: string | null;
};

export class PurchaseService extends BaseService<PurchaseModel> {
  private userService: UserService;
  private categoryService: CategoryService;

  constructor() {
    super('purchases');
    this.userService = new UserService();
    this.categoryService = new CategoryService();
  }

  async createdPurchase(
    userId: string,
    amount: string,
    category: PurchaseCategory | string,
    secondaryCategory?: string | null,
    modifiedCreatedAt?: Timestamp
  ): Promise<Purchase> {
    const createdAtTimestamp = modifiedCreatedAt ?? Timestamp.now();
    const updatedAtTimestamp = Timestamp.now();

    const purchasesCollectionRef = collection(getDB(), 'purchases');
    const insertedPurchase = await addDoc(purchasesCollectionRef, {
      userId,
      amount,
      category,
      secondaryCategory: secondaryCategory ?? null,
      createdAt: createdAtTimestamp,
      updatedAt: updatedAtTimestamp,
    });

    const currentUser = await this.userService.getUserByUserId(userId);
    if (currentUser) {
      const currentBalance = Number(currentUser.balance) || 0;
      await this.userService.updateBasicDetails(userId, {
        ...currentUser,
        balance: currentBalance - Number(amount),
      });
    }

    return new Purchase({
      id: insertedPurchase.id,
      userId,
      amount,
      category: typeof category === 'string' ? category : (category as Category)?.title ?? '',
      secondaryCategory: secondaryCategory ?? null,
      createdAt: createdAtTimestamp,
      updatedAt: updatedAtTimestamp,
    });
  }

  async getAllPurchases(userId: string): Promise<Purchase[]> {
    const queryData = query(
      this.collection,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(9998)
    );

    const snapshot = await getDocs(queryData);
    if (snapshot.empty) return [];

    return snapshot.docs.map(PurchaseService.toDomainObject);
  }

  async joinCategoriesIntoPurchases(userId: string): Promise<Purchase[]> {
    try {
      const userCategories = await this.categoryService.getAllCategories(userId);
      const allCategories = [...defaultCategories, ...userCategories];
      const purchases = await this.getAllPurchases(userId);

      return purchases.map((purchase) => {
        const categoryObj = allCategories.find((cat) => {
          if (cat.isDefault) {
            return cat.title === i18n.t(`Purchases.Categories.${purchase.category}`);
          }
          return cat.title === purchase.category;
        });

        return {
          ...purchase,
          categoryObject: categoryObj || null,
        };
      });
    } catch (error) {
      console.error('Error joining categories into purchases:', error);
      throw error;
    }
  }

  async getPurchaseById(purchaseId: string): Promise<Purchase> {
    const docRef = doc(this.collection, purchaseId);
    const purchaseSnapshot = await getDoc(docRef);
    return PurchaseService.toDomainObject(purchaseSnapshot);
  }

  async updatePurchase(
    purchaseId: string,
    userId: string,
    data: Partial<Purchase>
  ): Promise<Purchase> {
    const currentPurchase = await this.getPurchaseById(purchaseId);
    const currentUser = await this.userService.getUserByUserId(userId);

    if (currentUser) {
      const oldAmount = Number(currentPurchase.amount) || 0;
      const newAmount = data.amount !== undefined ? Number(data.amount) : oldAmount;
      const balanceDifference = oldAmount - newAmount;

      if (balanceDifference !== 0) {
        await this.userService.updateBasicDetails(userId, {
          ...currentUser,
          balance: currentUser.balance + balanceDifference,
        });
      }
    }

    const docRef = doc(this.collection, purchaseId);
    const normalizedCategory =
      typeof data.category === 'object' ? (data.category as Category).title : data.category;

    const updatePayload: Record<string, any> = {
      updatedAt: Timestamp.now(),
    };

    if (data.amount !== undefined) updatePayload.amount = data.amount;
    if (normalizedCategory !== undefined) updatePayload.category = normalizedCategory;
    if (data.secondaryCategory !== undefined)
      updatePayload.secondaryCategory = data.secondaryCategory ?? null;
    if (data.createdAt !== undefined) updatePayload.createdAt = data.createdAt;

    await updateDoc(docRef, updatePayload);

    const purchaseSnap = await getDoc(docRef);
    return PurchaseService.toDomainObject(purchaseSnap);
  }

  async deletePurchase(purchaseId: string, userId: string): Promise<void> {
    const currentPurchase = await this.getPurchaseById(purchaseId);
    const currentUser = await this.userService.getUserByUserId(userId);

    if (currentUser) {
      await this.userService.updateBasicDetails(userId, {
        ...currentUser,
        balance: currentUser.balance + (Number(currentPurchase.amount) || 0),
      });
    }

    const docRef = doc(this.collection, purchaseId);
    await deleteDoc(docRef);
  }

  async getAllPurchaseAmountInCurrentMonth(userId: string): Promise<number> {
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 0, 0, 0, 0);
    const endOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );

    const queryData = query(
      this.collection,
      where('userId', '==', userId),
      where('createdAt', '>=', Timestamp.fromDate(startOfMonth)),
      where('createdAt', '<=', Timestamp.fromDate(endOfMonth))
    );

    const snapshot = await getDocs(queryData);
    if (snapshot.empty) return 0;

    return snapshot.docs.reduce((sum, docSnap) => {
      const purchase = PurchaseService.toDomainObject(docSnap);
      return sum + (Number(purchase.amount) || 0);
    }, 0);
  }

  async filterPurchases(
    userId: string,
    dates: { startDate: Date; endDate: Date } | null,
    category: string | null
  ): Promise<Purchase[]> {
    const constraints: QueryConstraint[] = [where('userId', '==', userId)];

    if (dates) {
      constraints.push(
        where('createdAt', '>=', Timestamp.fromDate(dates.startDate)),
        where('createdAt', '<=', Timestamp.fromDate(dates.endDate))
      );
    }

    if (category && category !== PurchaseCategory.ALL) {
      constraints.push(where('category', '==', category));
    }

    constraints.push(orderBy('createdAt', 'desc'), limit(9998));

    const queryData = query(this.collection, ...constraints);
    const snapshot = await getDocs(queryData);

    if (snapshot.empty) return [];
    return snapshot.docs.map(PurchaseService.toDomainObject);
  }

  async getMonthlySpendingForLastYear(userId: string): Promise<{ month: string; value: number }[]> {
    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth() - 11, 1);

    const queryData = query(
      this.collection,
      where('userId', '==', userId),
      where('createdAt', '>=', Timestamp.fromDate(startDate)),
      orderBy('createdAt', 'asc'),
      limit(9998)
    );

    const snapshot = await getDocs(queryData);

    const monthKeys = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ] as const;

    const monthlyMap: Record<string, number> = {};
    const monthOrder: { key: string; month: string }[] = [];

    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      monthlyMap[key] = 0;
      monthOrder.push({ key, month: i18n.t(`Months.${monthKeys[date.getMonth()]}`) });
    }

    if (!snapshot.empty) {
      snapshot.docs.forEach((docSnap) => {
        const purchase = PurchaseService.toDomainObject(docSnap);
        const date = purchase.createdAt.toDate();
        const key = `${date.getFullYear()}-${date.getMonth()}`;
        if (key in monthlyMap) {
          monthlyMap[key] += Number(purchase.amount) || 0;
        }
      });
    }

    return monthOrder.map(({ key, month }) => ({
      month,
      value: Math.round(monthlyMap[key]),
    }));
  }

  static toDomainObject(docSnap: DocumentSnapshot<PurchaseModel>): Purchase {
    const purchaseData = docSnap.data();

    const normalizedCategory =
      typeof purchaseData?.category === 'string'
        ? purchaseData.category
        : (purchaseData?.category as Category)?.title ?? '';

    let validCreatedAt = purchaseData?.createdAt;

    if (!(validCreatedAt instanceof Timestamp) && validCreatedAt) {
      validCreatedAt = Timestamp.fromDate(new Date(validCreatedAt as any));
    }

    return new Purchase({
      ...purchaseData,
      id: docSnap.id,
      category: normalizedCategory,
      createdAt: validCreatedAt ?? Timestamp.now(),
    });
  }
}
