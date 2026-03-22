export interface SignupData {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
}
export interface LoginData {
  email: string;
  password: string;
}
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface getCurrentUserResponse {
  user: User;
}
export interface AuthResponse {
  user: User;
  token: string;
  success: boolean;
}
