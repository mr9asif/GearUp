type Role = "CUSTOMER" | "PROVIDER";

export interface IRegisterUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  profileImage?: string;
  role?: Role;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IJwtPayload {
  id: string;
  email: string;
  role: string;
}