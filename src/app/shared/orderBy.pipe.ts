import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({name: 'orderBy'})
export class OrderByPipe implements  PipeTransform {
  transform(value: any[], propertyName: string): any[] {
    if(propertyName)
      return value.sort((a: any, b: any) => a[propertyName].localeCompare(b[propertyName]));
    return value;
  }
}
