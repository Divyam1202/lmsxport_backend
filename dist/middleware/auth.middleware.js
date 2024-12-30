import jwt from "jsonwebtoken";
// Middleware to authenticate the JWT token
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
        req.user = {
            _id: decoded.userId,
            role: decoded.role,
        };
        next();
    }
    catch (error) {
        return res.status(403).json({ message: "Invalid token" });
    }
};
// Middleware to authorize specific roles
export const authorizeRoles = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    };
};
// Middleware to authorize based on portfolio ownership
export const authorizePortfolioOwnership = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { userId } = req.params;
        if (req.user._id !== userId && req.user.role !== "admin") {
            return res.status(403).json({ message: "Forbidden: Access denied" });
        }
        next();
    }
    catch (error) {
        console.error("Authorization error:", error);
        res.status(500).json({ message: "Authorization failed" });
    }
};
