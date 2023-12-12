export class AuthSession {
  constructor(token: String, username: String, expires: String) {
    this.token = token;
    this.username = username;
    this.expires = expires;
  }

  token: String;
  username: String;
  expires: String;
}
