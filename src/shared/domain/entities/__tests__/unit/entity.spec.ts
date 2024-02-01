import { validate as uuidValidate } from 'uuid';
import { Entity } from '../../entity';

type StubEntityProps = {
  prop1: string;
  prop2: number;
};

class StubEntity extends Entity<StubEntityProps> {}

describe('Entity unit tests', () => {
  const validUuid = 'eb67b3c4-22ef-4f44-95b5-a5f9593db5a4';

  it('should set props and set id automatically', () => {
    const props: StubEntityProps = {
      prop1: 'prop1',
      prop2: 20,
    };
    const entity = new StubEntity(props);

    expect(entity.props).toStrictEqual(props);
    expect(entity.id).not.toBeNull();
    expect(uuidValidate(entity.id)).toBeTruthy();
  });

  it('should accept a valid uuid', () => {
    const props: StubEntityProps = {
      prop1: 'prop1',
      prop2: 20,
    };
    const id = validUuid;
    const entity = new StubEntity(props, id);

    expect(uuidValidate(entity.id)).toBeTruthy();
    expect(entity.id).toBe(id);
  });

  it('should convert entity props to a javascript object', () => {
    const props: StubEntityProps = {
      prop1: 'prop1',
      prop2: 20,
    };
    const id = validUuid;
    const entity = new StubEntity(props, id);

    expect(entity.toJSON()).toStrictEqual({
      id,
      ...props,
    });
  });
});
