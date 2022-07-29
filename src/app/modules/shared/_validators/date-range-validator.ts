import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function DateRangeValidator(startDate: Date, endDate: Date): ValidatorFn  {
return (control: AbstractControl): ValidationErrors | null => {
    let result = true;
    const controlDate = new Date(control.value);
    const errorMessage = `Date shouldn't be`;
    if (startDate && controlDate < startDate) {
      result = false;
      errorMessage.concat(`less than ${startDate}`)
    }
    if (endDate && controlDate > endDate) {
      result = false;
      if (startDate) {
        errorMessage.concat(` or`);
      }
      errorMessage.concat(` more than ${endDate}`)
    }
    if (!result) {
      return { DateRange: errorMessage };
    } else {
      return null;
    }
  };
}
