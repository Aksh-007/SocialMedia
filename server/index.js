import express from "express";
import dotenv from "dotenv"
import dbConnection from "./config/dbConnection.js"
import cors from "cors";
import morgan from "morgan"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
// for security
import helmet from "helmet";
import router from "./routes/main.routes.js"

const app = express();

dotenv.config()
const PORT = process.env.PORT || 5000;
dbConnection();

// middleware
const allowedOrigins = ['http://localhost:5173', 'https://link-leap.vercel.app'];

app.use(cors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}));
app.use(helmet())
app.use(cookieParser())
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true }))

app.use(morgan('dev'))

// router middleware
app.use("/api/v1/", router)
app.get("/api/v1/", (req, res) => {
    res.send(`<h1>App is Running</h1>`)
})

app.listen(PORT, (req, res) => {
    console.log(`App is listening on http://localhost:${PORT}/api/v1/`)
})



export default app;



