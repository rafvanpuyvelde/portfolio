import UserCredential = firebase.auth.UserCredential;

export interface IUserService {
  logout(): void;
  login(email: string, password: string): Promise<boolean>;
  register(email: string, password: string, username: string): Promise<boolean>;
}
