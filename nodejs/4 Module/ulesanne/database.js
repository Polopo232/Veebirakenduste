require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

async function getNews() {
    const [rows] = await pool.query('SELECT * FROM news ORDER BY created_at DESC');
    return rows;
}
async function getNewsById(id) {
    const [rows] = await pool.query('SELECT * FROM news WHERE id = ?', [id]);
    return rows[0];
}
async function createNews(title, content) {
    await pool.query('INSERT INTO news (title, content) VALUES (?, ?)', [title, content]);
}
async function updateNews(id, title, content) {
    await pool.query('UPDATE news SET title = ?, content = ? WHERE id = ?', [title, content, id]);
}
async function deleteNews(id) {
    const [result] = await pool.query('DELETE FROM news WHERE id = ?', [id]);
    return result.affectedRows > 0;
}

// --- Новая функция для аутентификации ---
async function getUserByUsername(username) {
    const [rows] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
}

module.exports = { getNews, getNewsById, createNews, updateNews, deleteNews, getUserByUsername };