import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";

import adminRoutes from "./routes/admin.routes.js";
import studentRoutes from "./routes/student.routes.js";
import instructorRoutes from "./routes/instructor.routes.js";
import courseRoutes from "./routes/course.routes.js";
import portfolioRoutes from "./routes/portfolio.routes.js";
// import complaintRoutes from "./routes/complaint.routes.js";

//import { authenticateToken } from "./middleware/auth.middleware.js"; // Import the authenticate middleware
// import viewTeacherCourses from "./routes/course.routes.js";

// Configure dotenv
dotenv.config();

const app = express(); // Fixed express initialization

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/instructor", instructorRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/portfolio", portfolioRoutes);

// app.use("/api/complaints", complaintRoutes);

// ", courseRoutes);
//app.get("/api/course/allinstructorcourses", viewTeacherCourses);
// Database connections
mongoose
  .connect(process.env.MONGODB_URI || "") // Removed outdated options
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Basic error handling middleware
app.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
  }
);

app.put("/api/portfolio", (req, res) => {
  // Process incoming data
  console.log(req.body);
  res.json({ message: "Portfolio saved successfully!" });
});

const PORT = parseInt(process.env.PORT || "5000", 10);
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
