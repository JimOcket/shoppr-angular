export class ShoppingList {


  constructor(name: string, userId: number) {
    this.name = name;
    this.userId = userId;
  }

  name: string;
  userId: number;

  validate() {
    return (this.name !== undefined && this.name !== ' ');
  }
}
