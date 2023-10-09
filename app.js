import express from'express';
import cors from'cors';
import cookieParser from'cookie-parser';
const app = express();
app.use(express.json());
 
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials:true
}));

app.use(cookieParser());

app.use('/ping', function(req,res){
    res.send('Pong🥰🚩');
});

//routes of 3 modules 

app.all('*' ,(req,res) =>{
    res.status(400).send('oops!! 400 page not found');
})

export default app;