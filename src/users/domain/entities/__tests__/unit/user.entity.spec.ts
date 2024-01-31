import { UserEntity, UserProps } from '../../user.entity';
import { faker } from '@faker-js/faker';

describe('UserEntity unit tests', () => {
  let props: UserProps;
  let sut: UserEntity;

  beforeEach(() => {
    props = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

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
    it('should get name correctly', () => {
      expect(props.name).toBeDefined();
      expect(props.name).toEqual(sut.name);
      expect(typeof sut.name).toBe('string');
    });

    it('should get email correctly', () => {
      expect(props.email).toBeDefined();
      expect(props.email).toEqual(sut.email);
      expect(typeof sut.email).toBe('string');
    });

    it('should get password correctly', () => {
      expect(props.password).toBeDefined();
      expect(props.password).toEqual(sut.password);
      expect(typeof sut.password).toBe('string');
    });

    it('should get createdAt correctly', () => {
      expect(props.createdAt).toBeDefined();
      expect(props.createdAt).toBeInstanceOf(Date);
    });
  });
});
