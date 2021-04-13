import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'powerSource',
})
export class PowerSourcePipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 1:
        return 'Battery';
      case 2:
        return 'External';
      default:
        return 'Unknown';
    }
  }
}
