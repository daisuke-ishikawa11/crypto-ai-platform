// Mock Supabase client for development
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

export class MockSupabaseClient {
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
      // Mock authentication - accept any credentials
      const user = mockUsers.find(u => u.email === credentials.email) || mockUsers[0];
      
      currentSession = {
        access_token: 'mock_access_token',
        refresh_token: 'mock_refresh_token',
        expires_in: 3600,
        user: {
          ...user,
          last_sign_in_at: new Date().toISOString()
        }
      };

      return {
        data: { user: currentSession.user, session: currentSession },
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
      return {
        data: { subscription: {} },
        unsubscribe: () => {}
      };
    }
  };

  from(table: string) {
    return new MockTable(table);
  }
}

class MockTable {
  constructor(private tableName: string) {}

  select(columns?: string) {
    return new MockQuery(this.tableName, 'select', columns);
  }

  insert(data: any) {
    return new MockQuery(this.tableName, 'insert', undefined, data);
  }

  update(data: any) {
    return new MockQuery(this.tableName, 'update', undefined, data);
  }

  delete() {
    return new MockQuery(this.tableName, 'delete');
  }
}

class MockQuery {
  constructor(
    private tableName: string,
    private operation: string,
    private columns?: string,
    private data?: any
  ) {}

  eq(column: string, value: any) {
    return this;
  }

  gt(column: string, value: any) {
    return this;
  }

  lt(column: string, value: any) {
    return this;
  }

  order(column: string, options?: { ascending?: boolean }) {
    return this;
  }

  limit(count: number) {
    return this;
  }

  async single() {
    return this.getMockData();
  }

  async then(callback?: (result: any) => void) {
    const result = await this.getMockData();
    if (callback) {
      return callback(result);
    }
    return result;
  }

  private async getMockData() {
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
          error: null
        };

      case 'lesson_categories':
        return {
          data: [
            { id: 'crypto-basics', name: '暗号通貨基礎', description: '暗号通貨の基本概念' },
            { id: 'trading', name: 'トレーディング', description: 'トレーディング戦略' },
            { id: 'defi', name: 'DeFi', description: '分散型金融' },
            { id: 'advanced', name: '上級投資', description: '高度な投資戦略' }
          ],
          error: null
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
          error: null
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
          error: null
        };

      default:
        return {
          data: [],
          error: null
        };
    }
  }
}

// Export mock client instance
export const createClient = () => new MockSupabaseClient();
export const createServerClient = () => new MockSupabaseClient();