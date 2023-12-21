// index.js

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { authenticate } from "./config/Database.js"; // Use named import for authenticate
import router from "./routes/index.js";
dotenv.config()
const app = express();

try {
    await authenticate();
    console.log('Database Connected....'); 
} catch (error) {
    console.error(error);
}
app.use(express.urlencoded({ extended: true }));

// app.use(cors({Credential:true, origin:"http://localhost:4000"}));
app.use(cookieParser());
app.use(express.json());
app.use(router); 

app.listen(5000, () => console.log('Server running at port 3000'));