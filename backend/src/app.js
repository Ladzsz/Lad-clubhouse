import dotenv from "dotenv";
dotenv.config();
import { pool } from "./model/pool.js"
import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import { fileURLToPath } from "url";

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "..", "public")));

// Define routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

export default app;