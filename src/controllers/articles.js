const db = require('../database/db');
const helper = require('../helpers');
const config = require('../../config');

const getArticles = async (page = 1, offset = 10) => {
	// const offset = helper.getOffset(page, config.listPerPage);
	console.log('OFFSET', offset);
	const data = await db.query(
		`SELECT DISTINCT title,category,status FROM posts LIMIT ${page} OFFSET ${offset}`
	);
	console.log('GET ARTICLES', data);
	const articles = helper.emptyOrRows(data);
	const meta = { page };
	return { articles, meta };
};
const createArticle = async (article) => {
	console.log('SAVE ARTICLE', article.title);
	const query = await db.query(
		`INSERT INTO posts (title,content,category,status) VALUES ('${article.title}', '${article.content}','${article.category}','${article.status}')`
	);
	let message = 'Error in creating article';

	if (query.affectedRows) {
		message = 'Article created successfully';
	}

	return { message };
};
module.exports = { getArticles, createArticle };
