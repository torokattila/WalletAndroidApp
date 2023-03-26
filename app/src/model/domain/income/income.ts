type IncomeProps = {
  id: string;
  userId: string;
  amount: number;
};

export class Income {
  readonly id: string;
  readonly userId: string;
  readonly amount: number;

  constructor(props: IncomeProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.amount = props.amount;
  }
}
