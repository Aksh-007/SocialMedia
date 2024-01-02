import express from "express";
import dotenv from "dotenv"
import dbConnection from "./config/dbConnection.js"
import cors from "cors";
import morgan from "morgan"
import bodyParser from "body-parser";
// for security
import helmet from "helmet";


const app = express();

dotenv.config()
dbConnection();
const PORT = process.env.PORT
app.get("/", (req, res) => {
    res.send(`<h1>App is Running</h1>`)
})


app.listen(PORT, (req, res) => {
    console.log(`App is listening on http://localhost:${PORT}/`)
})



export default app;



