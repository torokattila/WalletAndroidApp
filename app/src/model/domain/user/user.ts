type UserProps = {
  id: string;
  userId: string;
  userIds: string[];
  email: string;
  lastname: string;
  firstname: string;
  balance: number;
};

export class User {
  readonly id: string;
  readonly userIds: string[];
  readonly userId: string;
  readonly email: string;
  readonly lastname: string;
  readonly firstname: string;
  readonly balance: number;

  constructor(props: UserProps) {
    this.id = props.id;
    this.userIds = props.userIds;
    this.userId = props.userId;
    this.email = props.email;
    this.lastname = props.lastname;
    this.firstname = props.firstname;
    this.balance = props.balance;
  }
}
