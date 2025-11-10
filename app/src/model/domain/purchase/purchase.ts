import { Timestamp } from 'firebase/firestore';
import { Category } from '../category';

export enum PurchaseCategory {
  FOOD = 'food',
  CLOTHING = 'clothing',
  ENTERTAINMENT = 'entertainment',
  OTHER = 'other',
  ALL = 'all',
}

type PurchaseProps = {
  id: string;
  userId: string;
  amount: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  category: PurchaseCategory | string;
  secondaryCategory?: string | null;
  categoryObject?: Category | null;
};

export class Purchase {
  readonly id: string;
  readonly userId: string;
  readonly amount: string;
  readonly createdAt: Timestamp;
  readonly updatedAt: Timestamp;
  readonly category: PurchaseCategory | Category | string;
  readonly secondaryCategory?: string | null;
  readonly categoryObject?: Category | null;

  constructor(props: PurchaseProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.amount = props.amount;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.category = props.category;
    this.secondaryCategory = props.secondaryCategory;
    this.categoryObject = props?.categoryObject ?? null;
  }
}
