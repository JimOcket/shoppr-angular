import {Entry} from './entry';

export class Recipe {
  id: number;
  name: string;
  description: string;
  amountOfServings: string;
  ownerId: number;
  entries: Entry[];
}
