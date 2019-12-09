import {Account} from './account';

export class ShopprAuthentication {
  // tslint:disable-next-line:variable-name
  private readonly _user: Account;

  constructor(user: Account) {
    this._user = user;
  }

  get user(): Account {
    return this._user;
  }
}
