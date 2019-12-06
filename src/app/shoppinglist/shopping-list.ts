export class ShoppingList {
  name: string;

  validate() {
    return (this.name !== undefined && this.name !== '');
  }
}
