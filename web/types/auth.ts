export type UserRole = "admin" | "area_manager" | "store_manager";

export type AuthUser = {
  id: string;
  email: string;
  role: UserRole;
};

export type LoginCredentials = {
  email: string;
  password: string;
};
