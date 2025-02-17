import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import express from 'express'
import  connection from './config/db.js'
import { execSync } from 'child_process';

const currentBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

//configuration
dotenv.config()
const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))  //in the above version, we don't need to use body parser because this library was integrated in express

const PORT = process.env.PORT || 6666

//
export const DATABASES = {
  mysql: "MySQL",
  sequelize: "Sequelize",
  mongo: "MongoDB"
};
const TYPE_DATABASE = DATABASES[currentBranch] || '--not defined--';

app.get("/users", (req, res) => {
    connection.query("SELECT * FROM users", (error, results) => {
      if (error) {
        console.log("error", error)
        return res.status(500).send(error);
      }
      res.json(results);
    });
  });

  
  
app.listen(PORT, () => console.log(`Server running on port ${PORT} using database: ${TYPE_DATABASE}`));