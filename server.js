import {config} from 'dotenv';
config()
import app from'./app.js';

const PORT = process.env.POST|| 5010
app.listen(PORT , ()=>{
    console.log(`App is running at http:localhost:${PORT}`)
})