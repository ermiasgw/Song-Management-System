export interface AuthState {
    accessToken: string | null;
    username: string | null;
    roles: [string] | [];
    registrationerror: string | null;
    loginerror: string | null;
  }
