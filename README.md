#### Backend

### Installasi

- Buat database di mysql
- Edit kredensial database di config.js
- Clone repository
- Buka directory menggunakan terminal lalu lakukan perintah `npm install` atau `yarn`
- Untuk menjalankan development server menggunakan `npm run dev`
- Table `posts` akan otomatis terbuat jika belum ada.

### API

Server API `http:localhost:9090`
Endpoint:
`POST /article` untuk membuat article
`GET /article/:limit/:offset` untuk mengambil data semua article berdasarkan limit
`PATCH /article/:id` untuk mengupdate article
`DELETE /article/:id` untuk menghapus article
