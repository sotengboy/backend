const express = require('express');
const { check, oneOf, validationResult } = require('express-validator');
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

app.post('/article', [
	check('title')
		.isLength({ min: 20 })
		.withMessage('Title must be at least 20 chars long'),
	check('content')
		.isLength({ min: 200 })
		.withMessage('Content must be at least 200 chars long'),
	check('category')
		.isLength({ min: 3 })
		.withMessage('Category must be at least 3 chars long'),
	check('status')
		.isIn(['publish', 'draft', 'trash'])
		.withMessage(
			'Status can only contain following status: publish, draft, trash'
		),
	async (req, res, next) => {
		try {
			validationResult(req).throw();
			// yay! we're good to start selling our skilled services :)))
			res.json(await articles.createArticle(req.body));
		} catch (err) {
			// Oh noes. This user doesn't have enough skills for this...
			res.status(400).json(err);
		}
	},
]);
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
app.patch('/article/:id', [
	check('title')
		.isLength({ min: 20 })
		.withMessage('Title must be at least 20 chars long'),
	check('content')
		.isLength({ min: 200 })
		.withMessage('Content must be at least 200 chars long'),
	check('category')
		.isLength({ min: 3 })
		.withMessage('Category must be at least 3 chars long'),
	check('status')
		.isIn(['publish', 'draft', 'trash'])
		.withMessage(
			'Status can only contain following status: publish, draft, trash'
		),
	async (req, res, next) => {
		const id = req.params.id;
		try {
			validationResult(req).throw();
			// yay! we're good to start selling our skilled services :)))
			res.json(await articles.updateArticle(id, req.body));
		} catch (err) {
			// Oh noes. This user doesn't have enough skills for this...
			res.status(400).json(err);
		}
	},
]);
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
