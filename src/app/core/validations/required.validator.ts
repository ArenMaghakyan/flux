import { AbstractControl } from '@angular/forms';
import { IValidatorErrorMessage } from '../../infrastructure/interface';
import { validatorErrorMessage } from '../utils/validator-error-message';

export class RequiredValidator {
  public static validate(c: AbstractControl): IValidatorErrorMessage {
    return RequiredValidator.isEmpty(c.value) ?
      validatorErrorMessage('requiredValid') : null;
  }

  private static isEmpty(value): boolean {
    return value === undefined || value === null ||
      (typeof value === 'string' && value.trim().length === 0) || (Array.isArray(value) && value.length === 0);
  }
}
