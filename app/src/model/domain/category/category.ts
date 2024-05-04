import { Timestamp } from 'firebase/firestore';

type CategoryProps = {
  id: string;
  userId: string;
  title: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export class Category {
  readonly id: string;
  readonly userId: string;
  readonly title: string;
  readonly createdAt: Timestamp;
  readonly updatedAt: Timestamp;

  constructor(props: CategoryProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.title = props.title;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
