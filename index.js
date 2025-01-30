const express = require('express');
const app = express();
const port = 80;

let ipHits = {};

// Middleware untuk mencatat IP pengunjung dan detail request
app.use((req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    ipHits[ip] = (ipHits[ip] || 0) + 1;
    
    console.log(`IP: ${ip}`);
    console.log(`Method: ${req.method}`);
    console.log(`URL: ${req.url}`);
    console.log(`Headers:`, req.headers);
    console.log(`User-Agent: ${req.get('User-Agent')}`);
    console.log(`Host: ${req.get('Host')}`);
    console.log(`-------------------------------------`);
    
    next();
});

// Endpoint untuk melihat daftar IP yang telah mengakses
app.get('/ips', (req, res) => {
    console.log("Endpoint /ips diakses");
    res.json({
        message: "Daftar IP yang telah mengakses:",
        data: ipHits
    });
});

// Jalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
