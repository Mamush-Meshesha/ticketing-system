import express from "express"
import dbConnect from "./config/db.js"
import cors from "cors"
import dotenv from "dotenv"
import logger from "./utils/logger.js"
dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000

dbConnect()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get("/", (req, res) => {
    logger.info("Home route accessed");
    res.send("Hello World!")
    }
)

app.use((err, req, res, next) => {
    logger.error(`Error: ${err.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  });
  

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
}
)
