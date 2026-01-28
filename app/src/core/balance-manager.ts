import { User } from '@model/domain';
import { UserService } from '@model/services';

export class BalanceManager {
  constructor(private userService: UserService) {}

  async adjustBalance(
    userId: string,
    amount: number,
    operation: 'add' | 'subtract'
  ): Promise<User> {
    const currentUser = await this.userService.getUserByUserId(userId);
    const newBalance =
      operation === 'add' ? currentUser.balance + amount : currentUser.balance - amount;

    return await this.userService.updateBasicDetails(userId, {
      ...currentUser,
      balance: newBalance,
    });
  }
}
