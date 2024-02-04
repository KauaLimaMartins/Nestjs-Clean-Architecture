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

  it('should validate all user props corectly', () => {
    const isValid = sut.validate(userProps);

    expect(isValid).toBeTruthy();
    expect(sut.validatedData).toStrictEqual(new UserRules(userProps));
  });

  // NAME FIELD
  describe('Invalidation cases for name field', () => {
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

  // EMAIL FIELD
  describe('Invalidation cases for email field', () => {
    const emailFieldErrors = [
      'email must be shorter than or equal to 255 characters',
      'email should not be empty',
      'email must be an email',
    ];

    it('should invalidate all rules from email field', () => {
      const isValid = sut.validate(null);

      expect(isValid).toBeFalsy();
      expect(sut.errors['email']).toStrictEqual(emailFieldErrors);
      console.log(sut.errors['email']);
    });

    it('should invalidate IsNotEmpty rule from email field', () => {
      const isValid = sut.validate({ ...userProps, email: '' });

      expect(isValid).toBeFalsy();
      expect(sut.errors['email']).toStrictEqual([
        emailFieldErrors[1],
        emailFieldErrors[2],
      ]);
    });

    it('should invalidate IsEmail rule from email field', () => {
      const isValid = sut.validate({
        ...userProps,
        email: 'wrongemail.com',
      });

      expect(isValid).toBeFalsy();
      expect(sut.errors['email']).toStrictEqual([emailFieldErrors[2]]);
    });

    it('should invalidate MaxLength rule from email field', () => {
      const isValid = sut.validate({
        ...userProps,
        email: 'a'.repeat(256),
      });

      expect(isValid).toBeFalsy();
      expect(sut.errors['email']).toStrictEqual([
        emailFieldErrors[0],
        emailFieldErrors[2],
      ]);
    });
  });

  // PASSWORD FIELD
  describe('Invalidation cases for password field', () => {
    const passwordFieldErrors = [
      'password must be shorter than or equal to 100 characters',
      'password should not be empty',
      'password must be a string',
    ];

    it('should invalidate all rules from password field', () => {
      const isValid = sut.validate(null);

      expect(isValid).toBeFalsy();
      expect(sut.errors['password']).toStrictEqual(passwordFieldErrors);
    });

    it('should invalidate IsNotEmpty rule from password field', () => {
      const isValid = sut.validate({ ...userProps, password: '' });

      expect(isValid).toBeFalsy();
      expect(sut.errors['password']).toStrictEqual([passwordFieldErrors[1]]);
    });

    it('should invalidate IsString rule from password field', () => {
      const isValid = sut.validate({
        ...userProps,
        password: 8 as any,
      });

      expect(isValid).toBeFalsy();
      expect(sut.errors['password']).toStrictEqual([
        passwordFieldErrors[0],
        passwordFieldErrors[2],
      ]);
    });

    it('should invalidate MaxLength rule from password field', () => {
      const isValid = sut.validate({
        ...userProps,
        password: 'a'.repeat(256),
      });

      expect(isValid).toBeFalsy();
      expect(sut.errors['password']).toStrictEqual([passwordFieldErrors[0]]);
    });
  });

  // CREATED AT FIELD
  describe('Invalidation cases for createdAt field', () => {
    const createdAtFieldErrors = ['createdAt must be a Date instance'];

    it('should invalidate IsDate rule from createdAt field', () => {
      const isValid = sut.validate({ ...userProps, createdAt: 10 as any });

      expect(isValid).toBeFalsy();
      expect(sut.errors['createdAt']).toStrictEqual([createdAtFieldErrors[0]]);
    });
  });
});
