import {
  addDoc,
  collection,
  doc,
  DocumentReference,
  getDoc,
  QueryDocumentSnapshot,
  Timestamp,
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

  static toDomainObject(purchase: QueryDocumentSnapshot<Purchase>): Purchase {
    const { ...purchaseData } = purchase.data();

    return new Purchase({
      ...purchaseData,
      id: purchase.id,
    });
  }
}
