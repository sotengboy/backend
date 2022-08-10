const express = require('express');
const app = express();
const port = 9090;
const articles = require('./src/controllers/articles');

app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.get('/', (req, res) => {
	res.send('<p>Homepage</p>');
});

app.post('/article', async (req, res) => {
	console.log('BODY ARTICLE', req.body);
	try {
		res.json(await articles.createArticle(req.body));
	} catch (err) {
		console.log(err);
	}
});
app.get('/article/:limit/:offset', async (req, res) => {
	const { limit, offset } = req.params;
	try {
		res.json(await articles.getArticles(limit, offset));
	} catch (err) {
		console.log(err);
	}
});
app.get('/article/:id', (req, res) => {
	res.send('<p>Article Detail</p>');
});
app.patch('/article/:id', (req, res) => {
	res.send('<p>Article Simpan</p>');
});
app.delete('/article/:id', (req, res) => {
	res.send('<p>Article</p>');
});
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
