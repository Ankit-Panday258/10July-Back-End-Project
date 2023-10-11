import  {Router } from "express";

const router = Router();
//register
router.post('/register',register);
//login
router.post('/login' , login);
//logout
router.get('/logout' , logout);
//getProfile
router.get('/me' , getProfile);



export default Router;