import mongoose, { Schema } from "mongoose";
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
const Portfolio = mongoose.models.Portfolio ||
    mongoose.model("Portfolio", PortfolioSchema);
export default Portfolio;
