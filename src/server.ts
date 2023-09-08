import express, { Request, Response , Application , json} from 'express';
import dotenv from 'dotenv';
import { ROUTE_BIN_CONVERTER } from './formula/BinaryConverter';
import { ROUTES_COUNTRY } from './routes/Country';
import { DefaultErrorHandler } from './middleware/error-handler.middleware';

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(json());

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.use("/convert_to_binary", ROUTE_BIN_CONVERTER);

app.use("/country", ROUTES_COUNTRY)

app.use(DefaultErrorHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});