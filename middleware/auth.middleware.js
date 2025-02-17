import jwt from 'jsonwebtoken'
export const authMiddleWare = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    const token = authHeader.split(" ")[1]; 

    try {
        console.log("decode", 1111222, token)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decode1", decoded)
        req.user = decoded; 
        next(); // accept the request continues to go
    } catch (error) {
        console.error("JWT Error:", error);
        return res.status(403).json({ message: "Invalid or expired token" });
    }
}