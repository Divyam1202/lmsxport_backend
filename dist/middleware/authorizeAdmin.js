export const authorizeAdmin = (req, res, next) => {
    const userRole = req.user?.role;
    if (userRole !== "admin") {
        return res.status(403).json({ success: false, message: "Admin access required" });
    }
    next();
};
