import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import express from 'express'
import sequelizeConnect from './config/db.js'
import { execSync } from 'child_process';
import { Op, QueryTypes } from 'sequelize';
import UserModel from './model/User.js';

const currentBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

//configuration
dotenv.config()
const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))  //in the above version, we don't need to use body parser because this library was integrated in express

const PORT = process.env.PORT || 6666

//
export const DATABASES = {
  mysql: "MySQL",
  sequelize: "Sequelize",
  mongo: "MongoDB",
  'sequelize-postgres': "PostGres-SQL"
};
const TYPE_DATABASE = DATABASES[currentBranch] || '--not defined--';

app.get("/users", async (req, res) => {
  try {
    const users = await UserModel.findAll({
      where: {
        id: {
          [Op.gt]: 90, // Tương đương với `id > 90`  
        },
      }
    })
    // const users = await sequelizeConnect.query("select * from users where id > 90", {  //raw query
    //   type: QueryTypes.SELECT
    // })
    return res.status(200).json(users)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
});



app.listen(PORT, () => console.log(`Server running on port ${PORT} using database: ${TYPE_DATABASE}`));