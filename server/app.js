import path from 'path';
import express from 'express';

const app = express();
const publicPath = path.join(__dirname, './../public' );

const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.listen(port, () => {
    console.log(`Server up and running on port ${port}`);
});