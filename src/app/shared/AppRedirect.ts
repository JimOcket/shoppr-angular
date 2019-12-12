
export class AppRedirect {
  static getDefaultPage() {
    if (!sessionStorage.getItem('currentUser')) {
      return 'authentication';
    } else {
      return 'shoppinglist-overview';
    }
  }
}
