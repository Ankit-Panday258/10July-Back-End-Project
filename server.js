import {config} from 'dotenv';
config()
import app from'./app.js';
import connectionToDB from './config/dbConnection.js';

const PORT = process.env.POST|| 5010
app.listen(PORT ,async ()=>{
    await connectionToDB();
    console.log(`App is running at http:localhost:${PORT}`)
})