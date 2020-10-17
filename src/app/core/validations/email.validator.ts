import { AbstractControl } from '@angular/forms';


import { appSettings } from '../../app.settings';
import { validatorErrorMessage } from '../utils/validator-error-message';
import { IValidatorErrorMessage } from '../../infrastructure/interface';


export class EmailValidator {
  public static validate(c: AbstractControl): IValidatorErrorMessage {
    if (c.value && c.value.trim()) {
      return appSettings.EMAIL_REG_EXP.test(c.value) ?
        null : validatorErrorMessage('emailValid');
    }
    return null;
  }
}
