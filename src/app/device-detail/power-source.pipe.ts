import { Pipe, PipeTransform } from '@angular/core';
import { PowerState } from '../ttnmodels/end-device';

@Pipe({
  name: 'powerSource',
})
export class PowerSourcePipe implements PipeTransform {
  transform(value: PowerState): string {
    switch (value) {
      case PowerState.battery:
        return 'Battery';
      case PowerState.external:
        return 'External';
      default:
        return 'Unknown';
    }
  }
}
