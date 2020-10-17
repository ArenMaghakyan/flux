import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeToAge',
})
export class TimeToAgePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const birth = new Date(value);
    const now = new Date();
    const difference = now.getTime() - birth.getTime();
    return Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25));
  }

}
