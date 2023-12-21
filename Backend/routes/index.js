import express from "express";
import { getUsers, Register, Login, Logout, getUserById} from "../controllers/Users.js"
import { getAllArticles, getArticleByUID, postArticle } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";




const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.post('/register', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
router.get('/user/:id',verifyToken, getUserById);



// Routes for article
router.post('/article', postArticle)
router.get('/article', getAllArticles)
router.get('/article/:uid', getArticleByUID)


//Routes for uploadFotoProfile


export default router;
