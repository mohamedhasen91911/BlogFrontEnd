export interface AuthResponseDTO {
  email: string;
  expiresOn: string;
  isAuthenticated: boolean;
  message: string | null;
  roles: string[];
  token: string;
  username: string;

}
