import { Sequelize } from 'sequelize';
import db from '../database/db.js';

const { DataTypes } = Sequelize;

const Article = db.define('posts', {
	title: DataTypes.STRING(200),
	content: DataTypes.TEXT,
	category: DataTypes.STRING(100),
	status: DataTypes.STRING(100),
});
export default Article;
(async () => {
	await db.sync();
})();
