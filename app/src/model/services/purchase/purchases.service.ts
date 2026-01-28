import { Category, Purchase, PurchaseCategory } from '@model/domain';
import { defaultCategories } from '@model/domain/constants/categories';
import { getDB } from '@model/firebase-config';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  limit,
  orderBy,
  Query,
  query,
  QueryDocumentSnapshot,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import i18n from 'i18n-js';
import { BaseService } from '../base.service';
import { getBalanceManager, getCategoryService } from '../ServiceContainer';

export type PurchaseModel = {
  id: string;
  userId: string;
  amount: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  category: PurchaseCategory;
  secondaryCategory?: string | null;
};

export class PurchaseService extends BaseService<PurchaseModel> {
  private categoryService = getCategoryService();
  private balanceManager = getBalanceManager();

  constructor() {
    super('purchases');
  }

  async createdPurchase(
    userId: string,
    amount: string,
    category: PurchaseCategory | string,
    secondaryCategory?: string | null
  ): Promise<Purchase> {
    const purchasesCollectionRef = collection(getDB(), 'purchases');
    const insertedPurchase = await addDoc(purchasesCollectionRef, {
      userId,
      amount,
      category,
      secondaryCategory,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    await this.balanceManager.adjustBalance(userId, Number(amount), 'subtract');

    const purchaseRef = doc(
      getDB(),
      'purchases',
      insertedPurchase?.id
    ) as DocumentReference<PurchaseModel>;
    const purchaseSnapshot = await getDoc(purchaseRef);

    return PurchaseService.toDomainObject(purchaseSnapshot);
  }

  async getAllPurchases(userId: string): Promise<Purchase[]> {
    const queryData = query(
      this.collection,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(9998)
    );

    const snapshot = await getDocs(queryData);

    if (snapshot.empty) {
      return [];
    }

    return snapshot?.docs?.map(PurchaseService.toDomainObject);
  }

  async joinCategoriesIntoPurchases(userId: string): Promise<Purchase[]> {
    try {
      const userCategories = await this.categoryService.getAllCategories(userId);
      const allCategories = [...defaultCategories, ...userCategories];
      const purchases = await this.getAllPurchases(userId);
      const purchasesWithCategories = purchases.map((purchase) => {
        const category = allCategories.find((cat) => {
          if (cat.isDefault) {
            return cat.title === i18n.t(`Purchases.Categories.${purchase.category}`);
          }

          return cat.title === purchase.category;
        });

        return {
          ...purchase,
          categoryObject: category || null,
        };
      });

      return purchasesWithCategories;
    } catch (error) {
      console.error('Error joining categories into purchases:', error);
      throw error;
    }
  }

  async getPurchaseById(purchaseId: string): Promise<Purchase> {
    const queryData = doc(this.collection, purchaseId);
    const purchaseSnapshot = await getDoc(queryData);

    return PurchaseService.toDomainObject(purchaseSnapshot);
  }

  async updatePurchase(
    purchaseId: string,
    userId: string,
    data: Partial<Purchase>
  ): Promise<Purchase> {
    const currentPurchase = await this.getPurchaseById(purchaseId);
    await this.balanceManager.adjustBalance(userId, Number(currentPurchase.amount), 'add');

    const docRef = doc(this.collection, purchaseId);
    const normalizedCategory =
      typeof data.category === 'object'
        ? (data.category as Category).title
        : (data.category as PurchaseCategory | undefined);

    const purchaseData: Partial<PurchaseModel> = {
      amount: data.amount,
      category: normalizedCategory as PurchaseCategory,
      secondaryCategory: data.secondaryCategory ?? null,
      createdAt: data.createdAt as unknown as Timestamp,
    };

    await this.balanceManager.adjustBalance(userId, Number(data.amount), 'subtract');
    await updateDoc(docRef, { ...purchaseData, updatedAt: Timestamp.now() });

    const purchaseSnap = await getDoc(docRef);

    return PurchaseService.toDomainObject(purchaseSnap);
  }

  async deletePurchase(purchaseId: string, userId: string): Promise<void> {
    const currentPurchase = await this.getPurchaseById(purchaseId);

    await this.balanceManager.adjustBalance(userId, Number(currentPurchase.amount), 'add');

    const docRef = doc(this.collection, purchaseId);
    const purchaseSnapshot = await getDoc(docRef);

    if (!purchaseSnapshot.exists()) {
      return;
    }

    await deleteDoc(docRef);
  }

  async getAllPurchaseAmountInCurrentMonth(userId: string): Promise<number> {
    const currentDate = new Date();
    const firstDayOfTheMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfTheMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 31);
    let sum = 0;

    const queryData = query(
      this.collection,
      where('userId', '==', userId),
      where('createdAt', '>=', firstDayOfTheMonth),
      where('createdAt', '<=', lastDayOfTheMonth)
    );

    const snapshot = await getDocs(queryData);

    if (snapshot.empty) {
      return 0;
    }

    const resultPurchases = snapshot?.docs?.map(PurchaseService.toDomainObject);

    resultPurchases.forEach((purchase) => {
      sum += Number(purchase.amount);
    });

    return sum;
  }

  async filterPurchases(
    userId: string,
    dates: {
      startDate: Date;
      endDate: Date;
    } | null,
    category: string | null
  ): Promise<Purchase[]> {
    let queryData: Query<PurchaseModel>;

    if ((!category || category === PurchaseCategory.ALL) && dates) {
      queryData = query(
        this.collection,
        where('userId', '==', userId),
        where('createdAt', '>=', dates.startDate),
        where('createdAt', '<=', dates.endDate),
        orderBy('createdAt', 'desc'),
        limit(9998)
      );
    } else if (category && dates) {
      queryData = query(
        this.collection,
        where('userId', '==', userId),
        where('createdAt', '>=', dates.startDate),
        where('createdAt', '<=', dates.endDate),
        where('category', '==', category),
        orderBy('createdAt', 'desc'),
        limit(9998)
      );
    } else if (category && !dates) {
      queryData = query(
        this.collection,
        where('userId', '==', userId),
        where('category', '==', category),
        orderBy('createdAt', 'desc'),
        limit(9998)
      );
    } else {
      queryData = query(
        this.collection,
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(9998)
      );
    }

    const snapshot = await getDocs(queryData);

    if (snapshot.empty) {
      return [];
    }

    return snapshot?.docs?.map(PurchaseService.toDomainObject);
  }

  static toDomainObject(purchase: QueryDocumentSnapshot<PurchaseModel>): Purchase {
    const { ...purchaseData } = purchase.data();
    const normalizedCategory =
      typeof purchaseData?.category === 'string'
        ? purchaseData.category
        : (purchaseData?.category as Category)?.title ?? '';

    return new Purchase({
      ...purchaseData,
      id: purchase.id,
      category: normalizedCategory,
    });
  }
}
