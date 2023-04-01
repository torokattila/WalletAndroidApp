import { Timestamp } from 'firebase/firestore';

type IncomeProps = {
  id: string;
  userId: string;
  amount: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  title?: string;
};

export class Income {
  readonly id: string;
  readonly userId: string;
  readonly amount: string;
  readonly createdAt: Timestamp;
  readonly updatedAt: Timestamp;
  readonly title?: string;

  constructor(props: IncomeProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.amount = props.amount;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.title = props.title;
  }
}
