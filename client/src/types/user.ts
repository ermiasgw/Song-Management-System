export interface user {
    username: string | null;
    password: string | null;
  }

export interface userwithrole {
    _id: string;
    username: string;
    roles: [string] | [];
}