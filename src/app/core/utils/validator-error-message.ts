import { IValidatorErrorMessage } from '../../infrastructure/interface';

export function validatorErrorMessage(massageKey: string): IValidatorErrorMessage {
  return {
    [massageKey]: {
      valid: false,
    },
  };
}
