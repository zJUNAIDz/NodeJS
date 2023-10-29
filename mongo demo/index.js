const mongoose = require("mongoose");
const connectionString = "mongodb://127.0.0.1:27017/nodejs";
mongoose
  .connect(connectionString)
  .then(() => console.log("coonected"))
  .catch((err) => console.log("Error: ", err));

const courseShcema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now() },
  isPublished: Boolean,
});
//* Its a class not object so using Pascal namecase
const Course = mongoose.model("Course", courseShcema);

async function createCourse() {
  const course = new Course({
    name: "JavaScript",
    author: "Mosh",
    tags: ["web", "backend", "frontend"],
    isPublished: true,
  });
  const result = await course.save();
  console.log(result);
}
createCourse();
