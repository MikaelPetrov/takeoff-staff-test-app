export type TypeLogin = {
  email: string;
  password: string;
  remember: boolean;
};

export type TypeJwtPair = {
  token_type: string;
  access_token: string;
};

export enum CodeResult {
  SUCCESS = 200,
  FAILED = 404,
}
