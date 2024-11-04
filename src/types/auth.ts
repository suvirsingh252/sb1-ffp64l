export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export type UserRole = 'BOOKING_AGENT' | 'ENERGY_ADVISOR' | 'TECH_TEAM' | 'ADMIN' | 'TRAINEE';

export interface LoginCredentials {
  email: string;
  password: string;
}