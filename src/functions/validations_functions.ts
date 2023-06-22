import {AbstractControl, ValidatorFn} from "@angular/forms";

export function noMatchValidator(field1: string, field2: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const value1 = control.get(field1)?.value;
      const value2 = control.get(field2)?.value;

      if (value1 !== value2) {
        return { mismatch: true };
      }

      return null;
    };
}
