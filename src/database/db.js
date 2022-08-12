import { Sequelize } from 'sequelize';
import config from '../../config.js';

const db = new Sequelize(config.database, config.dbuser, config.dbpassword, {
	host: config.dbhost,
	dialect: 'mysql',
});

export default db;
