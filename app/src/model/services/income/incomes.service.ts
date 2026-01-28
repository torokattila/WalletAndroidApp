import { Income } from '@model/domain';
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
  query,
  QueryDocumentSnapshot,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { BaseService } from '../base.service';
import { getBalanceManager } from '../ServiceContainer';

export type IncomeModel = {
  id: string;
  userId: string;
  amount: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  title?: string;
};

export class IncomeService extends BaseService<IncomeModel> {
  private balanceManager = getBalanceManager();

  constructor() {
    super('incomes');
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

    await this.balanceManager.adjustBalance(userId, Number(amount), 'add');

    const incomeRef = doc(getDB(), 'incomes', insertedIncome?.id) as DocumentReference<IncomeModel>;
    const incomeSnapshot = await getDoc(incomeRef);

    return IncomeService.toDomainObject(incomeSnapshot);
  }

  async updateIncome(incomeId: string, userId: string, data: Partial<Income>): Promise<Income> {
    const currentIncome = await this.getIncomeById(incomeId);

    await this.balanceManager.adjustBalance(userId, Number(currentIncome.amount), 'subtract');

    const docRef = doc(this.collection, incomeId);
    const incomeData: Partial<Income> = {
      amount: data.amount,
      title: data?.title?.trim(),
    };

    await this.balanceManager.adjustBalance(userId, Number(data.amount), 'add');
    await updateDoc(docRef, { ...incomeData, updatedAt: Timestamp.now() });

    const incomeSnap = await getDoc(docRef);

    return IncomeService.toDomainObject(incomeSnap);
  }

  async deleteIncome(incomeId: string, userId: string): Promise<void> {
    const currentIncome = await this.getIncomeById(incomeId);

    await this.balanceManager.adjustBalance(userId, Number(currentIncome.amount), 'subtract');

    const docRef = doc(this.collection, incomeId);
    const incomeSnapshot = await getDoc(docRef);

    if (!incomeSnapshot.exists()) {
      return;
    }

    await deleteDoc(docRef);
  }

  async getAllIncomes(userId: string): Promise<Income[]> {
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

    return snapshot?.docs?.map(IncomeService.toDomainObject);
  }

  async getIncomesByDate(userId: string, startDate: Date, endDate: Date): Promise<Income[]> {
    const queryData = query(
      this.collection,
      where('userId', '==', userId),
      where('updatedAt', '>=', startDate),
      where('updatedAt', '<=', endDate),
      orderBy('updatedAt', 'desc'),
      limit(9998)
    );

    const snapshot = await getDocs(queryData);

    if (snapshot.empty) {
      return [];
    }

    return snapshot?.docs?.map(IncomeService.toDomainObject);
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
