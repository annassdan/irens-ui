import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {LazyAutocompleteAltConfig, XmaterialLazyAutocomplete} from '../../constants';
import {delegateFormControl, delegateObjectValue} from '../../utils';

@Component({
  selector: 'app-my-auto-complete',
  templateUrl: './my-auto-complete.component.html',
  styleUrls: ['./my-auto-complete.component.scss']
})
export class MyAutoCompleteComponent implements OnInit, AfterViewInit, AfterContentChecked {

  @Output() whenValueSelected = new EventEmitter<any>();

  @Input() config: LazyAutocompleteAltConfig;

  @Input() placeholder = '';

  @Input() appearance = 'legacy';

  public autocompleteLazy: XmaterialLazyAutocomplete<any>;

  whenValueSelectedEvent: any;

  @ViewChild('trigger') triggerElement: ElementRef<HTMLInputElement>;

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.ref.detectChanges();
  }

  ngAfterViewInit(): void {

  }

  ngAfterContentChecked(): void {
    this.ref.detectChanges();
  }




  isOutlineAppearance() {
    return String(this.appearance).trim().toLowerCase() === 'outline';
  }

  isControlValueEmpty() {
    try {
      if (String(this.autocompleteLazy.control().value).trim().length === 0) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return true;
    }
  }


  useClearButton() {
    if (this.config.useClearButton === undefined || this.config.useClearButton === false) {
      return false;
    } else {
      return true;
    }
  }

  getFormGroupOfTarget() {
    return (<FormGroup> this.config.form.controls[this.config.onFormTarget]);
  }


  getFormControlOfTarget() {
    if (typeof this.config.onDisplayed.onControlName === 'string') {
      return <FormControl> this.getFormGroupOfTarget().controls[String(this.config.onDisplayed.onControlName)];
    } else {
      return delegateFormControl(this.getFormGroupOfTarget(), <string[]> this.config.onDisplayed.onControlName)
    }
  }


  displayingOnList(v) {
    if (typeof this.autocompleteLazy.onDisplayed.onResponseProperty === 'string') {
      return v[String(this.autocompleteLazy.onDisplayed.onResponseProperty)];
    } else {
      return delegateObjectValue(v, <string[]>this.autocompleteLazy.onDisplayed.onResponseProperty);
    }
  }

  onSelfEmit($event: any) {

    if ($event.emit) {
      /* callback event to directive */
      $event.bridge.nativeElement.dispatchEvent(new CustomEvent('toAutocompleteDirective', {
        detail: { exists: false }
      }));
    }



  }

  onValueSelected(value) {
    this.whenValueSelectedEvent = value;
    if (this.whenValueSelected.observers.length === 0) {
      this.onSelfEmit(value);
    } else  {
      this.whenValueSelected.emit(value);
    }


    this.ref.detectChanges();
  }


  displayFn = (opt?): any | undefined => {
    return opt ? (
      (typeof this.autocompleteLazy.onDisplayed.onResponseProperty === 'string')
      ? opt[String(this.autocompleteLazy.onDisplayed.onResponseProperty)]
      : delegateObjectValue(opt, <string[]> this.autocompleteLazy.onDisplayed.onResponseProperty)
    ) : '';
  };

  /* Inisialiassasi nilai/ klass autocomplte */
  initializingAutocomplteLazy($auto: any) {
    this.autocompleteLazy = $auto;
  }

  clear() {

    this.whenValueSelectedEvent.bridge.nativeElement.dispatchEvent(new CustomEvent('toAutocompleteDirectiveRemovePreviousValue', {
      detail: { unknown: false }
    }));


    this.triggerElement.nativeElement.blur();
    this.triggerElement.nativeElement.value = '';
  }

}
