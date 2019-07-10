import {delegateLevelValue} from './utils';


export const defaultStringLengthToShowInTable = 25;

export class Extra {

  showValueAsTooltip(value, justShow?) {
    if (justShow !== undefined && justShow === true) {
      return value;
    }

    if (justShow !== undefined && justShow === false) {
      return '';
    }


    if (typeof value === 'boolean') {
      return value ? 'Ya' : 'Tidak';
    } else {
      if (value === undefined) {
        return ' Tidak Diketahui ';
      }


      const l = value.toString().length;
      const vs: any[] = value.toString().split('-');
      if (vs.length >= 5) {
        return '';
      }

      return (l > defaultStringLengthToShowInTable) ? value : '';


    }
  }


  delegateLevelValue(value, levels: any[] | ((valueResult, index?) => any), config?: any, indexRow?: number) {
    return delegateLevelValue(value, levels, config, indexRow);
  }


  defaultNoActionVoid(column, value) {
    return value;
  }


  printValue(conf, column, columnValue, index, conditionVoid: Function = this.defaultNoActionVoid, showLength = defaultStringLengthToShowInTable) {
    // console.log('showLength', showLength)
    let v = conditionVoid(column, columnValue);
    v = (column === 'bankId') ? ((index + 1) + ( conf.page * conf.size)) : v;
    return printWord(v, showLength);
  }




}


export function printWord(text: any, showLength) {
  const value = String(text) + '';
  return (value.length > showLength) ? (value.substring(0, showLength) + '....') : value;
}
