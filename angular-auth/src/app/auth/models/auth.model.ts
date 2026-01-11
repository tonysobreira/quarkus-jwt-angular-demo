export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
}

export interface UserInfo {
  sub: string;
  name: string;
  roles: string[];
  exp: number;
  groups: string[];
  full_name: string;
}
