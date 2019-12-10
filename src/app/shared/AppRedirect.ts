import {ShopprAuthentication} from './ShopprAuthentication';

export class AppRedirect {
  static getDefaultPage() {
    if (!sessionStorage.getItem('currentUser')) {
      return 'create-shoppinglist';
    } else {
      return 'authentication';
    }
  }
}
