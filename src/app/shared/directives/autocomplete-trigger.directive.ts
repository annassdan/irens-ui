import {
  AfterViewInit,
  ChangeDetectorRef,
  ContentChild,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {MatAutocomplete} from '@angular/material';

import {BhkMatAutocompleteTriggerDirective} from './app-mat-autocomplete';
import {Subscription} from 'rxjs';
import {isNullOrUndefined} from 'util';
import {Ui} from '../ui';
import {delegateObjectValue} from '../utils';
import {ControlQualification, CreateNgAutocompleteAlt, LazyAutocompleteAltConfig, XmaterialLazyAutocomplete} from '../constants';

@Directive({
  selector: '[appAutocompleteTrigger]'
})
export class AutocompleteTriggerDirective implements OnInit, AfterViewInit, OnDestroy {

  // @ContentChild(MatAutocompleteTrigger) trigger: MatAutocompleteTrigger;
  @ContentChild(BhkMatAutocompleteTriggerDirective) trigger: BhkMatAutocompleteTriggerDirective;


  @Output() whenValueSelected = new EventEmitter<any>();

  @Output() autoLazyInitializationCompleted = new EventEmitter<any>();

  @Input() autocompleteTarget: MatAutocomplete;

  @Input() configs: LazyAutocompleteAltConfig;

  autocompleteOptionSelectedListener: Subscription;

  private lazyAutocomplete: XmaterialLazyAutocomplete<any>;

  actionAt = 0;

  isEnterActivated = false;

  previousSelectedValue: any;

  predicateConfig = {
    showById: true,
    value: '',
    triggeredByEnter: false
  };

  displayedValueOnInput: string;


  nextOptionValue;


  clear = false;

  firstInit = true;


  constructor(private ref: ChangeDetectorRef,
              public  elementRef: ElementRef) {

    this.elementRef.nativeElement.addEventListener('toAutocompleteDirectiveRemovePreviousValue', ($event) => {
      this.clear = true;
      this.displayedValueOnInput = '';
      this.previousSelectedValue = undefined;
      this.nextOptionValue = $event.clearValue;
      this.selectValue(undefined);
    });


    /* listen jika data yang terpilih sudah ada pada daftar list dari parent item */
    this.elementRef.nativeElement.addEventListener('toAutocompleteDirective', ($event) => {

      // if (this.firstInit) {
      //   const v = this.configs.form.getRawValue();
      //
      //
      //   const targetValue = v[this.configs.onFormTarget];
      //
      //   console.log('wwwww', targetValue)
      //
      //   if (String(targetValue[UUID_COLUMN]).trim().length > 0) {
      //     this.nextOptionValue = v[this.configs.onFormTarget];
      //   }
      //
      //   this.firstInit = false;
      // }

      // console.log($event, 'toAutocompleteDirective', this.previousSelectedValue);
      if (!$event.detail.exists) {
        this.selectValue(this.nextOptionValue);
        this.whenValueSelected.emit({value: this.nextOptionValue, bridge: this.elementRef, emit: false, onInit: false});
      } else {
        this.selectValue(this.previousSelectedValue);
      }


    });
  }


  @HostListener('blur', ['$event'])
  onBlur($event) {



    let onDiplayedBlurValue;
    try {
      onDiplayedBlurValue = $event.path[0].value;
    } catch (e) {
      onDiplayedBlurValue = $event.target.value;
    }
    if (this.clear) {
      return;
    }


    if (this.previousSelectedValue !== undefined) {
      const previousValueOrigin =
        (typeof this.lazyAutocomplete.onDisplayed.onResponseProperty === 'string')
        ? this.previousSelectedValue[String(this.lazyAutocomplete.onDisplayed.onResponseProperty)]
        : delegateObjectValue(this.previousSelectedValue, <string[]> this.lazyAutocomplete.onDisplayed.onResponseProperty);


      if (previousValueOrigin !== onDiplayedBlurValue) {
        setTimeout(() => {
          this.whenValueSelected.emit({
            value: this.previousSelectedValue,
            bridge: this.elementRef,
            emit: true,
            onInit: false
          });
        }, 20);
      } else {
      }
    } else {
      this.whenValueSelected.emit({
        value: this.previousSelectedValue,
        bridge: this.elementRef,
        emit: true,
        onInit: false
      });
    }
  }


  @HostListener('keyup', ['$event'])
  onKeyup($event) {


    /* reset clear status for button clear*/
    if (this.clear) {
      this.clear = false;
    }

    // keyCode = 32 // spasi
    /* give increment on action to syncronizing reposne data callback */
    this.actionAt++; //
    this.trigger.updatePosition();

    try {
      /* catch native value on webkit  */
      this.displayedValueOnInput = $event.path[0].value;
    } catch (e) {
      /* catch native value on moz */
      this.displayedValueOnInput = $event.target.value;

    }




    if ($event.keyCode === 13) { // jika enter
      this.isEnterActivated = true;
      const conf = {
        showById: false,
        value: this.displayedValueOnInput,
        triggeredByEnter: true,
        actionAt: this.actionAt
      };


    } else {



      this.isEnterActivated = false;
      const conf = {
        value: this.displayedValueOnInput,
        showById: false,
        triggeredByEnter: false,
        actionAt: this.actionAt
      };

      const searching = this.search(conf);

      if (!searching.finded) {
        this.tryBlockPanel();
        /* re-fetch data from database until finded or last data */
        this.lazyAutocomplete.fetch(data => {
            if (this.whenResponseHasSuccess(data, conf)) {
              this.tryUnblockPanel();
            }
          }, error => {

          }, conf
        );
      }
    }
  }

  @HostListener('click', ['$event'])
  onClick($event) {

    $event.target.select();
    this.tryBlockPanel();


    /* Optimizing data suggestion */
    const v = {...this.configs.form.getRawValue()};
    const targetValue = v[this.configs.onFormTarget];

    if (typeof this.configs.onDisplayed.onControlName === 'string') {
       if (String(targetValue[this.configs.onDisplayed.onControlName]).trim().length === 0) {
         this.lazyAutocomplete.displayedData = [...this.lazyAutocomplete.data];
         this.trigger.openPanel();
         this.trigger.updatePosition();
       }
    } else {
      if (delegateObjectValue(targetValue, this.configs.onDisplayed.onControlName).trim().length === 0) {
        this.lazyAutocomplete.displayedData = [...this.lazyAutocomplete.data];
        this.trigger.openPanel();
        this.trigger.updatePosition();
      }
    }


    if (this.firstInit) {
      if (String(targetValue[this.configs.id]).trim().length > 0) {
        this.nextOptionValue = v[this.configs.onFormTarget];
      }
      this.firstInit = false;
    }

    /* end of optimizing data suggestion */

  }


  ngOnInit(): void {
    this.initAutocomplete();
  }

  ngAfterViewInit(): void {

    this.previousSelectedValue = this.configs.form.getRawValue() ? this.configs.form.getRawValue()[this.lazyAutocomplete.onFormTarget] : undefined;
    if (this.configs.form.getRawValue()) {

      this.whenValueSelected.emit({
        value: this.previousSelectedValue,
        bridge: this.elementRef,
        emit: false,
        onInit: true
      });
    }

    this.lazyAutocomplete.initAutocompleteComponent(this.autocompleteTarget);
    /* listen to autocomplete clicked or selected value event */
    this.autocompleteOptionSelectedListener = this.autocompleteTarget.optionSelected.subscribe(next => {
      this.isEnterActivated = false;

      // console.log(this.configs.form.getRawValue())

      // this.ref.detectChanges();
      /* jika value dari data yang terklik tidak ada/ kosong*/
      if (next.option.value === null) {
        setTimeout(() => {
          this.next();
        }, 15);
      } else {
        if (next.option.value !== undefined) {
          this.nextOptionValue = next.option.value;
          this.whenValueSelected.emit({value: next.option.value, bridge: this.elementRef, emit: true, onInit: false});
        }
      }
    });




  }


  /* */
  initAutocomplete() {
    /* init lazy auto */
    this.lazyAutocomplete = CreateNgAutocompleteAlt(this.configs);
    this.autoLazyInitializationCompleted.emit(this.lazyAutocomplete);

    /* init data of lazy auto */
    // if (!this.lazyAutocomplete.isLast) {


    const conf = {...this.predicateConfig, actionAt: -1};
    const searching = this.search(conf);
    /* jika data yang dicari ada pada memory/ atau list data yang sudah ditampilkan ke user */

    if (!searching.finded && !this.lazyAutocomplete.isLast) {
      this.lazyAutocomplete.fetch(data => {
          if (this.whenResponseHasSuccess(data, conf)) {
            this.tryUnblockPanel();
          }
        }, error => {

        }, conf
      );
    }

    // }


  }


  selectValue(value) {
    this.previousSelectedValue = value;
    this.affeting(value);
  }


  affeting(object) {

    const undefinet = isNullOrUndefined(object);

    const affected = [...this.lazyAutocomplete.affectedTo, this.lazyAutocomplete.onDisplayed];
    affected.forEach((value: ControlQualification) => {

      const vb = undefinet
        ? ''
        : (
          (typeof value.onResponseProperty === 'string')
          ? object[String(value.onResponseProperty)]
          : delegateObjectValue(object, <string[]>value.onResponseProperty)
        );

      this.lazyAutocomplete.control(value.onControlName).setValue(vb);
    });

    this.displayedValueOnInput = undefinet
      ? ''
      : (
        (typeof this.lazyAutocomplete.onDisplayed.onResponseProperty === 'string')
          ? object[String(this.lazyAutocomplete.onDisplayed.onResponseProperty)]
          : delegateObjectValue(object, <string[]>this.lazyAutocomplete.onDisplayed.onResponseProperty)
      ); // object[this.lazyAutocomplete.onDisplayed.onResponseProperty];


  }


  next() {

    this.trigger.openPanel();
    this.tryBlockPanel();
    const conf = {...this.predicateConfig, actionAt: -1};

    this.lazyAutocomplete.fetch(data => {
        if (this.whenResponseHasSuccess(data, conf)) {
          this.tryUnblockPanel();
        }
      }, error => {

      }, conf
    );
  }


  whenResponseHasSuccess(success,
                         predicateConfig = {
                           showById: true,
                           value: '',
                           triggeredByEnter: false,
                           actionAt: -1
                         }) {

    if (this.assignResponseData(success)) {
      const filtering = this.search(predicateConfig);
      if (!filtering.finded) {

        /* re-fetch data from database until finded or last data */
        this.lazyAutocomplete.fetch(data => {
            if (this.whenResponseHasSuccess(data, predicateConfig)) {
              this.tryUnblockPanel();
            }
          }, error => {

          }, predicateConfig
        );
      }
    }


    return true;
  }

  whenResponseHasFailed(error) {

  }

  assignResponseData(success: any): boolean {
    const dataProperty = this.lazyAutocomplete.onResponseDataProperty;
    /* assign dengan data response dari server */
    const tempResponse =
      (dataProperty !== undefined && dataProperty.length === 0)
        ? success
        : success[dataProperty];

    if (!tempResponse.length) {
      return false;
    }

    this.lazyAutocomplete.data = [...this.lazyAutocomplete.data, ...tempResponse];
    this.lazyAutocomplete.data = [...this.uniquingData(this.lazyAutocomplete.data)];

    return true;
  }


  uniquingData(arr: any[], byProperty = this.lazyAutocomplete.findIdControl().onResponseProperty) {
    return arr
      .map(e => {
        if (typeof byProperty === 'string') {
          return e[byProperty];
        } else {
          return delegateObjectValue(e, <string[]> byProperty);
        }
        // return '';
      })
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter(e => arr[e])
      .map(e => arr[e]);
  }


  search(/* Jika hanya memiliki id dan ingin menampilkan nilai properti/control yang ingin dilihatoleh user */
         predicateConfig = {
           showById: true,
           value: '',
           triggeredByEnter: false,
           actionAt: -1
         },
         ignoreCase = true
  ) {

    /* check existing displayed data */
    const res = this.lazyAutocomplete.predicateFiltering(this.lazyAutocomplete.data, predicateConfig, ignoreCase);
    this.lazyAutocomplete.displayedData = [...res];

    if (res.length > 0) {
      return {
        finded: true,
        length: res.length
      };
    }

    /* jika data yang dipake adalah data init */
    if (this.lazyAutocomplete.predefinedData && this.lazyAutocomplete.predefinedData.length > 0) {
      return {
        finded: true,
        length: this.lazyAutocomplete.predefinedData.length
      };
    }


    this.ref.detectChanges();
    return {
      finded: false,
      length: 0
    };
  }





  @HostListener('focusin', ['$event'])
  onFocusIn($event) {
    this.tryBlockPanel();
  }


  private tryUnblockPanel() {
    Ui.unblockUI('.mat-autocomplete-panel');
  }

  private tryBlockPanel() {
    /* Block ui on init auto */
    setTimeout(() => {
      if (this.lazyAutocomplete.isFetchingHasStarted) {
        Ui.blockUI('.mat-autocomplete-panel', 0.1, 0);
      }
    }, 15);
  }


  ngOnDestroy(): void {
    this.autocompleteOptionSelectedListener.unsubscribe();

    if (this.lazyAutocomplete.httpTarget) {
      this.lazyAutocomplete.httpSubscription.unsubscribe();
    }
  }


}
