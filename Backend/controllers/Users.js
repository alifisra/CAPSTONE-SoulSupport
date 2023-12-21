import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { body, validationResult } from 'express-validator';


export const getUsers   = async(req, res) => {
    try{
        const users = await Users.findAll({
            // attributes:['id', 'name','email']
        });
        
        res.json(users);

    }catch(error){
        console.log(error);
    }

}

const isNameUnique = async (value) => {
    const existingUser = await Users.findOne({ where: { name: value } });
    if (existingUser) {
      return Promise.reject('Nama sudah terdaftar, silahkan pilih nama lain');
    }
    return Promise.resolve();
  };
  
  const isEmailUnique = async (value) => {
    const existingUser = await Users.findOne({ where: { email: value } });
    if (existingUser) {
      return Promise.reject('Email sudah terdaftar, silahkan pilih Email lain');
    }
    return Promise.resolve();
  };
  
  const registerValidationRules = [
    body('name').notEmpty().withMessage('Nama tidak boleh kosong').custom(isNameUnique),
    body('email').isEmail().withMessage('Format email tidak valid').custom(isEmailUnique),
    body('password').isLength({ min: 6 }).withMessage('Panjang password minimal 6 karakter'),
    body('confPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password dan Confirm Password tidak cocok');
      }
      return true;
    }),
  ];

export const Register = async (req, res) => {
    // Jalankan validasi
    await Promise.all(registerValidationRules.map(validation => validation.run(req)));
  
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { name, email, password } = req.body;
  
    try {
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);
  
      await Users.create({
        name: name,
        email: email,
        password: hashPassword,
      });
  
      res.status(200).json({ 
        Success: true,
        msg: 'Register Berhasil' 
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Terjadi kesalahan saat melakukan registrasi' });
    }
  };

export const Login = async(req, res) =>{
    try {
        const user = await Users.findAll({
            where:{
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({msg:"Wrong password"});
        const userId = user[0].id;
        const name = user[0].name;
        const email= user[0].email;
        const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET,{
          expiresIn:'1d',
      });

        const refreshToken = jwt.sign({userId, name, email}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn:'1d',
        });
        await Users.update({refresh_token: refreshToken}, {
            where:{
                id:userId
            }
        });
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24*60*60*1000,
        })
         res.json({
            accessToken,
            success: true,
            msg: 'Berhasil Login',
            user: {
                id: userId,
                name:name,
                email,
                 }
                 
        });
    } catch (error) {
        res.status(404).json({msg:"Email Tidak Ditemukan"});
    }
}

export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Users.findByPk(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      msg: 'Menampilkan Semua User By ID',
      data: user,
    });
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({
      success: false,
      msg: 'Terjadi kesalahan, tunggu beberapa saat',
    });
  }
};

export const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
  
    if (!refreshToken) {
        return res.sendStatus(204);
    }
  
    const user = await Users.findAll({
        where: {
            refresh_token: refreshToken
        }
    });
  
    if (!user[0]) {
        return res.sendStatus(204);
    }
  
    const userId = user[0].id;
  
    await Users.update({ refresh_token: null }, {
        where: {
            id: userId
        }
    });
  
    res.clearCookie('refreshToken');
  
    // Send a JSON response with a success message
    return res.status(200).json({ 
      success: true,
      msg: 'Logout successful' });
  }

export const postArticle = async (req, res) => {
    const { imageURL, title, description, createdBy, content, sourceURL } = req.body;
    const requiredFields = ['imageURL', 'title', 'description', 'createdBy', 'content', 'sourceURL'];
    const missingFields = [];
  
    requiredFields.forEach(field => {
      if (!req.body[field]) {
        missingFields.push(field);
      }
    });
  
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        msg: `Field berikut harus diisi: ${missingFields.join(', ')}`,
      });
    }
  
    try {
      const articleRef = doc(db, 'db-articles', generateUniqueID());
      await setDoc(articleRef, {
        imageURL,
        title,
        description,
        createdBy,
        createdAt: serverTimestamp(),
        content,
        sourceURL,
      });
      res.status(200).json({
        success: true,
        msg: 'Berhasil',
      });
    } catch (error) {
      console.log('Error posting article:', error);
      res.status(500).json({
        success: false,
        msg: 'Terjadi kesalahan, tunggu beberapa saat',
      });
    }
  };
  
  function generateUniqueID() {
    const prefix = 'xdetect-article-';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let uniqueID = '';
  
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      const randomCharacter = characters[randomIndex];
      uniqueID += randomCharacter;
    }
  
    return prefix + uniqueID;
  }
  
  // Handler untuk mendapatkan semua data article
export const getAllArticles = async (req, res) => {
    try {
      const articlesCollection = collection(db, 'db-articles');
      const articlesSnapshot = await getDocs(articlesCollection);
      const articles = [];
  
      articlesSnapshot.forEach((doc) => {
        const articleData = doc.data();
        const createdAt = articleData.createdAt.toDate();
        const formattedCreatedAt = createdAt.toLocaleDateString('en-ID', { timeZone: 'Asia/Jakarta' });
        articles.push({ id: doc.id, ...articleData, createdAt: formattedCreatedAt });
      });
  
      res.status(200).json({
        success: true,
        msg: 'Berhasil',
        data: articles,
      });
    } catch (error) {
      console.log('Error getting articles:', error);
      res.status(500).json({
        success: false,
        msg: 'Terjadi kesalahan, tunggu beberapa saat',
      });
    }
  };
  
export const getArticleByUID = async (req, res) => {
    const { uid } = req.params;
  
    try {
      const articleDoc = doc(db, 'db-articles', uid);
      const docSnap = await getDoc(articleDoc);
  
      if (docSnap.exists()) {
        const articleData = docSnap.data();
        const createdAt = articleData.createdAt.toDate();
        const formattedCreatedAt = createdAt.toLocaleDateString('en-ID', { timeZone: 'Asia/Jakarta' });
        
        res.status(200).json({
          success: true,
          msg: 'Berhasil',
          data: {
            ...articleData,
            createdAt: formattedCreatedAt
          },
        });
      } else {
        res.status(404).json({
          success: false,
          msg: 'Artikel tidak ditemukan',
        });
      }
    } catch (error) {
      console.log('Error getting article:', error);
      res.status(500).json({
        success: false,
        msg: 'Terjadi kesalahan, tunggu beberapa saat',
      });
    }
  };

 