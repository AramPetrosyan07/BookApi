import { User } from 'src/Schema/User.Schema';

export interface AuthResponse {
  user: Omit<User, 'passwordHash'>;
  jwt: string;
}
