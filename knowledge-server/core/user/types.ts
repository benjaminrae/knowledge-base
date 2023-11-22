export type UserProps = {
  email: string;
  firstName?: string;
  lastName?: string;
};

export type CreateUserProps = {
  email: string;
  firstName?: string;
  lastName?: string;
};

export type CreateUserCommandProps = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
};

export type UserCredentialsProps = {
  password: string;
  userId: string;
};

export type CreateUserCredentialsProps = {
  password: string;
  userId: string;
};
