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
      title: data?.title?.trim(),
    };

    await this.userService.updateBasicDetails(userId, {
      ...updatedUser,
      balance: updatedUser.balance + Number(data.amount),
    });

    await updateDoc(docRef, { ...incomeData, updatedAt: Timestamp.now() });

    const incomeSnap = await getDoc(docRef);

    return IncomeService.toDomainObject(incomeSnap);
  }

  async deleteIncome(incomeId: string, userId: string): Promise<void> {
    const currentIncome = await this.getIncomeById(incomeId);
    const currentUser = await this.userService.getUserByUserId(userId);

    await this.userService.updateBasicDetails(userId, {
      ...currentUser,
      balance: currentUser.balance - Number(currentIncome.amount),
    });

    const docRef = doc(this.collection, incomeId);
    const incomeSnapshot = await getDoc(docRef);

    if (!incomeSnapshot.exists()) {
      return;
    }

    await deleteDoc(docRef);
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

  async getIncomesByDate(userId: string, startDate: Date, endDate: Date): Promise<Income[]> {
    const startDateMidnight = startDate;

    try {
      const queryData = query(
        this.collection,
        where('userId', '==', userId),
        where('updatedAt', '>=', startDateMidnight),
        where('updatedAt', '<=', endDate),
        orderBy('updatedAt', 'desc'),
        limit(9998)
      );

      const snapshot = await getDocs(queryData);

      if (snapshot.empty) {
        return [];
      }

      return snapshot?.docs?.map((income) => IncomeService.toDomainObject(income));
    } catch (error) {
      console.error('Error: ', error);
    }
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
