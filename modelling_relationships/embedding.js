const mongoose = require("mongoose");
const { isArray } = require("underscore");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    authors: {
      type: [authorSchema],
      //required:true
    },
  })
);

async function createCourse(name, author) {
  const course = new Course({
    name,
    author,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  //* Method 1. find by id, update and then save
  // const course = await Course.findById(courseId);
  // course.author.name = "John smith";
  // course.save();

  //* Method 2. just use update method
  const course = await Course.updateOne(
    { _id: courseId },
    {
      $set: { "author.name": "Micheal" },
      // $ unset:{"author":""} //* unsets the value
    }
  );
  return course;
}

async function addAuthors(courseId, authors) {
  //* find that damn course
  const course = await Course.findById(courseId);
  console.log(Array.isArray(authors));
  if (authors instanceof Array) {
    authors.forEach((author) => {
      course.authors.push(author);
    });
    const res = await course.save();

    console.log(res);
    return;
  }
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.deleteOne({ _id: authorId });
  author.
  course.save();
}

createCourse("Node Course", new Author({ name: "Mosh" }));
addAuthors("6596c3e8defa8d40dca16cdf", [
  new Author({ name: "John wick", bio: "shooter boy", website: "nothing" }),
]).then(() => {
  listCourses();
});
removeAuthor("6596c3e8defa8d40dca16cdf", "6596c4714be0c8eb70c6d60b");
// updateAuthor("659431dfdf944778d7bee8fc");
