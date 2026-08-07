import express from 'express';
import path from 'node:path';
import { dummyData } from './db.js';

const app = express();

app.use(express.json());
// app.use(express.static('public'));
app.use(express.static(path.resolve('./public')))

app.get('/health', (req, res) => {
    return res.json({ healthy: true, message: 'Server is healthy' })
})

app.get('/checkboxes', (req, res) => {
    return res.json({ data: dummyData })
})



export default app