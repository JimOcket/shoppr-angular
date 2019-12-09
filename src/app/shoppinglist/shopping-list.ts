export class ShoppingList {


  constructor(name: string) {
    this.name = name;
  }

  name: string;
  id: string;

  validate() {
    return (this.name !== undefined && this.name !== ' ');
  }
}
