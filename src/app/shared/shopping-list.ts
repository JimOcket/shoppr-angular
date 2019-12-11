import {Entry} from './entry';

export class ShoppingList {
  id: number;
  name: string;
  entries: Entry[] = [];
  userId: number;
}
