import {ShopprAuthentication} from './ShopprAuthentication';

export class AppRedirect {
  static getDefaultPage() {
    if (localStorage.getItem('currentUser') !== undefined) {
      const user: ShopprAuthentication = JSON.parse(localStorage.getItem('currentUser'));
      return `home/${user.user.email}`;
    } else {
      return 'authentication';
    }
  }
}
