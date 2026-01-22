const express = require('express');
const app = express();

const { getNews, getNewsById, createNews, updateNews, deleteNews } = require('./database');
const { body, validationResult } = require('express-validator');

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    const news = await getNews();

    res.render('index', {
        title: '- Avaleht - Node.js veebirakendus',
        news: news,
        msg: req.query.msg || null
    });
});

//Add
app.get('/news/create', (req, res) => {
    res.render('news_create', {
        errors: [],
        values: {}
    });
});

app.post(
    '/news/create',
    body('title').trim().notEmpty().withMessage('Pealkiri on kohustuslik'),
    body('content').trim().notEmpty().withMessage('Sisu on kohustuslik'),
    async (req, res) => {
        const id = req.params.id;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render('edit', {
                news: { id },
                title: 'Muuda uudist',
                errors: errors.array(),
                values: req.body
            });
        }

        const { title, content } = req.body;
        await createNews(title, content);
        res.redirect(`/news/${id}`);
    }
);

app.get('/news/create', (req, res) => {
    res.render('news_create', { errors: [], values: {} });
});


//Edit
app.get('/news/:id/edit', async (req, res) => {
    const id = req.params.id;
    const news = await getNewsById(id);
    if (!news) {
        return res.status(404).render('404', { title: 'Uudist ei leitud' });
    }
    res.render('edit', {
        news,
        title: 'Muuda uudist',
        errors: [],
        values: news
    });
});

app.post('/news/:id/edit', async (req, res) => {
    const id = req.params.id;
    const { title, content } = req.body;
    await updateNews(id, title, content);
    res.redirect(`/news/${id}`);
});

app.get('/news/:id', async (req, res) => {
    const news = await getNewsById(req.params.id);
    if (!news) {
        return res.status(404).render('404', { title: 'Uudist ei leitud' });
    }
    res.render('news', { title: news.title, news });
});

//Delete
app.post('/news/delete', async (req, res) => {
    const { id } = req.body;
    const deleted = await deleteNews(id);

    if (deleted) {
        res.redirect('/?msg=deleted');
    } else {
        res.redirect('/?msg=delete_failed');
    }
});

app.use((req, res) => {
    res.status(404).render('404', { title: 'Lehekülge ei leitud' });
});

app.listen(3000, () => console.log('Server töötab pordil 3000'));
