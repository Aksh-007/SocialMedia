import mongoose from "mongoose"
import dotenv from "dotenv"

const dbConnection = async () => {
    mongoose
        .connect(process.env.MONGO_URI)
        .then((conn) => {
            console.log(`App is conncted to ${conn.connection.host}`)
        })
        .catch((err) => {
            console.log(err)
            process.exit(1)
        })
}

export default dbConnection;