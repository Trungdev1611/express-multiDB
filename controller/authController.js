import jwt from "jsonwebtoken"
import connection from "../config/db.js"

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body
        if (!username || !password || !email) {
            return res.status(400).json({ message: "Your information is not valid" })
        }

        const checkSql = `SELECT id FROM users WHERE username = ? OR email = ?`;
        const [existingUser] = await connection.execute(checkSql, [username, email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: "Username or email already exists" });
        }

        // Nếu không trùng, tiến hành insert
        const insertSql = `INSERT INTO users (username, password, email) VALUES (?, ?, ?)`;
        await connection.execute(insertSql, [username, password, email]);

        return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }


}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const query = ` select * from users where username = ? limit 1`
        const [rows] = await connection.execute(query, [username]);
        if (!rows) {
            return res.status(400).json({ message: "username is not correct" })
        }
        const data = rows?.[0]
        if (data?.password !== password) {
            return res.status(400).json({ message: "password is not correct" })
        }

        const JWT_SECRET = process.env.JWT_SECRET
        const access_token = jwt.sign({ id: data.id, userId: data.id }, JWT_SECRET, {
            expiresIn: '1h' // Token sẽ hết hạn sau 1 giờ
        } );
        res.status(200).json({ message: "login sucessfully", token: access_token })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }

}

