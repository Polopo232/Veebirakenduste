
const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    const uudised = [
        { pealkiri: "Uus veebileht avatud", sisu: "Meie uus veebileht on nüüd avalik ja kasutajatele kättesaadav." },
        { pealkiri: "Lisandus kontaktivorm", sisu: "Kontaktilehele lisati vorm, mille kaudu saab meiega kiiresti ühendust võtta." },
        { pealkiri: "Bootstrap 5 kasutusel", sisu: "Lehe kujundus põhineb Bootstrap 5 raamistikul, mis tagab mobiilisõbraliku vaate." },
        { pealkiri: "Serveripoolne renderdamine", sisu: "Rakendus kasutab EJS vaatemootorit serveripoolseks HTML-i genereerimiseks." },
        { pealkiri: "Õppeprojekt valmimas", sisu: "Projekt on loodud õppematerjalina, et tutvustada Node.js ja Expressi põhitõdesid." }
    ];

    res.render('index', { title: 'Avaleht', uudised });
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
