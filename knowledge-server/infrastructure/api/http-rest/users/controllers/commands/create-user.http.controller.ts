import { CreateUserCommand } from '@app/application/users/commands/create-user/create-user.command';
import { Either } from '@knowledge-base/shared';
import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserHttpRequest } from '../../requests/create-user.http.request';

@Controller()
export class CreateUserHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'The user already exists.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  @Post('users')
  async createUser(
    @Body(new ValidationPipe({ transform: true }))
    createUserRequestDTO: CreateUserHttpRequest,
  ) {
    const userCommand = new CreateUserCommand({
      email: createUserRequestDTO.email,
      password: createUserRequestDTO.password,
      firstName: createUserRequestDTO.firstName,
      lastName: createUserRequestDTO.lastName,
    });

    const userResult = await this.commandBus.execute<
      CreateUserCommand,
      Either<string, Error>
    >(userCommand);

    if (userResult.isFailure()) {
      throw new BadRequestException(userResult.value);
    }

    return {
      id: userResult.value,
    };
  }
}
