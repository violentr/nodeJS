import app from './server.js';
import mongodb from 'mongodb';
import dotenv from 'dotenv';
import MoviesDAO  from "./dao/moviesDAO.js";



async function main (){
    dotenv.config();
    const client = await mongodb.MongoClient.connect(process.env.MOVIEREVIEWS_DB_URI);
    const port = process.env.PORT || 8000;
   try{
       await client.connect();
       await MoviesDAO.injectDB(client);

       app.listen(port, () => {
           console.log(`Server is running on port ${port}`);
       })
   }catch(error) {
       console.error(error);
       process.exit(1);
   }
}

main().catch(console.error);