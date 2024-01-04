import express from "express";
import dotenv from "dotenv"
import dbConnection from "./config/dbConnection.js"
import cors from "cors";
import morgan from "morgan"
import bodyParser from "body-parser";
// for security
import helmet from "helmet";
import router from "./routes/main.routes.js"

const app = express();

dotenv.config()
const PORT = process.env.PORT || 5000;
dbConnection();

// middleware
app.use(helmet())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true }))

app.use(morgan('dev'))

// router middleware
app.use("/api/v1/", router)


app.listen(PORT, (req, res) => {
    console.log(`App is listening on http://localhost:${PORT}/api/v1/`)
})



export default app;



