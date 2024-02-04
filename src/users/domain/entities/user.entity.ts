import { Entity } from '@/shared/domain/entities/entity';
import { UserValidatorFactory } from '../validators/user.validator';

export type UserProps = {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
};

export class UserEntity extends Entity<UserProps> {
  public constructor(
    public readonly props: UserProps,
    id?: string,
  ) {
    UserEntity.validate(props);

    super(props, id);
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  public get name(): string {
    return this.props.name;
  }

  private set name(value: string) {
    this.props.name = value;
  }

  public get email(): string {
    return this.props.email;
  }

  public get password(): string {
    return this.props.password;
  }

  private set password(value: string) {
    this.props.password = value;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public update(value: string): void {
    UserEntity.validate({ ...this.props, name: value });

    this.name = value;
  }

  public updatePassword(value: string): void {
    UserEntity.validate({ ...this.props, password: value });

    this.password = value;
  }

  public static validate(props: UserProps) {
    const validator = UserValidatorFactory.create();

    validator.validate(props);
  }
}
