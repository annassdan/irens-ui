// export const apiHost = 'http://bwssulawesi4.com';
import {FormControl, FormGroup} from '@angular/forms';
import {isFunction, isNullOrUndefined} from 'util';
import {MatAutocomplete} from '@angular/material';
import {Observable, Subscription} from 'rxjs';
import {delegateFormControl, delegateObjectValue} from './utils';

export const apiHost = 'http://localhost:8000';

export function successSnackBar(snack) {
  snack.open("Sukses !", '', {
    duration: 500,
    panelClass: ['success-snackbar']
  });
}

export function errorSnackBar(snack, e) {
  snack.open(e, '', {
    duration: 1500,
    panelClass: ['error-snackbar']
  });
}

export function warningSnackBar(snack, e) {
  snack.open(e, '', {
    duration: 2000,
    panelClass: ['warning-snackbar']
  });
}


export interface ControlQualification {
  onControlName: string | string[];
  onResponseProperty?: string | string[];
  isId?: boolean;
}


export interface LazyAutocompleteAltConfig {
  form: FormGroup;
  onFormTarget: string; // controlTarget: string
  id: string;
  required: boolean,
  onDisplayed: ControlQualification; // controlNameOfDisplayedInput
  idInitializationValue: any; // initializationValue: any;
  httpTarget?: Function; // serviceTarget: Function;
  delay?: number;
  page?: number;
  size?: number;
  isLastProperty?: string | ((data) => boolean); // lastIdentifierDataPropertyOnResponse?: string | Function;
  onResponseDataProperty?: string; // dataPropertyOnResponse?: string;
  affectedTo?: ControlQualification[];
  searchTargets?: ControlQualification[];
  lazy?: boolean;
  predefinedData?: any[];
  useClearButton?: boolean;
}


export function CreateConfigOfNgAutocomplete(initConfig: LazyAutocompleteAltConfig) {
  const onDisplayed = <ControlQualification>{
    onControlName: initConfig.onDisplayed.onControlName,
    onResponseProperty: isNullOrUndefined(initConfig.onDisplayed.onResponseProperty) ? initConfig.onDisplayed.onControlName : initConfig.onDisplayed.onResponseProperty,
    isId: isNullOrUndefined(initConfig.onDisplayed.isId) ? false : initConfig.onDisplayed.isId
  };


  const affectedToTemp = [];
  let affectedTo = isNullOrUndefined(initConfig.affectedTo) ? [] : initConfig.affectedTo;
  affectedTo.forEach(v => {
    affectedToTemp.push(<ControlQualification>{
      onControlName: v.onControlName,
      onResponseProperty: isNullOrUndefined(v.onResponseProperty) ? v.onControlName : v.onResponseProperty,
      isId: isNullOrUndefined(v.isId) ? false : v.isId
    })
  });
  affectedTo = [...affectedToTemp];


  const searchTargetsTemp = [];
  let searchTargets = isNullOrUndefined(initConfig.searchTargets) ? [] : initConfig.searchTargets;
  searchTargets.push(onDisplayed);
  searchTargets.forEach(v => {
    searchTargetsTemp.push(<ControlQualification>{
      onControlName: v.onControlName,
      onResponseProperty: isNullOrUndefined(v.onResponseProperty) ? v.onControlName : v.onResponseProperty,
      isId: isNullOrUndefined(v.isId) ? false : v.isId
    })
  });
  searchTargets = [...searchTargetsTemp];


  return <LazyAutocompleteAltConfig>{
    form: initConfig.form,
    id: initConfig.id,
    onFormTarget: initConfig.onFormTarget,
    onDisplayed: onDisplayed,
    idInitializationValue: isNullOrUndefined(initConfig.idInitializationValue) ? '' : initConfig.idInitializationValue,
    httpTarget: initConfig.httpTarget,
    delay: isNullOrUndefined(initConfig.delay) ? 0 : initConfig.delay,
    page: isNullOrUndefined(initConfig.page) ? 0 : initConfig.page,
    size: isNullOrUndefined(initConfig.size) ? 10 : initConfig.size,
    isLastProperty: isNullOrUndefined(initConfig.isLastProperty) ? 'last' : initConfig.isLastProperty,
    onResponseDataProperty: isNullOrUndefined(initConfig.onResponseDataProperty) ? 'content' : initConfig.onResponseDataProperty,
    affectedTo: affectedTo,
    searchTargets: searchTargets,
    lazy: isNullOrUndefined(initConfig.lazy) ? true : initConfig.lazy,
    predefinedData: isNullOrUndefined(initConfig.predefinedData) ? [] : initConfig.predefinedData
  };
}


