import { v4 as uuidv4 } from 'uuid';

export abstract class Entity<EntityProps = any> {
  public readonly _id: string;
  public readonly props: EntityProps;

  public constructor(props: EntityProps, id?: string) {
    this._id = id || uuidv4();
    this.props = props;
  }

  public get id() {
    return this._id;
  }

  public toJSON(): Required<{ id: string } & EntityProps> {
    return {
      id: this._id,
      ...this.props,
    } as Required<{ id: string } & EntityProps>;
  }
}
