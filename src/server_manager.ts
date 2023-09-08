import express, { Request, Response , Application , json} from 'express';
import dotenv from 'dotenv';
import { createServer, Server } from "http";
import { hostname, platform, type } from 'os';
import { ROUTE_BIN_CONVERTER } from './routes/BinaryConverter';
import { ROUTES_COUNTRY } from './routes/Country';
import { DefaultErrorHandler } from './middleware/error-handler.middleware';

export const StartServer = async () => {
    //For env File 
    dotenv.config();

    const app: Application = express();
    const PORT = process.env.PORT || 5050;

    app.use(json());

    app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Express & TypeScript Server');
    });

    app.use("/convert_to_binary", ROUTE_BIN_CONVERTER);

    app.use("/country", ROUTES_COUNTRY)

    app.use(DefaultErrorHandler);

      // Demo endpoint pour retourner des infos du serveur
  app.get('/info', (req, res) => {
    res.json({
      title: "CI/CD Code Samples API",
      host: hostname(),
      platform: platform(),
      type: type()
    });
  })

  // Lancer le serveur
  return new Promise<Server>(
    (resolve) => {
      const server = createServer(app);
      server.listen(PORT, () => {
        console.log(`API Listening on port ${PORT}`)
        resolve(server);
      })     
    }
  );

}
  
  
  export const StopServer = async (server: Server|undefined) => {
    if (!server) { return; }
    return new Promise<void>(
      (resolve, reject) => {
        server.close(
          (err) => {
            if (err) {
              reject(err);            
            } else {
              resolve();
            }
          }
        )
      }
    );  
  }