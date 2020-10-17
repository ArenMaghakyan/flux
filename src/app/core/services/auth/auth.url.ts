class AuthApiUrl {
  constructor() {
  }

  public get login() {
    return 'customer/getCustomerWithEmailAndPass';
  }

}

export const AUTH_API_URL = new AuthApiUrl();
