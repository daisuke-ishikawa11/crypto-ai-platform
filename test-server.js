const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>テストサーバー</title>
        <meta charset="utf-8">
    </head>
    <body>
        <h1>🎉 サーバー接続成功！</h1>
        <p>暗号通貨AIプラットフォームのテストサーバーが正常に動作しています。</p>
        <p>アクセス時刻: ${new Date().toLocaleString('ja-JP')}</p>
        <p>URL: ${req.url}</p>
    </body>
    </html>
  `);
});

const PORT = 3002;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`テストサーバーが http://localhost:${PORT} で起動しました`);
  console.log(`ネットワークアクセス: http://10.255.255.254:${PORT}`);
});

server.on('error', (err) => {
  console.error('サーバーエラー:', err);
});