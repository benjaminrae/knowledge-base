import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserRequestDTO {
  @ApiProperty({
    example: 'user@email.com',
    description: 'User email address',
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    example: '123456',
    description: 'User password',
  })
  @IsNotEmpty()
  @IsStrongPassword({
    minNumbers: 1,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 1,
    minLength: 1,
  })
  readonly password: string;

  @ApiProperty({
    example: 'John',
    description: 'User first name',
  })
  @IsString()
  readonly firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'User last name',
  })
  @IsString()
  readonly lastName: string;
}
