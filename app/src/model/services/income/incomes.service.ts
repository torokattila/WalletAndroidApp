import {
  addDoc,
  collection,
  doc,
  documentId,
  DocumentReference,
  getDoc,
  getDocs,
  query,
  Timestamp,
  where,
} from 'firebase/firestore';
import { getDB } from '@model/firebase-config';
import { Income } from '@model/domain';
import { BaseService } from '../base.service';
import { UserService } from '../user';

export type IncomeModel = {
  id: string;
  userId: string;
  amount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  title?: string;
};

export class IncomeService extends BaseService<IncomeModel> {
  private userService: UserService;

  constructor() {
    super('incomes');
    this.userService = new UserService();
  }

  async createIncome(userId: string, amount: number, title: string): Promise<Income> {
    const incomesCollectionRef = collection(getDB(), 'incomes');
    const insertedIncome = await addDoc(incomesCollectionRef, {
      userId,
      amount,
      title,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    const currentUser = await this.userService.getUserByUserId(userId);
    const currentBalance = currentUser?.balance;
    await this.userService.updateBasicDetails(userId, {
      ...currentUser,
      balance: currentBalance + amount,
    });

    const incomeRef = doc(getDB(), 'incomes', insertedIncome?.id) as DocumentReference<IncomeModel>;
    const incomeSnapshot = await getDoc(incomeRef);

    return incomeSnapshot.data();
  }

  async getIncomeById(incomeId: string): Promise<Income> {
    const queryData = query(this.collection, where(documentId(), '==', incomeId));
    const incomeSnapshots = await getDocs(queryData);

    if (incomeSnapshots.empty) {
      return null;
    }

    return incomeSnapshots.docs[0].data();
  }
}
