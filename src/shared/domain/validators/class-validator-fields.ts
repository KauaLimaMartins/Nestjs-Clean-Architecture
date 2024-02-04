import { validateSync } from 'class-validator';
import {
  FieldsErrors,
  FieldsValidatorInterface,
} from './fields-validator.interface';

export abstract class ClassFieldsValidator<ValidatedProps>
  implements FieldsValidatorInterface<ValidatedProps>
{
  errors: FieldsErrors = null;
  validatedData: ValidatedProps = null;

  public validate(data: any): boolean {
    const errors = validateSync(data);

    if (errors.length) {
      this.errors = {};

      for (const error of errors) {
        const field = error.property;
        this.errors[field] = Object.values(error.constraints);
      }
    } else {
      this.validatedData = data;
    }

    return !errors.length;
  }
}
