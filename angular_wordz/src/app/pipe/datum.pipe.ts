import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datum'
})
export class DatumPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    const date = new Date(value)
    console.log(date)
    return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
  }

}
