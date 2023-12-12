export class AuthLoginData {
  constructor(token: String, username: String, expiration: String) {
    this.token = token;
    this.username = username;
    this.expiration = expiration;
  }
  token: String;
  username: String;
  expiration: String;
}
