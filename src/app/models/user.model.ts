export interface IUser {
  _id?: number,
  name: string,
  hash?: string,
  role?: string,
  created?: Date,
  modified?: Date,
  lang?: string
};