import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'asIdrFormat'
})
export class AsIdrFormatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      return `Rp ${this.numberWithCommas(value)}`;
    } else {
      return `Rp 0`;
    }
  }


  numberWithCommas(x: any) {
    return String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

}
