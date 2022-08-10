const mysql = require('mysql2/promise');
const config = require('../../config');
const db = {
	host: config.dbhost,
	user: config.dbuser,
	password: config.dbpassword,
	database: config.database,
};
const query = async (sql, params) => {
	const conn = await mysql.createConnection(db);
	const [results] = await conn.execute(sql, params);
	return results;
};
module.exports = {
	query,
};
