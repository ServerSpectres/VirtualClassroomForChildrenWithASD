const express = require('express');
const app = express();

app.use((req, res, next) => {
    if (req.path.endsWith('.br')) {
        res.set('Content-Encoding', 'br');
        if (req.path.endsWith('.js.br')) {
            res.type('application/javascript');
        } else if (req.path.endsWith('.wasm.br')) {
            res.type('application/wasm');
        } else if (req.path.endsWith('.data.br')) {
            res.type('application/octet-stream');
        }
    }
    next();
});

app.use(express.static('./'));

app.listen(8000, () => {
    console.log('Server running at http://localhost:8000');
});