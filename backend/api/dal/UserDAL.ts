import { IUser, IUserSchema } from "../../types/user";
import AbstractDAL from "./AbstractDAL";
import User from "../model/User";
import QuickFixError from "../../modules/error";

export default class UserDAL extends AbstractDAL<IUserSchema> {
  update(model: IUserSchema): Promise<IUserSchema> {
    throw new Error("Method not implemented.");
  }

  insert = async (model: IUserSchema): Promise<IUserSchema> => {
    try {
      const userObj = new User(model);
      const savedUser = await userObj.save();
      return savedUser;
    } catch (err) {
      if (err.keyValue) {
        throw new QuickFixError({
          clientMsg: `${Object.keys(err.keyValue)[0]} already exists`,
        });
      }
      throw err;
    }
  };

  async fetch(model: IUserSchema): Promise<IUserSchema> {
    throw new Error("Method not implemented.");
  }

  fetchAll(): IUserSchema[] {
    throw new Error("Method not implemented.");
  }

  fetchById(id: string): Promise<IUserSchema> {
    throw new Error("Method not implemented.");
  }
}
