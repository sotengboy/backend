import db from '../database/db.js';
import { emptyOrRows } from '../helpers.js';
import Article from '../models/article.js';

export const listArticles = async (limit = 1, offset = 1) => {
	// const off = (offset - 1) * limit;
	const data = await Article.findAll({
		offset: parseInt(offset),
		limit: parseInt(limit),
	});
	const articles = emptyOrRows(data);
	const meta = { limit, offset };
	// console.log('GET ARTICLES', { articles, meta });
	return { articles, meta };
};
export const createArticle = async (article) => {
	// console.log('SAVE ARTICLE', article.title);

	const query = await Article.create({ ...article });
	console.log('QUERY', query);
	let message = 'Error in creating article';
	let status = 'error';

	if (query) {
		message = 'Article created successfully';
		status = 'success';
	}

	return { message, status };
};
export const getArticle = async (id) => {
	const data = await Article.findByPk(id);
	// console.log('GET ARTICLES', data);
	const article = emptyOrRows(data);
	return article;
};
export const updateArticle = async (id, article) => {
	const update = await Article.update({ ...article }, { where: { id: id } });
	// .query(
	// 	`UPDATE posts SET title='${article.title}', content='${article.content}', category='${article.category}', status='${article.status}' WHERE id='${id}'`
	// );
	let message = 'Error in updating article';
	let status = 'error';

	if (update) {
		message = 'Article updated successfully';
		status = 'success';
	}

	return { message, status };
};
export const deleteArticle = async (id) => {
	const query = await Article.destroy({ where: { id: id } });
	let message = 'Error in deleting article';
	let status = 'error';

	if (query) {
		message = 'Article deleted successfully';
		status = 'success';
	}

	return { message, status };
};