export function CreateNgAutocompleteAlt(config: LazyAutocompleteAltConfig) {

  config = {...CreateConfigOfNgAutocomplete(config)};

  return new XmaterialLazyAutocomplete(
    config.form,
    config.id,
    config.onFormTarget,
    config.onDisplayed,
    config.idInitializationValue,
    config.httpTarget,
    config.delay,
    config.page,
    config.size,
    config.isLastProperty,
    config.onResponseDataProperty,
    config.affectedTo,
    config.searchTargets,
    config.lazy,
    config.predefinedData
  )
}



export class XmaterialLazyAutocomplete<E> {


  /* Menampung data yang berhasil di ambil dari server, untuk ditampilkan ke user*/
  private _displayedData: E[] = [];

  /* Menampung data original yang berhasil di ambil dari server*/
  private _data: E[] = [];

  private _isFetchingHasStarted = false;

  private _isFetchingHasFinished = true;

  private _isProcessHasSuccess = false;

  private _isProcessHasFailed = false;

  private _failedMessage: any = '';

  private _isLast = false;

  private _isIdFounded = false;

  private _autocomplete: MatAutocomplete;

  private defaultFailedMessage = 'Data yang diinputkan tidak tepat';


  public httpSubscription: Subscription;


  // private oriFakeData = ['', '', '', '', ''];


  constructor(
    private _form: FormGroup,
    private id: string,
    private _onFormTarget: string, // controlTarget: string
    private _onDisplayed: ControlQualification, // controlNameOfDisplayedInput
    private _idInitializationValue: any, // initializationValue: any,
    private _httpTarget: Function, // serviceTarget: Function,
    private _delay?: number,
    private _page?: number,
    private _size?: number,
    private _isLastProperty?: string | Function, // lastIdentifierDataPropertyOnResponse?: string | Function,
    private _onResponseDataProperty?: string, // dataPropertyOnResponse?: string,
    private _affectedTo?: ControlQualification[],
    private _searchTargets?: ControlQualification[],
    private _lazy?: boolean,
    private _predefinedData?: any[]
  ) {

    if (_predefinedData && _predefinedData.length > 0) {
      this._data = [..._predefinedData];
      this._displayedData = [...this._data];
      this._isLast = true;
    }

  }


  get predefinedData(): any[] {
    return this._predefinedData;
  }

  set predefinedData(value: any[]) {
    this._predefinedData = value;
  }

  get autocomplete(): MatAutocomplete {
    return this._autocomplete;
  }

  initAutocompleteComponent(value: MatAutocomplete) {
    this._autocomplete = value;
  }

  get data(): E[] {
    return this._data;
  }

  get displayedData(): E[] {
    return this._displayedData;
  }

  get isFetchingHasStarted(): boolean {
    return this._isFetchingHasStarted;
  }

  get isFetchingHasFinished(): boolean {
    return this._isFetchingHasFinished;
  }

  get isProcessHasSuccess(): boolean {
    return this._isProcessHasSuccess;
  }

  get isProcessHasFailed(): boolean {
    return this._isProcessHasFailed;
  }

  get failedMessage(): string {
    return this._failedMessage;
  }

  get isLast(): boolean {
    return this._isLast;
  }

  get isIdFounded(): boolean {
    return this._isIdFounded;
  }

  public pipe(...pipes: any[]): XmaterialLazyAutocomplete<E> {
    return this;
  }


  get form(): FormGroup {
    return this._form;
  }

  get onFormTarget(): string {
    return this._onFormTarget;
  }

  get onDisplayed(): ControlQualification {
    return this._onDisplayed;
  }

  get idInitializationValue(): any {
    return this._idInitializationValue;
  }

  get httpTarget(): Function {
    return this._httpTarget;
  }

  get delay(): number {
    return this._delay;
  }

  get page(): number {
    return this._page;
  }

  get size(): number {
    return this._size;
  }

  get isLastProperty(): string | Function {
    return this._isLastProperty;
  }

  get onResponseDataProperty(): string {
    return this._onResponseDataProperty;
  }

  get affectedTo(): ControlQualification[] {
    return this._affectedTo;
  }

  get searchTargets(): ControlQualification[] {
    return this._searchTargets;
  }

  get lazy(): boolean {
    return this._lazy;
  }


  set displayedData(value: E[]) {
    this._displayedData = value;
  }

  set data(value: E[]) {
    this._data = value;
  }

  resetFlag() {
    this._isFetchingHasStarted = false;
    this._isFetchingHasFinished = true;
    this._isProcessHasSuccess = false;
    this._isProcessHasFailed = false;
  }

