import { IUserSchema } from "../../types/user";

export const transformUserObj = (user: IUserSchema, jwtToken: string) => {
  const { email, firstName, lastName, id, userType, username } = user;
  return {
    email,
    firstName,
    lastName,
    id,
    userType,
    username,
    token: jwtToken,
  };
};
