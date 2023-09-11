export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
}

export interface Role {
  roleADMIN: 'admin';
  roleUSER: 'user';
}
