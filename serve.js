'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const ROOT = __dirname;
const PORT = process.env.PORT || 5600;
const MIME = { '.html':'text/html', '.js':'application/javascript', '.css':'text/css', '.json':'application/json', '.png':'image/png' };
http.createServer((req, res) => {
  const fp = path.join(ROOT, req.url === '/' ? '/index.html' : req.url.split('?')[0]);
  const ext = path.extname(fp);
  fs.readFile(fp, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    // nooit cachen tijdens ontwikkelen, zodat je altijd de nieuwste versie ziet
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'text/plain', 'Cache-Control': 'no-store, no-cache, must-revalidate' });
    res.end(data);
  });
}).listen(PORT, () => console.log(`BatterijCheck draait op http://localhost:${PORT}`));
