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
app.use(helmet())
app.use(cookieParser())
// app.use(cors())
app.use(cors({
    credentials: true,
    origin: "*",
    // origin: "http://localhost:5173/",
    // methods: ["GET", "PUT", "POST", "DELETE", "PATCH"]
}))
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true }))

app.use(morgan('dev'))

// router middleware
app.use("/api/v1/", router)
app.get("/", (req, res) => {
    res.send(`<h1>App is Running</h1>`)
})

app.listen(PORT, (req, res) => {
    console.log(`App is listening on http://localhost:${PORT}/api/v1/`)
})



export default app;



