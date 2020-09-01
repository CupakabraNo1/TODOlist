import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  pure: false
})
export class SortPipe implements PipeTransform {
  transform(arr: Array<any>, prop: string, reverse: boolean = false): any {
    if (arr === undefined) {
      return;
    }
    const m = reverse ? -1 : 1;
    return arr.sort((a: any, b: any): number => {
      const x = a[prop];
      const y = b[prop];
      return x === y ? 0 : x < y ? -1 * m : 1 * m;
    });
  }
}
