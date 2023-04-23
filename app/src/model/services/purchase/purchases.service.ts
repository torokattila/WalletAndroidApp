import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentReference,
  FirestoreError,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
  Timestamp,
  Unsubscribe,
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

  async getAllPurchases(
    userId: string,
    onSuccess: (purchases: Purchase[]) => void,
    onError: (error: FirestoreError) => void
  ): Promise<Unsubscribe> {
    const queryData = query(
      this.collection,
      where('userId', '==', userId),
      orderBy('updatedAt', 'desc'),
      limit(9998)
    );

    return onSnapshot(
      queryData,
      (snapshots) => {
        const purchases = snapshots?.docs?.map((document) =>
          PurchaseService.toDomainObject(document)
        );

        onSuccess(purchases);
      },
      onError
    );
  }

  async getPurchaseById(purchaseId: string): Promise<Purchase> {
    const queryData = doc(this.collection, purchaseId);
    const purchaseSnapshot = await getDoc(queryData);

    return PurchaseService.toDomainObject(purchaseSnapshot);
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

    const resultPurchases = snapshot?.docs?.map((purchase) =>
      PurchaseService.toDomainObject(purchase)
    );

    resultPurchases.forEach((purchase) => {
      sum += Number(purchase.amount);
    });

    return sum;
  }

  static toDomainObject(purchase: QueryDocumentSnapshot<Purchase>): Purchase {
    const { ...purchaseData } = purchase.data();

    return new Purchase({
      ...purchaseData,
      id: purchase.id,
    });
  }
}
