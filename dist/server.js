"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
let todoData;
const server = http.createServer((req, res) => {
    const filePath = path_1.default.join(__dirname, 'pages', 'index.html');
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
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(todoData));
            }
            catch (err) {
                console.log("Error parsing JSON");
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Error parsing JSON');
            }
        });
    }
    else {
        fs_1.default.readFile(filePath, 'utf-8', (err, page) => {
            if (err) {
                console.log(err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Server Error!!');
            }
            else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(page);
            }
        });
    }
});
const port = 6969;
server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
