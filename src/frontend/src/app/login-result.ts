export class LoginResult {
  constructor(succes: boolean, status: number) {
    this.success = succes;
    this.status = status;
  }

  public success: boolean = false;
  public status: number = 0;
}
