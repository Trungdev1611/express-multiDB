import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import express from 'express'


//configuration
dotenv.config()
const app = express()

app.use(express.json())

const PORT = process.env.PORT || 6666
