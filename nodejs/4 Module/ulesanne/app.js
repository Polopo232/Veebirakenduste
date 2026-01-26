const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const app = express();

const {
    getNews, getNewsById, createNews, updateNews, deleteNews, getUserByUsername
} = require('./database');
const { requireLogin, bypassLogin } = require('./middleware');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(session({
    secret: process.env.SESSION_SECRET || 'secret_key_123',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 } // 1 час
}));

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});


app.get('/login', bypassLogin, (req, res) => {
    res.render('login', { title: 'Logi sisse', msg: req.query.msg === 'login_failed' ? 'Vale kasutajanimi või parool' : null, errors: [] });
});

app.post('/login',
    body('username').trim().notEmpty().withMessage('Kasutajanimi on kohustuslik'),
    body('password').trim().notEmpty().withMessage('Parool on kohustuslik'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('login', { title: 'Logi sisse', msg: 'Väljad on kohustuslikud', errors: errors.array() });
        }

        const { username, password } = req.body;
        try {
            const user = await getUserByUsername(username);
            if (!user) return res.render('login', { title: 'Logi sisse', msg: 'Vale kasutajanimi või parool', errors: [] });

            const match = await bcrypt.compare(password, user.password);
            if (!match) return res.render('login', { title: 'Logi sisse', msg: 'Vale kasutajanimi või parool', errors: [] });

            req.session.user = { id: user.id, username: user.username, role: user.role };
            res.redirect('/?msg=login_success');
        } catch (error) {
            res.render('login', { title: 'Logi sisse', msg: 'Sisselogimisel tekkis viga', errors: [] });
        }
    }
);

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.redirect('/');
});

app.get('/', async (req, res) => {
    const news = await getNews();
    res.render('index', { title: 'Avaleht', news, msg: req.query.msg || null });
});

app.get('/news/create', requireLogin, (req, res) => {
    res.render('news_create', { title: 'Lisa uudis', errors: [], values: {} });
});

app.post('/news/create', requireLogin,
    body('title').trim().notEmpty().withMessage('Pealkiri on kohustuslik'),
    body('content').trim().notEmpty().withMessage('Sisu on kohustuslik'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.render('news_create', { title: 'Lisa uudis', errors: errors.array(), values: req.body });

        await createNews(req.body.title, req.body.content);
        res.redirect('/?msg=created');
    }
);

app.get('/news/:id/edit', requireLogin, async (req, res) => {
    const news = await getNewsById(req.params.id);
    if (!news) return res.status(404).render('404', { title: 'Uudist ei leitud' });
    res.render('edit', { title: 'Muuda uudist', news, errors: [], values: news });
});

app.post('/news/:id/edit', requireLogin,
    body('title').trim().notEmpty().withMessage('Pealkiri on kohustuslik'),
    body('content').trim().notEmpty().withMessage('Sisu on kohustuslik'),
    async (req, res) => {
        const id = req.params.id;
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.render('edit', { title: 'Muuda uudist', news: { id }, errors: errors.array(), values: req.body });

        await updateNews(id, req.body.title, req.body.content);
        res.redirect(`/news/${id}?msg=updated`);
    }
);

app.post('/news/:id/delete', requireLogin, async (req, res) => {
    await deleteNews(req.params.id);
    res.redirect('/?msg=deleted');
});

app.get('/news/:id', async (req, res) => {
    const news = await getNewsById(req.params.id);
    if (!news) return res.status(404).render('404', { title: 'Uudist ei leitud' });
    res.render('news', { title: news.title, news });
});

app.listen(3000, () => console.log('Server töötab pordil 3000'));