import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toDate'
})
export class ToDatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const date = new Date(value);
    const hours: string | number = (date.getHours() < 10) ? '0' + date.getHours() * 10 : date.getHours();
    const minutes: string | number = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
    return `${hours}:${minutes}`;
  }

}
