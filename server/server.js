import express from 'express';
import cors from 'cors';
require('dotenv').config();
import initRouter from './src/router'
import connectData from './src/config/connectDatabase';
const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["POST", 'GET', 'PUT', "DELETE"]
}));
// Phân tích request body mà không cần body-parser
app.use(express.urlencoded({ extended: true })); // Thay cho bodyParser.urlencoded
app.use(express.json()); // Thay cho bodyParser.json

// Route mặc định
initRouter(app)
connectData()
// Cấu hình port
const port = process.env.PORT || 8888;
const server = app.listen(port, () => {
    console.log(`Server is running on port ${server.address().port}`);
});
