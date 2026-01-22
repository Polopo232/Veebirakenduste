// database.js
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

async function getNews() {
    const [rows] = await pool.query('SELECT * FROM news');
    return rows;
}

async function getNewsById(id) {
    const [rows] = await pool.query('SELECT * FROM news WHERE id = ?', [id]);
    return rows[0];
}

async function deleteNews(id) {
    const [result] = await pool.query(
        'DELETE FROM news WHERE id = ?',
        [id]
    );

    return result.affectedRows > 0;
}

async function createNews(title, content) {
    return pool.execute('INSERT INTO news (title, content) VALUES (?, ?)',[title, content]);
}

const updateNews = async (id, title, content) => {
    const sql = 'UPDATE news SET title = ?, content = ? WHERE id = ?';
    await pool.execute(sql, [title, content, id]);
};

module.exports = {
    getNews,
    getNewsById,
    deleteNews,
    updateNews,
    createNews
};
