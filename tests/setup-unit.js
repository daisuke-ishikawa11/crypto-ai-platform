// 🧪 Unit テスト用の最小セットアップ (JS)
const { TextEncoder, TextDecoder } = require('util')

if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder
}
if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder
}

// Minimal Response stub for tests running in environments without WHATWG Response
if (typeof global.Response === 'undefined') {
  class ResponseStub {
    constructor(body = '', init = {}) {
      this.status = init.status ?? 200
      this._body = typeof body === 'string' ? body : JSON.stringify(body)
      this.headers = init.headers || {}
    }
    async json() {
      try { return JSON.parse(this._body) } catch { return this._body }
    }
    async text() { return this._body }
    async blob() { return undefined }
  }
  global.Response = ResponseStub
}

afterEach(() => {
  if (typeof jest !== 'undefined') {
    jest.clearAllMocks()
  }
})
