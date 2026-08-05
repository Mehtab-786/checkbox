import express from 'express';

const app = express();

app.use(express.static('public'));

app.get('/', async (req, res) => {
    res.sendFile('index.html')
})

export default app