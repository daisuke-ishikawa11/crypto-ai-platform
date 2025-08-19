// 🧪 Unit テスト用の最小セットアップ
import { TextEncoder, TextDecoder } from 'util'

// グローバル準備（必要最小限）
// 一部環境で TextEncoder/Decoder が未定義の場合の補填
;(global as any).TextEncoder = (global as any).TextEncoder || TextEncoder
;(global as any).TextDecoder = (global as any).TextDecoder || (TextDecoder as any)

afterEach(() => {
  jest.clearAllMocks()
})
