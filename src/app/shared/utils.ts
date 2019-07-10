import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';


export function qualifyObject(object, property: string, defaultValue: any = '') {
  if (object !== undefined && object !== null) {
    if (object[property] === undefined || object[property] === null) {
      return defaultValue;
    } else {
      return object[property]
    }
  }

  return defaultValue;
}


export function statusGeneralization(validators: Function | any, forGeneralization = false) {
  return (forGeneralization) ? Validators.nullValidator : validators;
}


export function generateArrayForm(initValue: any[], formGroupFunction: Function, disableSettings?) {
  const data = [];
  initValue.forEach(value => data.push((disableSettings) ? formGroupFunction(value, disableSettings) : formGroupFunction(value)));
  return data;
}



/* */

export function generateFormControlConfig(
  controlName: string,
  init: any,
  disables: any,
  validators: any,
  forGeneralization = false,
  defaultValueForInit = ''): any[] {

  return [
    {
      value: qualifyObject(init, controlName, defaultValueForInit),
      disabled: disables[controlName] ? disables[controlName] : false
    },
    statusGeneralization(validators[controlName] ? validators[controlName] : null, forGeneralization)
  ];
}


export function generateFormArrayConfig(
  control: string,
  formTarget: Function,
  init: any,
  disables: any,
  validators?: any,
  forGeneralization = false): any[] {

  if (init[control]) {
    if ((<any[]>init[control]).length === 0) {
      return [];
    } else {
      return generateArrayForm(init[control], formTarget, disables[control]);
    }
  } else {
    return [];
  }
}


/**/

export function decodeMasked(masked: string) {
  return +masked.replace(/[^0-9.]/g, '');
}


export function decodeMaskedObject(maskedValue: any, targetProperties?) {

  const isMaskedValueHasArray = !((<any[]> maskedValue).length === undefined);

  if (isMaskedValueHasArray) {
    if ((<any[]> maskedValue).length === 0) {
      return [];
    }
  }

  const resultObject = (isMaskedValueHasArray) ? [...maskedValue] : {...maskedValue};

  for (const property in targetProperties) {
    if (targetProperties.hasOwnProperty(property)) {

      /* Jika Value adalah object Array */
      if (isMaskedValueHasArray) {
        for (let i = 0; i < (<any[]> maskedValue).length; i++) {
          resultObject[i] = decodeMaskedObject((<any[]> maskedValue)[i], targetProperties[property]);
        }
      } else {
        /* get nilai dari value berdasarkan properti target */
        const targetValue = maskedValue[property];

        if (typeof targetValue === 'string') {
          resultObject[property] = decodeMasked(<string> targetValue);
        } else if (typeof targetValue === 'number') {
          continue;
        } else if (typeof targetValue === 'object') {

          /* Jika type nilai dari target data adalah array */
          if ((<any[]> targetValue).length || (<any[]> targetValue).length === 0) {
            resultObject[property] = [...decodeMaskedObject(targetValue, targetProperties)];
          } else {
            resultObject[property] = {...decodeMaskedObject(targetValue, targetProperties[property])};
          }
        }
      }



    }
  }

  return resultObject;
}



/**/



export function removePropertiesOnObject(object: any, properties: any) {

  if (typeof properties === 'object') {
    for (const prop in properties) {
      if (properties.hasOwnProperty(prop)) {

        const propValue = properties[prop];

        /* lakuka prosez*/
        if (properties[prop] === undefined) {
          if (typeof object === 'object') {
            delete object[prop];
          }
        } else {
          if (typeof object === 'object') {
            if (object[prop].length !== undefined) { // object array
              for (const tempObj of (<any[]>object[prop])) {
                removePropertiesOnObject(tempObj, properties[prop]);
                // delete tempObj[]
              }
            } else { // normal object

              if (propValue === undefined || (propValue(object[prop]) === true)) {
                delete object[prop];
              }

            }
          }

          // removePropertiesOnObject(object[prop], properties[prop]);
        }

      }
    }
  } else {
    delete object[String(properties)];
  }

  return object;
}



/**/



export interface TablePropertiesConfig {

  isArray?: boolean;
  onArrayIndex?: number | Function;
  onArrayLevelsData?: string[];
  levelOnData?: string[];

}


/**
 * Mengambil nilai berdasarkan tingkatan kedalaman levelnya
 * @param value, nilai awal
 * @param levels, kedalaman level array nya
 */
export function delegateLevelValue(value, levels: any[] | ((valueResult, index?) => any), config?: TablePropertiesConfig, indexOnRow?: number) {

  // console.log(indexOnRow)

  if (levels instanceof Function) {
    if (indexOnRow) {
      value = levels(value, indexOnRow);
    } else {
      value = levels(value);
    }
  } else {
    // const lv = <any[]>levels;
    for (const name of levels) {
      if (value[name] === undefined) {
        return '-';
      }

      value = value[name];
    }
  }


  if (config !== null && config !== undefined) {
    if (config.isArray) {

      const index = (config.onArrayIndex instanceof Function)
        ? (<number>config.onArrayIndex(value))
        : (<number>config.onArrayIndex);

      if (index < 0) {
        return '-';
      }

      value = value[index];
      value = delegateLevelValue(value, config.onArrayLevelsData);
    } else {
      value = delegateLevelValue(value, config.levelOnData);
    }
  }


  return value;
}



export function delegateFormControl(formGroup: FormGroup, controlNames: string[]): FormControl {

  let i = 1;
  let temp: FormGroup | FormControl = formGroup;
  for (const control of controlNames) {
    if (i < controlNames.length) { // cast ke form group
      temp = <FormGroup>(<FormGroup>temp).controls[control];
    } else { // cast ke form control
      temp = <FormControl>(<FormGroup>temp).controls[control];
    }
    i++;
  }

  return <FormControl>temp;
}


export function delegateObjectValue(value: any, properties: string[]): string {

  let temp: any = value;
  for (const property of properties) {
    temp = temp[property];
  }

  return <string>temp;
}




export class AppErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
