const { ObjectId } = require("bson");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongoose")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const Author = mongoose.model(
  "Author",
  new mongoose.Schema({
    name: String,
    bio: String,
    website: String,
  })
);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },
  })
);

async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website,
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name,
    author,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  //* Populate given property   if it contains reference to other collenction and id of an object
  //* params ('collection' ||collection[], 'select names of feilds')
  const courses = await Course.find().populate("author", "name").select("name");
  console.log(courses);
}

// createAuthor("Mosh", "My bio", "My Website");

// createCourse("Node Course", "6592f98b9f87186fcfd5cd84");

listCourses();
