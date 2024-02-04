import { userDataBuilder } from '@/users/domain/testing/helpers/user-data-builder';
import {
  UserRules,
  UserValidator,
  UserValidatorFactory,
} from '../../user.validator';
import { UserProps } from '@/users/domain/entities/user.entity';

let sut: UserValidator;
let userProps: UserProps;

describe('UserValidator unit', () => {
  beforeEach(() => {
    sut = UserValidatorFactory.create();
    userProps = userDataBuilder({});
  });

  describe('Field: name', () => {
    describe('Valid cases', () => {
      it('should validate user corectly', () => {
        const isValid = sut.validate(userProps);

        expect(isValid).toBeTruthy();
        expect(sut.validatedData).toStrictEqual(new UserRules(userProps));
      });
    });

    describe('Invalid cases', () => {
      const nameFieldErrors = [
        'name must be shorter than or equal to 255 characters',
        'name should not be empty',
        'name must be a string',
      ];

      it('should invalidate all rules from name field', () => {
        const isValid = sut.validate(null);

        expect(isValid).toBeFalsy();
        expect(sut.errors['name']).toStrictEqual(nameFieldErrors);
      });

      it('should invalidate IsNotEmpty rule from name field', () => {
        const isValid = sut.validate({ ...userProps, name: '' });

        expect(isValid).toBeFalsy();
        expect(sut.errors['name']).toStrictEqual([nameFieldErrors[1]]);
      });

      it('should invalidate IsString rule from name field', () => {
        const isValid = sut.validate({
          ...userProps,
          name: 8 as any,
        });

        expect(isValid).toBeFalsy();
        expect(sut.errors['name']).toStrictEqual([
          nameFieldErrors[0],
          nameFieldErrors[2],
        ]);
      });

      it('should invalidate MaxLength rule from name field', () => {
        const isValid = sut.validate({
          ...userProps,
          name: 'a'.repeat(256),
        });

        expect(isValid).toBeFalsy();
        expect(sut.errors['name']).toStrictEqual([nameFieldErrors[0]]);
      });
    });
  });
});
