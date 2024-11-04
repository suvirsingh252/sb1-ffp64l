import { User, UserRole } from '../types/auth';

const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'suvir.singh@gmail.com',
    name: 'Suvir Singh',
    role: 'ADMIN',
  },
];

export async function mockLogin(email: string, password: string): Promise<User> {
  const user = MOCK_USERS.find((u) => u.email === email);
  
  if (!user) {
    throw new Error('Invalid credentials');
  }

  return user;
}