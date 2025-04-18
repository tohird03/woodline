export interface ILoginForm {
  username: string;
  password: string;
}
export interface ILoginResponse {
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}
