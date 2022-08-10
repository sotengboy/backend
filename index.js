const express = require('express');
const app = express();
const port = 9090;

app.get('/', (req, res) => {
	res.send('<p>Homepage</p>');
});

app.post('/article', (req, res) => {
	res.send('<p>Article</p>');
});
app.get('/article/:limit/:offset', (req, res) => {
	res.send(
		`<p>Article Limit</p><p>Limit: ${req.params.limit}</p><p>Offset: ${req.params.offset}</p>`
	);
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
