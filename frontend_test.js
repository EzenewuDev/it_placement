// This creates a temporary backend mock just to see if the frontend reaches it
const http = require('http');
const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') { res.writeHead(200); return res.end(); }
  
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    console.log("REQUEST TO MOCK:", req.url, body);
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: "MOCK ERROR" }));
  });
});
server.listen(5001, () => console.log('Mock listening on 5001'));
