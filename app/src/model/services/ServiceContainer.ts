/**
 * Service Container - Singleton pattern for service management
 * Ensures single instance of each service across the app
 * Improves performance and prevents memory leaks
 */

import { BalanceManager } from '@core/balance-manager';
import { AuthService } from './auth';
import { CategoryService } from './category';
import { IncomeService } from './income';
import { PurchaseService } from './purchase';
import { UserService } from './user';

class ServiceContainer {
  private static instance: ServiceContainer;

  private _authService: AuthService;
  private _categoryService: CategoryService;
  private _incomeService: IncomeService;
  private _purchaseService: PurchaseService;
  private _userService: UserService;
  private _balanceManager: BalanceManager;

  private constructor() {}

  public static getInstance(): ServiceContainer {
    if (!ServiceContainer.instance) {
      ServiceContainer.instance = new ServiceContainer();
    }
    return ServiceContainer.instance;
  }

  get authService(): AuthService {
    if (!this._authService) {
      this._authService = new AuthService();
    }
    return this._authService;
  }

  get categoryService(): CategoryService {
    if (!this._categoryService) {
      this._categoryService = new CategoryService();
    }
    return this._categoryService;
  }

  get incomeService(): IncomeService {
    if (!this._incomeService) {
      this._incomeService = new IncomeService();
    }
    return this._incomeService;
  }

  get purchaseService(): PurchaseService {
    if (!this._purchaseService) {
      this._purchaseService = new PurchaseService();
    }
    return this._purchaseService;
  }

  get userService(): UserService {
    if (!this._userService) {
      this._userService = new UserService();
    }
    return this._userService;
  }

  get balanceManager(): BalanceManager {
    if (!this._balanceManager) {
      this._balanceManager = new BalanceManager(this.userService);
    }
    return this._balanceManager;
  }

  public clear(): void {
    this._authService = null;
    this._categoryService = null;
    this._incomeService = null;
    this._purchaseService = null;
    this._userService = null;
    this._balanceManager = null;
  }
}

export const getServices = () => ServiceContainer.getInstance();
export const getAuthService = () => getServices().authService;
export const getCategoryService = () => getServices().categoryService;
export const getIncomeService = () => getServices().incomeService;
export const getPurchaseService = () => getServices().purchaseService;
export const getUserService = () => getServices().userService;
export const getBalanceManager = () => getServices().balanceManager;
