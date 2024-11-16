import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/AuthRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const databaseUrl = process.env.DATABASE_URL;


//middleware

app.use(cors({
    origin: [process.env.ORIGIN],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials:true    //to enable cookie
}));

app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/auth",authRoutes)
const server = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});


//db connection

mongoose
  .connect(databaseUrl)
  .then(() => console.log("Database connection established Successfully"))
  .catch((err) => {
    console.log("Something went wrong when connecting to database",err?.message);
  });
