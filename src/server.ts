import * as http from 'http';
import fs from 'fs';
import path from 'path';

let todoData: Object;

const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, 'pages', 'index.html');

    if (req.method === 'POST' && req.url === '/add') {
        let data = '';
        req.on('data', (chunk) => {
            data += chunk;
        });

        req.on('end', () => {
            try {
                const jsonData = JSON.parse(data);
                console.log(`Received data: ${jsonData}`);
                todoData = jsonData;
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(todoData));

            } catch (err) {
                console.log("Error parsing JSON");
                res.writeHead(400, {'Content-Type': 'text/plain'});
                res.end('Error parsing JSON');
            }
        });
    } else {
        fs.readFile(filePath, 'utf-8', (err, page) => {
            if (err) {
                console.log(err);
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Server Error!!')
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(page);
            }
        });
    }
});

const port = 6969;
server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
