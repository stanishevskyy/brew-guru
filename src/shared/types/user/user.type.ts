export interface User {
  id: number;

  // Basic info
  img?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  dateOfBirth: string;

  emailVerified: boolean;

  // Security
  twoFactorEnabled: boolean;

  // Meta
  createdAt: string;
  updatedAt: string;
}
