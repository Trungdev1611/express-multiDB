import jwt from "jsonwebtoken"
import UserModel from "../model/User.js"
import { Op } from "sequelize"


export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body
        if (!username || !password || !email) {
            return res.status(400).json({ message: "Your information is not valid" })
        }

        const user = await UserModel.findOne(
            {
                where: {
                    [Op.or]: [
                        { username: username }, { email: email }]
                },
                attributes: ["email", "username", "password"]
            }

        )
        if (user) {
            return res.status(400).json({ message: "Username or email already exists" });
        }
        await UserModel.create({ username, email, password })

        return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await UserModel.findOne({
            where: {
                username
            },
            raw: true
        })
        console.log("user", user)
        if (!user) {
            return res.status(400).json({ message: "user is not exist" })
        }
  
        if (user.password !== password) {
            return res.status(400).json({ message: "password is not correct" })
        }

        const JWT_SECRET = process.env.JWT_SECRET
        const access_token = jwt.sign({ id: user.id, userId: user.id }, JWT_SECRET);
        res.status(200).json({ message: "login sucessfully", token: access_token })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }

}

