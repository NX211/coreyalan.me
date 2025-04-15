import { getSession, signIn, signOut, requireAuth, requireAdmin } from '@/lib/auth';
import { getServerSession } from 'next-auth';

const mockSession = {
  user: {
    id: '123',
    email: 'test@example.com',
    name: 'Test User',
    role: 'user'
  },
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
};

const mockAdminSession = {
  ...mockSession,
  user: {
    ...mockSession.user,
    role: 'admin'
  }
};

jest.mock('next-auth', () => ({
  getServerSession: jest.fn(),
}));

describe('Authentication', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should sign in successfully', async () => {
    const credentials = {
      email: 'test@example.com',
      password: 'password123',
    };

    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockSession),
      })
    );

    const result = await signIn(credentials);
    expect(result).toEqual(mockSession);
  });

  it('should handle sign in errors', async () => {
    const credentials = {
      email: 'test@example.com',
      password: 'wrongpassword',
    };

    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: false,
        status: 401,
        json: () => Promise.resolve({ error: 'Invalid credentials' }),
      })
    );

    await expect(signIn(credentials)).rejects.toThrow('Invalid credentials');
  });

  it('should sign out successfully', async () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
      })
    );

    await expect(signOut()).resolves.not.toThrow();
  });

  it('should get current session', async () => {
    (getServerSession as jest.Mock).mockResolvedValue(mockSession);
    const session = await getSession();
    expect(session).toEqual(mockSession);
  });

  it('should handle session errors', async () => {
    (getServerSession as jest.Mock).mockRejectedValue(new Error('Session error'));
    await expect(getSession()).rejects.toThrow('Failed to get session');
  });

  it('should require auth', async () => {
    (getServerSession as jest.Mock).mockResolvedValue(mockSession);
    await expect(requireAuth()).resolves.toEqual(mockSession);
  });

  it('should throw when not authenticated', async () => {
    (getServerSession as jest.Mock).mockResolvedValue(null);
    await expect(requireAuth()).rejects.toThrow('Unauthorized');
  });

  it('should require admin role', async () => {
    (getServerSession as jest.Mock).mockResolvedValue(mockAdminSession);
    await expect(requireAdmin()).resolves.toEqual(mockAdminSession);
  });

  it('should throw when not admin', async () => {
    (getServerSession as jest.Mock).mockResolvedValue(mockSession);
    await expect(requireAdmin()).rejects.toThrow('Forbidden');
  });
}); 