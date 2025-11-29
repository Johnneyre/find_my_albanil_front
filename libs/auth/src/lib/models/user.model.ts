export interface User {
  id: number;
  nombreCompleto: string;
  email: string;
  avatar?: string;
  createdAt?: Date;
  companies?: UserCompany[];
}

export interface UserCompany {
  companyId: number;
  companyName: string;
  role: CompanyRole;
}

export enum CompanyRole {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
}

export interface Company {
  id: number;
  name: string;
  description?: string;
  logo?: string;
  createdAt?: Date;
  members?: CompanyMember[];
}

export interface CompanyMember {
  userId: number;
  userName: string;
  role: CompanyRole;
  joinedAt?: Date;
}
