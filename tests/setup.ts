import '@testing-library/jest-dom';
import { mockApiResponses } from './utils/mocks';
import { TextEncoder, TextDecoder } from 'util';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { SecurityLogger } from '../src/lib/security-logger';
import React from 'react';
import { Redis } from '@upstash/redis';
import { configure } from '@testing-library/react';

// Mock environment variables
process.env.SMTP_HOST = 'test-smtp-host';
process.env.SMTP_PORT = '587';
process.env.SMTP_SECURE = 'false';
process.env.SMTP_USER = 'test@example.com';
process.env.SMTP_PASSWORD = 'test-password';
process.env.SMTP_FROM = 'noreply@test.com';
process.env.CONTACT_EMAIL = 'test@example.com';
process.env.REDIS_URL = 'https://test-redis.upstash.io';
process.env.REDIS_TOKEN = 'test-token';
process.env.UPSTASH_REDIS_REST_URL = 'https://test.upstash.io';
process.env.UPSTASH_REDIS_REST_TOKEN = 'test-token';

// Mock nodemailer
jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockResolvedValue({
      messageId: 'test-message-id',
      response: '250 OK'
    })
  })
}));

// Extend Jest matchers
interface CustomMatchers<R = unknown> {
  toHaveNoViolations(): R;
}

declare global {
  namespace jest {
    interface Matchers<R> extends CustomMatchers<R> {}
  }
}

// Mock global objects
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;

// Mock fetch
global.fetch = jest.fn();

// Mock Response and Request
class MockResponse {
  private _body: BodyInit | null;
  private _init: ResponseInit;
  private _headers: Headers;

  constructor(body?: BodyInit | null, init?: ResponseInit) {
    this._body = body || null;
    this._init = init || {};
    this._headers = new Headers(init?.headers);
  }

  static error() {
    return new MockResponse(null, { status: 500 });
  }

  static json(data: any, init?: ResponseInit) {
    return new MockResponse(JSON.stringify(data), {
      ...init,
      headers: {
        ...init?.headers,
        'Content-Type': 'application/json',
      },
    });
  }

  static redirect(url: string | URL, status?: number) {
    return new MockResponse(null, {
      status: status || 302,
      headers: {
        Location: url.toString(),
      },
    });
  }

  get headers() {
    return this._headers;
  }

  get ok() {
    return this._init.status ? this._init.status >= 200 && this._init.status < 300 : true;
  }

  get redirected() {
    return false;
  }

  get status() {
    return this._init.status || 200;
  }

  get statusText() {
    return this._init.statusText || 'OK';
  }

  get type() {
    return 'basic';
  }

  get url() {
    return '';
  }

  get body() {
    return null;
  }

  get bodyUsed() {
    return false;
  }

  async arrayBuffer() {
    return new ArrayBuffer(0);
  }

  async blob() {
    return new Blob();
  }

  async formData() {
    return new FormData();
  }

  async json() {
    return this._body ? JSON.parse(this._body.toString()) : null;
  }

  async text() {
    return this._body ? this._body.toString() : '';
  }

  clone() {
    return new MockResponse(this._body, this._init);
  }
}

global.Response = MockResponse as any;

// Mock Redis
jest.mock('@upstash/redis', () => ({
  Redis: jest.fn().mockImplementation(() => ({
    get: jest.fn(),
    set: jest.fn(),
    incr: jest.fn(),
    expire: jest.fn(),
  })),
}));

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    pathname: '/',
    query: {},
    asPath: '/',
  }),
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock next-auth
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({
    data: null,
    status: 'unauthenticated',
  })),
  signIn: jest.fn(),
  signOut: jest.fn(),
  getSession: jest.fn(),
}));

// Mock next-auth/jwt
jest.mock('next-auth/jwt', () => ({
  getToken: jest.fn(),
}));

// Mock ResizeObserver
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Add missing globals
window.ResizeObserver = ResizeObserver;
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
};

// Suppress console errors in tests
const originalError = console.error;
console.error = (...args) => {
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('Warning: ReactDOM.render is no longer supported') ||
      args[0].includes('Warning: React.jsx'))
  ) {
    return;
  }
  originalError.call(console, ...args);
};

