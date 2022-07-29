import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {
  transform(value: Date): number {
    let ageDifMs  = Date.now() - new Date(value).getTime();
    return Math.floor(ageDifMs / (1000 * 3600 * 24) / 365.25);
  }
}
