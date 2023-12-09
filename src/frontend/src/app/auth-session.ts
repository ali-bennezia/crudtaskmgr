export class AuthSession {
  constructor(token: String, username: String, expires: Date) {
    this.token = token;
    this.username = username;
    this.expires = expires;
  }

  token: String;
  username: String;
  expires: Date;
}
