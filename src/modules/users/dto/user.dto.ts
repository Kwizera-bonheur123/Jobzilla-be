import {
  IsNotEmpty,
  IsString,
  IsEmail,
  Matches,
  IsEnum,
  MinLength,
} from 'class-validator';

export class createUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(['male', 'female'], {
    message: 'Enter valid gender male of female!',
  })
  gender: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, {
    message: 'Password must be at least 8 characters long',
  })
  @Matches(/(?=.*[A-Z])/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/(?=.*[a-z])/, {
    message: 'Password must contain at least one lowercase letter',
  })
  @Matches(/(?=.*\d)/, {
    message: 'Password must contain at least one number',
  })
  @Matches(/(?=.*\W)/, {
    message: 'Password must contain at least one special character',
  })
  password: string;
}