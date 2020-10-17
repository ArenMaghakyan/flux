import { IUser } from '../../../interface/features/dashboard';

export class UserModel implements IUser {
  public firstname: string;
  public lastname: string;
  public birthdate: Date;
  public id: string;

  constructor(src: IUser) {
    this.firstname = src.firstname || '';
    this.lastname = src.lastname || '';
    this.birthdate = src.birthdate || new Date();
    this.id = src.id || new Date().getTime() + '';
  }

}
