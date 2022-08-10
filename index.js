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
		res.json(await articles.listArticles(limit, offset));
	} catch (err) {
		console.log(err);
	}
});
app.get('/article/:id', async (req, res) => {
	const id = req.params.id;
	try {
		res.json(await articles.getArticle(id));
	} catch (err) {
		console.log(err);
	}
});
app.patch('/article/:id', async (req, res) => {
	const id = req.params.id;
	try {
		res.json(await articles.updateArticle(id, req.body));
	} catch (err) {
		console.log(err);
	}
});
app.delete('/article/:id', async (req, res) => {
	const id = req.params.id;
	try {
		res.json(await articles.deleteArticle(id, req.body));
	} catch (err) {
		console.log(err);
	}
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
