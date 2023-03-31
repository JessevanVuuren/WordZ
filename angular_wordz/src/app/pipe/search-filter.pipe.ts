import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(items: any[], filter: string): any {
    if (!items) {
      return []
    }

    if (!filter) {
      return items
    }

    return items.filter(e => e.name.toLowerCase().includes(filter.toLowerCase()) || e.description.toLowerCase().includes(filter.toLowerCase()))
  }

}
