const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 4000;

const readJson = (file) => {
  try {
    return fs.readFileSync(path.join(__dirname, '..', 'public', 'mock', file), 'utf8');
  } catch (e) {
    return null;
  }
};

const server = http.createServer((req, res) => {
  if (req.url === '/employees' || req.url === '/api/employees') {
    const data = readJson('employees.json');
    if (!data) return res.writeHead(404).end('not found');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(data);
  }
  if (req.url === '/fields' || req.url === '/api/fields') {
    const data = readJson('fields.json');
    if (!data) return res.writeHead(404).end('not found');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(data);
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('not found');
});

server.listen(port, () => {
  console.log(`mock server listening on http://localhost:${port}`);
});
