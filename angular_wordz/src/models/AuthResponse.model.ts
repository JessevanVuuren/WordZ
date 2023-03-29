export interface AuthResponse {
  user:  User;
  token: string;
  message: string;
}

export interface User {
  name:              string;
  email:             string;
  email_verified_at: null;
  created_at:        string;
  updated_at:        string;
}
