import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { UserProps } from '../entities/user.entity';
import { ClassFieldsValidator } from '@/shared/domain/validators/class-validator-fields';

export class UserRules {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  public name: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  public password: string;

  @IsDate()
  @IsOptional()
  public createdAt?: Date;

  public constructor(data: UserProps) {
    Object.assign(this, data);
  }
}

export class UserValidator extends ClassFieldsValidator<UserRules> {
  public validate(data: UserProps): boolean {
    return super.validate(new UserRules(data ?? ({} as UserProps)));
  }
}

export class UserValidatorFactory {
  public static create(): UserValidator {
    return new UserValidator();
  }
}
