import { StartServer, StopServer } from './server_manager';
import { DB } from './utility/DB';

StartServer().then(
  (server) => {
    
    const shutdown = async () => {
      console.log("Stopping server...");
      await StopServer(server);
      console.log("Closing DB connections...");
      await DB.Close();
      console.log("Ready to quit.");
    }
    

    // For nodemon restarts
    process.once('SIGUSR2', async function () {
      await shutdown();
      process.kill(process.pid, 'SIGUSR2');
    });

    // For app termination
    process.on('SIGINT', async function () {
      await shutdown();
      process.exit(0);
    });

    // For Heroku app termination
    process.on('SIGTERM',  async function () {
      await shutdown();
      process.exit(0);
    });
  }
);