beforeAll(() => {
  console.error = (...args: Array<unknown>) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is no longer supported')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

// Mock Redis client
jest.mock('@/lib/redis', () => ({
  redis: {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
    incr: jest.fn(),
    expire: jest.fn(),
  },
  getRedisClient: jest.fn().mockReturnValue({
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
    incr: jest.fn(),
    expire: jest.fn(),
  }),
}));

// Mock NextRequest
class MockNextRequest {
  private _url: string;
  private _method: string;
  private _headers: Headers;
  private _cookies: Map<string, string>;
  private _nextUrl: URL;

  constructor(url: string, init?: RequestInit) {
    this._url = url;
    this._method = init?.method || 'GET';
    this._headers = new Headers(init?.headers);
    this._cookies = new Map();
    this._nextUrl = new URL(url, 'https://example.com');
  }

  get url() {
    return this._url;
  }

  get method() {
    return this._method;
  }

  get headers() {
    return this._headers;
  }

  get cookies() {
    return {
      get: (name: string) => this._cookies.get(name),
      set: (name: string, value: string) => this._cookies.set(name, value),
    };
  }

  get nextUrl() {
    return this._nextUrl;
  }

  clone() {
    return new MockNextRequest(this._url, {
      method: this._method,
      headers: this._headers,
    });
  }
}

// Mock NextResponse
class MockNextResponse {
  private _status: number;
  private _headers: Headers;
  private _body: any;

  constructor(body?: any, init?: ResponseInit) {
    this._status = init?.status || 200;
    this._headers = new Headers(init?.headers);
    this._body = body;
  }

  get status() {
    return this._status;
  }

  get headers() {
    return this._headers;
  }

  json() {
    return Promise.resolve(this._body);
  }

  static json(body: any, init?: ResponseInit) {
    return new MockNextResponse(body, init);
  }

  static next(init?: ResponseInit) {
    return new MockNextResponse(null, { ...init, status: 200 });
  }

  static redirect(url: string, init?: ResponseInit) {
    return new MockNextResponse(null, { ...init, status: 302, headers: { Location: url } });
  }
}

// Mock Next.js server components
jest.mock('next/server', () => ({
  NextRequest: MockNextRequest,
  NextResponse: MockNextResponse,
}));

// Mock next-auth
jest.mock('next-auth', () => ({
  getServerSession: jest.fn(() => ({
    user: {
      id: 'test-user-id',
      email: 'test@example.com',
      name: 'Test User',
      role: 'user',
    },
  })),
}));

// Mock SecurityLogger
jest.mock('@/lib/security-logger', () => ({
  SecurityLogger: {
    logSecurityEvent: jest.fn(),
  },
}));

// Mock console.error to prevent noise in test output
console.error = (...args: any[]) => {
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('Warning:') || args[0].includes('Error:'))
  ) {
    return;
  }
  originalError.call(console, ...args);
};

// Mock next-themes
jest.mock('next-themes', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
  useTheme: () => ({
    theme: 'light',
    setTheme: jest.fn(),
  }),
}));

// Mock next-auth/react
jest.mock('next-auth/react', () => ({
  SessionProvider: ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children),
  useSession: jest.fn(() => ({
    data: null,
    status: 'unauthenticated',
  })),
  signIn: jest.fn(),
  signOut: jest.fn(),
  getSession: jest.fn(),
}));

// Mock @/types/forms
jest.mock('@/types/forms', () => ({
  contactFormDataSchema: {
    parse: jest.fn((data) => data),
    safeParse: jest.fn((data) => ({ success: true, data })),
  },
}));

// Mock AppProvider
jest.mock('@/components/providers/AppProvider', () => ({
  AppProvider: ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children),
}));

class MockRequest {
  private _url: string;
  private _method: string;
  private _headers: Headers;
  private _cookies: Map<string, string>;
  private _nextUrl: URL;
  private _body: any;

  constructor(url: string, init?: RequestInit) {
    this._url = url;
    this._method = init?.method || 'GET';
    this._headers = new Headers(init?.headers);
    this._cookies = new Map();
    this._nextUrl = new URL(url, 'https://example.com');
    this._body = init?.body;
  }

  get url() {
    return this._url;
  }

  get method() {
    return this._method;
  }

  get headers() {
    return this._headers;
  }

  get cookies() {
    return this._cookies;
  }

  get nextUrl() {
    return this._nextUrl;
  }

  async json() {
    if (typeof this._body === 'string') {
      try {
        return JSON.parse(this._body);
      } catch (error) {
        throw new Error('Invalid JSON');
      }
    }
    return this._body;
  }
}

global.Request = MockRequest as any;

const mockRedisClient = {
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn(),
  incr: jest.fn(),
  expire: jest.fn(),
};

// Export mocks
export { MockRequest, MockResponse, mockRedisClient };

// Configure testing library
configure({
  asyncUtilTimeout: 5000,
  testIdAttribute: 'data-testid',
});

// Configure global.IS_REACT_ACT_ENVIRONMENT for act() support
global.IS_REACT_ACT_ENVIRONMENT = true;

declare global {
  var IS_REACT_ACT_ENVIRONMENT: boolean;
} 