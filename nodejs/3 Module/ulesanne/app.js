const express = require('express');
const { body, validationResult } = require('express-validator');
const app = express();
const { getNews, getNewsById, createNews, updateNews, deleteNews } = require('./database');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    const news = await getNews();
    res.render('index', {
        title: 'Avaleht',
        news,
        msg: req.query.msg || null
    });
});

app.get('/news/create', (req, res) => {
    res.render('news_create', { title: 'Lisa uudis', errors: [], values: {} });
});

app.post(
    '/news/create',
    body('title').trim().notEmpty().withMessage('Pealkiri on kohustuslik'),
    body('content').trim().notEmpty().withMessage('Sisu on kohustuslik'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('news_create', {
                title: 'Lisa uudis',
                errors: errors.array(),
                values: req.body
            });
        }
        await createNews(req.body.title, req.body.content);
        res.redirect('/?msg=created');
    }
);


app.get('/news/:id', async (req, res) => {
    const news = await getNewsById(req.params.id);
    if (!news) return res.status(404).render('404', { title: 'Uudist ei leitud' });
    res.render('news', { title: news.title, news });
});


app.get('/news/:id/edit', async (req, res) => {
    const news = await getNewsById(req.params.id);
    if (!news) return res.status(404).render('404', { title: 'Uudist ei leitud' });
    res.render('edit', { title: 'Muuda uudist', news, errors: [], values: news });
});

app.post(
    '/news/:id/edit',
    body('title').trim().notEmpty().withMessage('Pealkiri on kohustuslik'),
    body('content').trim().notEmpty().withMessage('Sisu on kohustuslik'),
    async (req, res) => {
        const errors = validationResult(req);
        const id = req.params.id;
        if (!errors.isEmpty()) {
            return res.render('edit', {
                title: 'Muuda uudist',
                news: { id },
                errors: errors.array(),
                values: req.body
            });
        }
        await updateNews(id, req.body.title, req.body.content);
        res.redirect(`/news/${id}?msg=updated`);
    }
);

app.post('/news/:id/delete', async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteNews(id);
    if (deleted) res.redirect('/?msg=deleted');
    else res.redirect('/?msg=delete_failed');
});

app.use((req, res) => {
    res.status(404).render('404', { title: 'Lehekülge ei leitud' });
});

app.listen(3000, () => console.log('Server töötab pordil 3000'));
