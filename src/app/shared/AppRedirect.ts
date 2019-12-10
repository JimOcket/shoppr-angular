import {ShopprAuthentication} from './ShopprAuthentication';

export class AppRedirect {
  static getDefaultPage() {
    if (!sessionStorage.getItem('currentUser')) {
      const user: ShopprAuthentication = JSON.parse(sessionStorage.getItem('currentUser'));
      // return `home/${user.user.email}`;
      return 'create-shoppinglist';
    } else {
      return 'authentication';
    }
  }
}
