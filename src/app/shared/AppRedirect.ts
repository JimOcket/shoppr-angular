
export class AppRedirect {
  static getDefaultPage() {
    console.log('hi');
    if (!sessionStorage.getItem('currentUser')) {
      return 'authentication';
    } else {
      return 'shoppinglist-overview';
    }
  }
}
