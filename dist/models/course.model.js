import mongoose from "mongoose";
const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    courseCode: { type: String, required: true },
    capacity: { type: Number, required: true },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    students: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    status: { type: String, required: true, default: "active" },
    modules: [
        {
            title: { type: String, required: true },
            resourceLink: { type: String, required: true },
        },
    ],
    progress: [
        {
            student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            progress: { type: Number, default: 0 }, // Default progress is 0%
            lastPlayedModule: { type: mongoose.Schema.Types.ObjectId, ref: 'Module' }
        },
    ],
});
const Course = mongoose.model("Course", courseSchema);
export default Course;
