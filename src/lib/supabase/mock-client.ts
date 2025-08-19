// Mock Supabase client for development
/* eslint-disable @typescript-eslint/no-unused-vars */
import { PostgrestQueryBuilder } from '@supabase/postgrest-js';

// Define types compatible with real Supabase client
type SupabaseTable = Record<string, unknown>;
type SupabaseRelation = Record<string, unknown>;

// Mock QueryBuilder that mimics PostgrestQueryBuilder
type MockPostgrestQueryBuilder<T = unknown> = {
  select: (columns?: string) => MockQuery<T>;
  insert: (data: Partial<T> | Partial<T>[]) => MockQuery<T>;
  update: (data: Partial<T>) => MockQuery<T>;
  delete: () => MockQuery<T>;
  upsert: (data: Partial<T> | Partial<T>[], options?: { onConflict?: string }) => MockQuery<T>;
  eq: (column: keyof T | string, value: unknown) => MockQuery<T>;
  gt: (column: keyof T | string, value: unknown) => MockQuery<T>;
  gte: (column: keyof T | string, value: unknown) => MockQuery<T>;
  lt: (column: keyof T | string, value: unknown) => MockQuery<T>;
  lte: (column: keyof T | string, value: unknown) => MockQuery<T>;
  in: (column: keyof T | string, values: unknown[]) => MockQuery<T>;
  ilike: (column: keyof T | string, pattern: string) => MockQuery<T>;
  or: (expr: string) => MockQuery<T>;
  order: (column: keyof T | string, options?: { ascending?: boolean }) => MockQuery<T>;
  limit: (count: number) => MockQuery<T>;
  range: (from: number, to: number) => MockQuery<T>;
  single: () => Promise<MockQueryResult<T>>;
  then: <TResult1 = MockQueryResult<T[]>, TResult2 = never>(
    onfulfilled?: ((value: MockQueryResult<T[]>) => TResult1 | PromiseLike<TResult1>) | undefined | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | undefined | null
  ) => Promise<TResult1 | TResult2>;
};
export interface MockUser {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at?: string;
}

export interface MockSession {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user: MockUser;
}

export interface MockAuthResult {
  data: {
    user: MockUser | null;
    session: MockSession | null;
  };
  error: Error | null;
}

// Mock data store
const mockUsers: MockUser[] = [
  {
    id: 'user_1',
    email: 'demo@example.com',
    created_at: new Date().toISOString(),
    last_sign_in_at: new Date().toISOString()
  }
];

let currentSession: MockSession | null = null;

class MockSupabaseClientClass {
  auth = {
    getUser: async (): Promise<MockAuthResult> => {
      if (currentSession) {
        return {
          data: { user: currentSession.user, session: currentSession },
          error: null
        };
      }
      return {
        data: { user: null, session: null },
        error: null
      };
    },

    signInWithPassword: async (credentials: { email: string; password: string }): Promise<MockAuthResult> => {
      // Mock authentication - accept all credentials for testing
      const user = mockUsers.find(u => u.email === credentials.email) || mockUsers[0];
      
      currentSession = {
        access_token: 'mock_access_token',
        refresh_token: 'mock_refresh_token',
        expires_in: 3600,
        user: {
          id: user?.id || 'mock_user_id',
          email: user?.email || 'mock@example.com',
          created_at: user?.created_at || new Date().toISOString(),
          last_sign_in_at: new Date().toISOString()
        }
      };

      return {
        data: { user: currentSession?.user || null, session: currentSession },
        error: null
      };
    },

    signUp: async (credentials: { email: string; password: string }): Promise<MockAuthResult> => {
      const newUser: MockUser = {
        id: `user_${Date.now()}`,
        email: credentials.email,
        created_at: new Date().toISOString(),
        last_sign_in_at: new Date().toISOString()
      };

      mockUsers.push(newUser);

      currentSession = {
        access_token: 'mock_access_token',
        refresh_token: 'mock_refresh_token',
        expires_in: 3600,
        user: newUser
      };

      return {
        data: { user: newUser, session: currentSession },
        error: null
      };
    },

    signOut: async () => {
      currentSession = null;
      return { error: null };
    },

    onAuthStateChange: (callback: (event: string, session: MockSession | null) => void) => {
      // Mock auth state change listener
      callback('SIGNED_IN', currentSession);
      return {
        data: { subscription: {} },
        unsubscribe: () => {}
      };
    }
  };

  // Make from method compatible with real Supabase client
  from<T extends SupabaseTable = SupabaseTable>(
    relation: string
  ): MockPostgrestQueryBuilder<T> {
    // MockQuery は MockPostgrestQueryBuilder と互換のAPIを実装しているため、
    // 直接インスタンスを返して型キャストを不要化
    return new MockQuery<T>(relation, 'select');
  }
}

// 旧 MockTable は未使用になったため削除

interface MockQueryResult<T = unknown> {
  data: T | null;
  error: Error | null;
  count?: number | null;
  status: number;
  statusText: string;
}

class MockQuery<T = SupabaseTable> {
  constructor(
    private tableName: string,
    _operation: string,
    _columns?: string,
    _data?: Record<string, unknown>
  ) {}

  eq(_column: keyof T | string, _value: unknown): MockQuery<T> {
    return this;
  }

