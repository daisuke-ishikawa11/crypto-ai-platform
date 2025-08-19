export interface LoggerLike {
  info: (message: string, meta?: Record<string, unknown>) => void;
  warn: (message: string, meta?: Record<string, unknown>) => void;
  error: (message: string, meta?: Record<string, unknown>) => void;
  debug: (message: string, meta?: Record<string, unknown>) => void;
}

/*
  パッケージ内で使用する軽量ロガー。
  アプリ側で本格的なロガーがある場合は、上位から差し替え可能にすることを想定。
*/
export const logger: LoggerLike = {
  info: (message, meta) => {
    console.info(`[defi] ${message}`, meta ?? {});
  },
  warn: (message, meta) => {
    console.warn(`[defi] ${message}`, meta ?? {});
  },
  error: (message, meta) => {
    console.error(`[defi] ${message}`, meta ?? {});
  },
  debug: (message, meta) => {
    console.debug(`[defi] ${message}`, meta ?? {});
  }
};
