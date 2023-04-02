import {
  addDoc,
  collection,
  doc,
  DocumentReference,
  FirestoreError,
  getDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
  Timestamp,
  Unsubscribe,
  updateDoc,
  where,
} from 'firebase/firestore';
import { getDB } from '@model/firebase-config';
import { Income } from '@model/domain';
import { BaseService } from '../base.service';
import { UserService } from '../user';

export type IncomeModel = {
  id: string;
  userId: string;
  amount: string;
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

  async createIncome(userId: string, amount: string, title: string): Promise<Income> {
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
      balance: currentBalance + Number(amount),
    });

    const incomeRef = doc(getDB(), 'incomes', insertedIncome?.id) as DocumentReference<IncomeModel>;
    const incomeSnapshot = await getDoc(incomeRef);

    return IncomeService.toDomainObject(incomeSnapshot);
  }

  async updateIncome(incomeId: string, userId: string, data: Partial<Income>): Promise<Income> {
    const currentIncome = await this.getIncomeById(incomeId);
    const currentUser = await this.userService.getUserByUserId(userId);
    const updatedUser = await this.userService.updateBasicDetails(userId, {
      ...currentUser,
      balance: currentUser.balance - Number(currentIncome.amount),
    });

    const docRef = doc(this.collection, incomeId);
    const incomeData: Partial<Income> = {
      amount: data.amount,
      title: data.title.trim(),
    };

    await this.userService.updateBasicDetails(userId, {
      ...currentUser,
      balance: updatedUser.balance + Number(data.amount),
    });

    await updateDoc(docRef, { ...incomeData, updatedAt: Timestamp.now() });

    const incomeSnap = await getDoc(docRef);

    return IncomeService.toDomainObject(incomeSnap);
  }

  async getAllIncomes(
    userId: string,
    onSuccess: (incomes: Income[]) => void,
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
        const incomes = snapshots?.docs?.map((document) => IncomeService.toDomainObject(document));

        onSuccess(incomes);
      },
      onError
    );
  }

  async getIncomeById(incomeId: string): Promise<Income> {
    const queryData = doc(this.collection, incomeId);
    const incomeSnapshot = await getDoc(queryData);

    return IncomeService.toDomainObject(incomeSnapshot);
  }

  static toDomainObject(income: QueryDocumentSnapshot<Income>): Income {
    const { ...incomeData } = income.data();

    return new Income({
      ...incomeData,
      id: income.id,
    });
  }
}
