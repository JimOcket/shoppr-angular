export class CreateShoppingList {
  name: string;
  userId: number;

  constructor(name: string, userId: number) {
    this.name = name;
    this.userId = userId;
  }

  validate() {
    return (this.name !== undefined && this.name !== ' ');
  }
}
