import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskCounter',
  standalone: true
})
export class TaskCounterPipe implements PipeTransform {
  transform(description: string, index: number): string {
    if (description && index) {
      return `${ index }. ${ description }`;
    }

    return '';
  }
}
