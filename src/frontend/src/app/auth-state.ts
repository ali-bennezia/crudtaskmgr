import { AuthSession } from './auth-session';

export class AuthState {
  constructor(authentified: boolean, session: AuthSession | null) {
    this.authentified = authentified;
    this.session = session;
  }

  public authentified: boolean = false;
  public session: AuthSession | null = null;
}
