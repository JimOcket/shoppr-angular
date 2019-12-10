import {Entry} from './entry';

export class ShoppingList {


  name: string;
  userId: number;
  id: number;
  entries: Entry[];

  constructor(name: string, userId: number, products: Entry[]) {
    this.name = name;
    this.userId = userId;
    this.entries = products;
  }


  validate() {
    return (this.name !== undefined && this.name !== ' ');
  }
}
