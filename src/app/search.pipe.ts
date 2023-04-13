import { Pipe, PipeTransform } from '@angular/core';
import { BookDetails } from './book-details';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  
  transform(languages: any, searchInput: string, key: string): any[] {
    console.log("searchInput", searchInput);
    let data = languages;
    if (!searchInput || !key) {
      return languages;
    }

    if (key === 'category') {
      data = languages.filter(
        (x: { [x: string]: string; }) => x[key].includes(searchInput)
      )
    } else {
      searchInput = searchInput.toLowerCase();
      data = languages.filter(
        (x: { [x: string]: string; }) => x[key].toLowerCase().includes(searchInput)
      )
    }
    return data;
  }
}
