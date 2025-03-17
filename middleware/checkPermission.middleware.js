export const ROLES = {
    USER: `users`,
    ADMIN: `admin`,
    SYSTEM_ADMIN: `system-admin`
}

export function checkPermission(...roles) {
    return (req, res, next) => {
    if(!req.user) {
        return res.status(401).json({msg: "UnAuthorization"})
    }
    if(!roles.includes(req.user.role)) {
        return res.status(403).json({msg: "Access Denied"})
    }
    next();
    }
}