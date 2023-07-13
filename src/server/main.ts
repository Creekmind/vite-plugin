import express from "express";
import http from 'http';
import ViteExpress from "vite-express";

const app = express();

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
  next();
});

app.get("/client.js", (req, res) => {
  const proxy = http.request({
    host: '127.0.0.1',
    port: 3000,
    path: '/src/client/client.ts',
    method: 'GET',
    headers: req.headers
  }, (proxyRes) => {
    proxyRes.on('data', (data) => {
      res.setHeader('content-type', 'application/javascript');
      res.write(data);
      res.end();
    })
  })

  proxy.on('error', console.log)
  proxy.end();
});

ViteExpress.listen(app, 3000, () =>
  console.log("Plugin is listening on port 3000...")
);
