import { userDataBuilder } from '@/users/domain/testing/helpers/user-data-builder';
import { UserEntity, UserProps } from '../../user.entity';

describe('UserEntity unit tests', () => {
  let props: UserProps;
  let sut: UserEntity;

  beforeEach(() => {
    props = userDataBuilder({});

    sut = new UserEntity(props);
  });

  describe('Constructor', () => {
    it('should run constructor method correctly', () => {
      expect(sut.props.name).toEqual(props.name);
      expect(sut.props.email).toEqual(props.email);
      expect(sut.props.password).toEqual(props.password);
      expect(sut.props.createdAt).toBeInstanceOf(Date);
    });
  });

  describe('Getters', () => {
    it('should get name field', () => {
      expect(props.name).toBeDefined();
      expect(props.name).toEqual(sut.name);
      expect(typeof sut.name).toBe('string');
    });

    it('should get email field', () => {
      expect(props.email).toBeDefined();
      expect(props.email).toEqual(sut.email);
      expect(typeof sut.email).toBe('string');
    });

    it('should get password field', () => {
      expect(props.password).toBeDefined();
      expect(props.password).toEqual(sut.password);
      expect(typeof sut.password).toBe('string');
    });

    it('should get createdAt field', () => {
      expect(props.createdAt).toBeDefined();
      expect(props.createdAt).toBeInstanceOf(Date);
    });
  });

  describe('Setters', () => {
    it('should set name field', () => {
      const newName = 'other name';
      sut['name'] = newName;

      expect(props.name).toEqual(newName);
      expect(typeof sut.name).toBe('string');
    });

    it('should set password field', () => {
      const newPassword = 'other password';
      sut['password'] = newPassword;

      expect(props.password).toEqual(newPassword);
      expect(typeof sut.password).toBe('string');
    });
  });

  describe('Methods', () => {
    it('should update a user', () => {
      const newName = 'other name 2';
      sut.update(newName);

      expect(props.name).toEqual(newName);
      expect(typeof sut.name).toBe('string');
    });

    it('should update user password field', () => {
      const newPassword = 'other password 2';
      sut.updatePassword(newPassword);

      expect(props.password).toEqual(newPassword);
      expect(typeof sut.password).toBe('string');
    });
  });
});
