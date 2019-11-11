import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slugify'
})
export class SlugifyPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const trChars = {
      'çÇ': 'c',
      'ğĞ': 'g',
      'şŞ': 's',
      'üÜ': 'u',
      'ıİ': 'i',
      'öÖ': 'o'
    };
    for (const key of Object.keys(trChars)) {
      value = value.replace(new RegExp('[' + key + ']', 'g'), trChars[key]);
    }
    return value
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
  }

}
