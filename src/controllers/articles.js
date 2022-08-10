const db = require('../database/db');
const helper = require('../helpers');
const config = require('../../config');

const listArticles = async (page = 1, offset = 10) => {
	const data = await db.query(
		`SELECT DISTINCT title,category,status FROM posts LIMIT ${page} OFFSET ${offset}`
	);
	// console.log('GET ARTICLES', data);
	const articles = helper.emptyOrRows(data);
	const meta = { page };
	return { articles, meta };
};
const createArticle = async (article) => {
	// console.log('SAVE ARTICLE', article.title);
	const query = await db.query(
		`INSERT INTO posts (title,content,category,status) VALUES ('${article.title}', '${article.content}','${article.category}','${article.status}')`
	);
	let message = 'Error in creating article';
	let status = 'error';

	if (query.affectedRows) {
		message = 'Article created successfully';
		status = 'success';
	}

	return { message, status };
};
const getArticle = async (id) => {
	const data = await db.query(
		`SELECT DISTINCT title,category,status FROM posts WHERE id='${id}'`
	);
	// console.log('GET ARTICLES', data);
	const article = helper.emptyOrRows(data);
	return article[0];
};
const updateArticle = async (id, article) => {
	const update = await db.query(
		`UPDATE posts SET title='${article.title}', content='${article.content}', category='${article.category}', status='${article.status}' WHERE id='${id}'`
	);
	let message = 'Error in updating article';
	let status = 'error';

	if (update.affectedRows) {
		message = 'Article updated successfully';
		status = 'success';
	}

	return { message, status };
};
const deleteArticle = async (id) => {
	const query = await db.query(`DELETE FROM posts WHERE id='${id}'`);
	let message = 'Error in deleting article';
	let status = 'error';

	if (query.affectedRows) {
		message = 'Article deleted successfully';
		status = 'success';
	}

	return { message, status };
};
module.exports = {
	listArticles,
	createArticle,
	getArticle,
	updateArticle,
	deleteArticle,
};