  /* */
  findIdControl(): ControlQualification {
    let c = [...this._affectedTo.filter(v => v.isId)];
    if (c.length === 0) {
      c.push(this._onDisplayed);
      c = [...c.filter(v => v.isId)]
    }

    return (c.length > 0) ? c[0] : {
      isId: true,
      onControlName: '',
      onResponseProperty: ''
    }
  }

  public isEnabled(ctrl = this.findIdControl().onControlName) {
    if (typeof ctrl === 'string') {
      return !(<FormGroup>this._form.controls[this._onFormTarget]).controls[String(ctrl)].disabled;
    } else {
      return  !(delegateFormControl((<FormGroup>this._form.controls[this._onFormTarget]), <string[]> ctrl)).disabled;
    }
  }


  public control(ctrl = this.findIdControl().onControlName): FormControl {
    if (typeof ctrl === 'string') {
      return (<FormControl>(<FormGroup>this._form.controls[this._onFormTarget]).controls[String(ctrl)]);
    } else {
      return delegateFormControl((<FormGroup>this._form.controls[this._onFormTarget]), <string[]>ctrl);
    }
  }


  private started(start: boolean) {
    this._isFetchingHasStarted = start;
    this._isFetchingHasFinished = !this._isFetchingHasStarted;
  }


  private finished(finish: boolean) {
    this._isFetchingHasFinished = finish;
    this._isFetchingHasStarted = !this._isFetchingHasFinished;
  }


  private successfully(success: boolean) {
    this._isProcessHasSuccess = success;
    this._isProcessHasFailed = !this._isProcessHasSuccess;
  }


  private failed(fail: boolean) {
    this._isProcessHasFailed = fail;
    this._isProcessHasSuccess = !this._isProcessHasFailed;
  }


  private qualifingPredicates(targetObject, search,
                              searchTargetProperties: ControlQualification[], byEnter: boolean,
                              ignoreCase = true) {
    for (const property of searchTargetProperties) {

      let target;
      if (typeof  property.onResponseProperty === 'string') {
        target = String(targetObject[property.onResponseProperty]);
      } else {
        target = delegateObjectValue(targetObject, <string[]>property.onResponseProperty)
      }

      // const target = String(targetObject[property.onResponseProperty]);
      const v1 = (ignoreCase) ? target.trim().toLowerCase() : target.trim();
      const v2 = ignoreCase ? String(search).trim().toLowerCase() : String(search).trim();

      if (byEnter) {
        if (v1 === v2) {
          return true;
        }
      } else {
        if (v1.includes(v2)) {
          return true;
        }
      }
    }

    return false;
  }

  predicateFiltering(values: E[], predicateConfig = {
                       showById: true,
                       value: '', //
                       triggeredByEnter: true
                     },
                     ignoreCase = true) {

    if (isNullOrUndefined(predicateConfig.value) || String(predicateConfig.value).length === 0) {
      return values;
    }

    if (predicateConfig.showById) {
      return values.filter(value => this.qualifingPredicates(value, predicateConfig.value, [this.findIdControl()],
        predicateConfig.triggeredByEnter, ignoreCase));
    } else {
      return values.filter(value => this.qualifingPredicates(value, predicateConfig.value,
        this._searchTargets, predicateConfig.triggeredByEnter, ignoreCase));
    }

  }


  fetch(successCallback: (data?: any, conf?) => void, failedCallback: (error?: any) => void,
        predicateConfig = {
          showById: true,
          value: '',
          triggeredByEnter: false,
          actionAt: -1
        }
  ) {

    if (!this._isLast) {

      if (!this._isFetchingHasStarted) {
        this.resetFlag();
        this.started(true); // indikator bahwa fetch data telah dimulai
      }

      setTimeout(() => {

        this.httpSubscription = (<Observable<E[]>>this._httpTarget(this._page, this._size)).pipe().subscribe(
          success => {


            /* cek jika last identifier properti jika merupakan fungsi */
            if (isFunction(this._isLastProperty)) {
              this._isLast = (<Function>this._isLastProperty)(success);
            } else {
              if (success[<string>this._isLastProperty] !== undefined) {
                this._isLast = success[<string>this._isLastProperty];
              }
            }


            if (!this._isLast) {
              /* naikan current page untuk proses fetach yang selanjutnya */
              this._page++;
            }

            this.successfully(true);
            this.finished(true);
            if (successCallback) {
              successCallback(success, predicateConfig);
            }
          },
          error => {
            this.failed(true);
            this.finished(true);
            if (failedCallback) {
              failedCallback(error);
            }
          }
        );


      }, this._delay);
    }

  }


}
