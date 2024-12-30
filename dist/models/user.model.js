import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
// Define the User schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "student", "instructor", "portfolio"],
        required: true,
        default: "student",
    },
    phoneNumber: {
        type: String,
        default: null,
    },
    portfolioUrl: {
        type: String,
        unique: true,
        sparse: true, // Allow null or undefined, enforce uniqueness when present
    },
    about: {
        type: String,
        maxlength: 500, // Brief introduction
    },
    skills: {
        type: [String],
        default: [],
    },
    portfolio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Portfolio", // Reference to the Portfolio model
    },
    courses: [{ type: mongoose.Types.ObjectId, ref: "Course" }], // Add courses field
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});
// Hash the password before saving the User
userSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }
    catch (error) {
        next(error);
    }
});
// Compare candidate password with hashed password
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};
// Export the User model
export const User = mongoose.model("User", userSchema);
const PortfolioSchema = new Schema({
    username: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    skills: { type: [String], required: true },
    experience: [
        {
            title: { type: String, required: true },
            company: { type: String, required: true },
            location: { type: String, required: true },
            startDate: { type: String, required: true },
            endDate: { type: String },
            description: { type: String, required: true },
        },
    ],
    projects: [
        {
            name: { type: String, required: true },
            description: { type: String, required: true },
            technologies: { type: [String], required: true },
            link: { type: String, required: true },
        },
    ],
    education: [
        {
            institution: { type: String, required: true },
            degree: { type: String, required: true },
            graduationYear: { type: String, required: true },
            major: { type: String, required: true },
        },
    ],
    published: { type: Boolean, default: false },
    portfolioUrl: { type: String },
    bio: { type: String },
    about: { type: String },
    patentsOrPapers: { type: [String] },
    profileLinks: { type: [String] },
});
export default mongoose.model("Portfolio", PortfolioSchema);
