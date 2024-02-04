import { IsString, MaxLength, IsNotEmpty, IsNumber } from 'class-validator';
import { ClassFieldsValidator } from '../../class-validator-fields';

class StubRules {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  public name: string;

  @IsNumber()
  @IsNotEmpty()
  public price: number;

  public constructor(data: any) {
    Object.assign(this, data);
  }
}

class StubClassFieldsValidator extends ClassFieldsValidator<StubRules> {
  public validate(data: any): boolean {
    return super.validate(new StubRules(data));
  }
}

describe('ClassValdiatorFields integration tests', () => {
  it('should validate with errors', () => {
    const fieldsValidator = new StubClassFieldsValidator();

    const validationErrors = {
      name: [
        'name must be shorter than or equal to 255 characters',
        'name should not be empty',
        'name must be a string',
      ],
      price: [
        'price should not be empty',
        'price must be a number conforming to the specified constraints',
      ],
    };

    expect(fieldsValidator.validate(null)).toBeFalsy();
    expect(fieldsValidator.errors).toStrictEqual(validationErrors);
  });

  it('should validate without errors', () => {
    const fieldsValidator = new StubClassFieldsValidator();

    const dataToValidate = { name: 'value', price: 10 };

    expect(fieldsValidator.validate(dataToValidate)).toBeTruthy();
    expect(fieldsValidator.validatedData).toStrictEqual(
      new StubRules(dataToValidate),
    );
    expect(fieldsValidator.errors).toBeNull();
  });
});
