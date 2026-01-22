const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');

const loomad = JSON.parse(fs.readFileSync(path.join(__dirname, 'loomad.json')));

app.get('/', (req, res) => {
    const viimased4 = loomad.slice(-4).reverse();
    res.render('index', { title: 'Avaleht', loomad: viimased4 });
});

app.get('/loomad', (req, res) => {
    res.render('loomad', { title: 'Loomad', loomad });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'Meist' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Kontakt' });
});

app.get('/vana-leht', (req, res) => {
    res.redirect('/');
});

app.use((req, res) => {
    res.status(404).render('404', { title: 'Lehte ei leitud' });
});

app.listen(3000, () => console.log('Server töötab pordil 3000'));
