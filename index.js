const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const counterFilePath = path.join(__dirname, 'counters.json');

let counters = {};

if (fs.existsSync(counterFilePath)) {
    const data = fs.readFileSync(counterFilePath);
    counters = JSON.parse(data);
}

const updateCounters = () => {
    fs.writeFileSync(counterFilePath, JSON.stringify(counters, null, 2));
};

// HOMEPAGE
app.get('/', (req, res) => {
    counters['/'] = (counters['/'] || 0) + 1;
    updateCounters();
    
    res.send(`
        <h1>Главная страница</h1>
        <p>Количество просмотров: ${counters['/']}</p>
        <a href="/about">О нас</a>
    `);
});

// ABOUT
app.get('/about', (req, res) => {
    counters['/about'] = (counters['/about'] || 0) + 1;
    updateCounters();
    
    res.send(`
        <h1>О нас</h1>
        <p>Количество просмотров: ${counters['/about']}</p>
        <a href="/">Главная</a>
    `);
});



app.use(express.static('Static'));

app.listen(3000);


