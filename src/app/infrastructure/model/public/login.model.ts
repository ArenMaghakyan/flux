import { ILogin } from '../../interface/public';

export class LoginModel implements ILogin {
  public email: string;
  public password: string;

  constructor(src: ILogin) {
    this.email = src.email || '';
    this.password = src.password || null;
  }
}
