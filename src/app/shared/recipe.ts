import {Entry} from './entry';

export class Recipe {
  id: number;
  name: string;
  description: string;
  amountOfServings: string;
  entries: Entry[];
}
