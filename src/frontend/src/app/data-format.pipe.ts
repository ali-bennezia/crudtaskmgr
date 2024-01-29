import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataFormat',
})
export class DataFormatPipe implements PipeTransform {
  units: string[] = ['Byte', 'KB', 'MB', 'GB'];

  transform(value: number): string {
    let n = value;
    let i = 0;
    while (n > 1000) {
      n /= 1000.0;
      ++i;
    }

    return `${value.toString()} ${this.units[i]}${n != 1 ? 's' : ''}`;
  }
}
