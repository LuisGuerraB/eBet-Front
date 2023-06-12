import {Component, Input} from '@angular/core';
import {NgFor, NgIf} from '@angular/common';
import {AbstractControl, ValidationErrors} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-form-error-messages',
  standalone: true,
  imports: [NgIf,NgFor, TranslateModule],
  templateUrl: './form-error-messages.component.html',
  styleUrls: ['./form-error-messages.component.scss']
})
export class FormErrorMessagesComponent {
  @Input() control!: AbstractControl;

  shouldShowErrors(): boolean {
    return this.control.invalid &&  this.control.touched;
  }

  getErrors(): string[] {
    const errors: ValidationErrors | null = this.control.errors;
    return errors ? Object.keys(errors) : [];
  }

  getErrorMessage(errorKey: string): string {
    if (errorKey === 'required') {
      return 'control-error.required-field';
    }

    if (errorKey === 'email') {
      return 'control-error.email-format';
    }

    if(errorKey === 'minlength') {
      return 'control-error.min-length';
    }

    if(errorKey === 'incorrectOrientation'){
      return 'control-error.incorrect-orientation'
    }

    if(errorKey == 'min'){
      return 'control-error.min'
    }
    if(errorKey == 'max'){
      return 'control-error.max'
    }
    return 'control-error.unexpected';
  }
}
