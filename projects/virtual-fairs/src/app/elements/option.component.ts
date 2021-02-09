import {Directive, EventEmitter, Input, Output} from '@angular/core';
import {OptionElement} from '../models';

@Directive()
export abstract class OptionComponent implements OptionElement<boolean> {

  @Input()
  value = false;
  @Output()
  valueChange: EventEmitter<boolean> = new EventEmitter();
  @Input()
  disabled = false;
  @Input()
  name: string

  toggle() {
    this.value = !this.value;
    this.valueChange.emit(this.value);
  }

  abstract tooltip(checked: boolean): string;
}