  gt(_column: keyof T | string, _value: unknown): MockQuery<T> {
    return this;
  }

  gte(_column: keyof T | string, _value: unknown): MockQuery<T> {
    return this;
  }

  lt(_column: keyof T | string, _value: unknown): MockQuery<T> {
    return this;
  }

  lte(_column: keyof T | string, _value: unknown): MockQuery<T> {
    return this;
  }

  in(_column: keyof T | string, _values: unknown[]): MockQuery<T> {
    return this;
  }

  ilike(_column: keyof T | string, _pattern: string): MockQuery<T> {
    return this;
  }

  or(_expr: string): MockQuery<T> {
    return this;
  }

  order(_column: keyof T | string, _options?: { ascending?: boolean }): MockQuery<T> {
    return this;
  }

  limit(_count: number): MockQuery<T> {
    return this;
  }

  range(_from: number, _to: number): MockQuery<T> {
    return this;
  }

  select(columns?: string): MockQuery<T> {
    return new MockQuery<T>(this.tableName, 'select', columns);
  }

  insert(data: Partial<T> | Partial<T>[]): MockQuery<T> {
    return new MockQuery<T>(this.tableName, 'insert', undefined, data as Record<string, unknown>);
  }

  update(data: Partial<T>): MockQuery<T> {
    return new MockQuery<T>(this.tableName, 'update', undefined, data as Record<string, unknown>);
  }

  delete(): MockQuery<T> {
    return new MockQuery<T>(this.tableName, 'delete');
  }

  upsert(data: Partial<T> | Partial<T>[], _options?: { onConflict?: string }): MockQuery<T> {
    return new MockQuery<T>(this.tableName, 'upsert', undefined, data as Record<string, unknown>);
  }

  async single(): Promise<MockQueryResult<T>> {
    const result = await this.getMockData();
    return {
      ...result,
      data: Array.isArray(result.data) && result.data.length > 0 ? result.data[0] as T : null
    };
  }

  async then<TResult1 = MockQueryResult<T[]>, TResult2 = never>(
    onfulfilled?: ((value: MockQueryResult<T[]>) => TResult1 | PromiseLike<TResult1>) | undefined | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | undefined | null
  ): Promise<TResult1 | TResult2> {
    try {
      const result = await this.getMockData();
      const mockResult: MockQueryResult<T[]> = {
        ...result,
        data: result.data as T[]
      };
      return onfulfilled ? onfulfilled(mockResult) : (mockResult as TResult1);
    } catch (error) {
      return onrejected ? onrejected(error) : Promise.reject(error);
    }
  }

  private async getMockData(): Promise<{ data: unknown[]; error: null; status: number; statusText: string; }> {
    // Return mock data based on table name
    switch (this.tableName) {
      case 'lessons':
        return {
          data: [
            {
              id: '1',
              title: 'ビットコインとは何か？',
              description: 'ビットコインの基本概念を学びます',
              difficulty: 'beginner',
              estimated_minutes: 15,
              category_id: 'crypto-basics'
            },
            {
              id: '2',
              title: 'ブロックチェーン技術の理解',
              description: 'ブロックチェーンの仕組みを詳しく解説',
              difficulty: 'beginner',
              estimated_minutes: 20,
              category_id: 'crypto-basics'
            }
          ],
          error: null,
          status: 200,
          statusText: 'OK'
        };

      case 'lesson_categories':
        return {
          data: [
            { id: 'crypto-basics', name: '暗号通貨基礎', description: '暗号通貨の基本概念' },
            { id: 'trading', name: 'トレーディング', description: 'トレーディング戦略' },
            { id: 'defi', name: 'DeFi', description: '分散型金融' },
            { id: 'advanced', name: '上級投資', description: '高度な投資戦略' }
          ],
          error: null,
          status: 200,
          statusText: 'OK'
        };

      case 'user_lesson_progress':
        return {
          data: [
            {
              id: '1',
              user_id: 'user_1',
              lesson_id: '1',
              status: 'completed',
              progress_percentage: 100,
              completed_at: new Date().toISOString()
            }
          ],
          error: null,
          status: 200,
          statusText: 'OK'
        };

      case 'market_data':
        return {
          data: [
            {
              id: '1',
              symbol: 'BTC',
              price: 45123.45,
              change_24h: 3.2,
              volume_24h: 28500000000,
              market_cap: 890200000000,
              updated_at: new Date().toISOString()
            },
            {
              id: '2',
              symbol: 'ETH',
              price: 2789.12,
              change_24h: 5.7,
              volume_24h: 15600000000,
              market_cap: 335400000000,
              updated_at: new Date().toISOString()
            }
          ],
          error: null,
          status: 200,
          statusText: 'OK'
        };

      default:
        return {
          data: [],
          error: null,
          status: 200,
          statusText: 'OK'
        };
    }
  }
}

// Export mock client instance with proper typing
export const createClient = (): MockSupabaseClientClass => new MockSupabaseClientClass();
export const createServerClient = (): MockSupabaseClientClass => new MockSupabaseClientClass();

// Export type for compatibility
export type MockSupabaseClient = MockSupabaseClientClass;
export type { MockPostgrestQueryBuilder, SupabaseTable, SupabaseRelation };
