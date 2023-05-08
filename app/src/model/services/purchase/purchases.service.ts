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
import { Purchase, PurchaseCategory } from '@model/domain';
import { getDB } from '@model/firebase-config';
import { BaseService } from '../base.service';
import { UserService } from '../user';

export type PurchaseModel = {
  id: string;
  userId: string;
  amount: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  category: PurchaseCategory;
};

export class PurchaseService extends BaseService<PurchaseModel> {
  private userService: UserService;

  constructor() {
    super('purchases');
    this.userService = new UserService();
  }

  async createdPurchase(
    userId: string,
    amount: string,
    category: PurchaseCategory
  ): Promise<Purchase> {
    const purchasesCollectionRef = collection(getDB(), 'purchases');
    const insertedPurchase = await addDoc(purchasesCollectionRef, {
      userId,
      amount,
      category,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    const currentUser = await this.userService.getUserByUserId(userId);
    const currentBalance = currentUser?.balance;
    await this.userService.updateBasicDetails(userId, {
      ...currentUser,
      balance: currentBalance - Number(amount),
    });

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
      orderBy('updatedAt', 'desc'),
      limit(9998)
    );

    const snapshot = await getDocs(queryData);

    if (snapshot.empty) {
      return [];
    }

    return snapshot?.docs?.map(PurchaseService.toDomainObject);
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
    const currentUser = await this.userService.getUserByUserId(userId);

    const updatedUser = await this.userService.updateBasicDetails(userId, {
      ...currentUser,
      balance: currentUser.balance + Number(currentPurchase.amount),
    });

    const docRef = doc(this.collection, purchaseId);
    const purchaseData: Partial<Purchase> = {
      amount: data.amount,
      category: data.category,
    };

    await this.userService.updateBasicDetails(userId, {
      ...updatedUser,
      balance: updatedUser.balance - Number(data.amount),
    });

    await updateDoc(docRef, { ...purchaseData, updatedAt: Timestamp.now() });

    const purchaseSnap = await getDoc(docRef);

    return PurchaseService.toDomainObject(purchaseSnap);
  }

  async deletePurchase(purchaseId: string, userId: string): Promise<void> {
    const currentPurchase = await this.getPurchaseById(purchaseId);
    const currentUser = await this.userService.getUserByUserId(userId);

    await this.userService.updateBasicDetails(userId, {
      ...currentUser,
      balance: currentUser.balance + Number(currentPurchase.amount),
    });

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
      where('updatedAt', '>=', firstDayOfTheMonth),
      where('updatedAt', '<=', lastDayOfTheMonth)
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
        where('updatedAt', '>=', dates.startDate),
        where('updatedAt', '<=', dates.endDate),
        orderBy('updatedAt', 'desc'),
        limit(9998)
      );
    } else if (category && dates) {
      queryData = query(
        this.collection,
        where('userId', '==', userId),
        where('updatedAt', '>=', dates.startDate),
        where('updatedAt', '<=', dates.endDate),
        where('category', '==', category),
        orderBy('updatedAt', 'desc'),
        limit(9998)
      );
    } else if (category && !dates) {
      queryData = query(
        this.collection,
        where('userId', '==', userId),
        where('category', '==', category),
        orderBy('updatedAt', 'desc'),
        limit(9998)
      );
    } else {
      queryData = query(
        this.collection,
        where('userId', '==', userId),
        orderBy('updatedAt', 'desc'),
        limit(9998)
      );
    }

    const snapshot = await getDocs(queryData);

    if (snapshot.empty) {
      return [];
    }

    return snapshot?.docs?.map(PurchaseService.toDomainObject);
  }

  static toDomainObject(purchase: QueryDocumentSnapshot<Purchase>): Purchase {
    const { ...purchaseData } = purchase.data();

    return new Purchase({
      ...purchaseData,
      id: purchase.id,
    });
  }
}
