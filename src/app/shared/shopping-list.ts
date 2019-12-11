import {Entry} from './entry';

export class ShoppingList {
  name: string;
  userId: number;
  id: number;
  entries: Entry[] = [];
}
