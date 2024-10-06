import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import cors from 'cors';
import { AppDataSource } from './config/data-source';


const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(bodyParser.json());
app.use('/', routes);

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected");
    })
    .catch((error) => console.log(error));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
});

app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
})