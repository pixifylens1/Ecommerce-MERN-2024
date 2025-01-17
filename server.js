import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectdb from './config/db.js';
import authRoutes from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoute.js'
import cors from 'cors';
//configure env
dotenv.config();

//Database Config
connectdb();

//rest object
const app = express();

//middleware
app.use(express.json());
app.use(morgan('dev'))
app.use(cors())

//routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/category', categoryRoutes)

//rest api
app.get('/', (req, res) => {
    res.send(
        "<h1>Ecommerce application</h1>"
    );
});

//PORT
const PORT = process.env.PORT;

//run listen
app.listen(PORT, () => {
    console.log(`Server is Running on ${process.env.DEV_MODE} mode at ${PORT}`)
})
