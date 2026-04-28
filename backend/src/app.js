import dotenv from "dotenv";
dotenv.config();
import { pool } from "./model/pool.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import { fileURLToPath } from "url";
import passport from 'passport';
import session from 'express-session';
import initializePassport from "./config/passport.js";

// initializing passport and setting express app
initializePassport(passport);
const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "..", "public")));

// Initialize Passport
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));
app.use(passport.initialize());
app.use(passport.session());

// Define routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

export default app;
