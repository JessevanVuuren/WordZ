import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterStringList'
})
export class FilterStringListPipe implements PipeTransform {

  transform(items: any[], filter: string): any {
    if (!items) {
      return []
    }

    if (!filter) {
      return items
    }

    return items.filter(e => e.toLowerCase().includes(filter.toLowerCase()))
  }


}
