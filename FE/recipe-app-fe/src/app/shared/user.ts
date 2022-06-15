export class User {
  _id!: string;
  username!: string;
  fullname!: string;
  email!: string;
  password!: string;
}

export interface Lists {
  lists: object[];
}