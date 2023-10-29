const mongoose = require("mongoose");
const connectionString = "mongodb://127.0.0.1:27017/nodejs";
mongoose
  .connect(connectionString)
  .then(() => console.log("connected"))
  .catch((err) => console.log("Error: ", err));
//* Defining Schema even tho its not a thing in MongoDB or any NoSQl
//* Its a syntatic sugar in mongoose for more efficiency of coding
const courseShcema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now() },
  isPublished: Boolean,
});
//* Its a class not object so using Pascal namecase
const Course = mongoose.model("Course", courseShcema);

//* Dummy function to create course and push it to DB
async function createCourse() {
  const course = new Course({
    name: "TypeScript",
    author: "Mosh Hamedani",
    tags: ["Web", "Types", "TypeScript", "Frontend"],
    isPublished: true,
  });
  const result = await course.save();
  console.log(result);
}
//*Simple async function to fetch data from DB
async function getCourse() {
  //*don't forget the  await keyword for God's sake 💀

  // const result = await Course.find();

  //? Comparision Operators in mongoose
  /*
   * $eq -equal
   * $ne - not equal
   * $gt - greater than
   * $gte - greater than or equal to
   * $lt - less than
   * $lte - less than or equal to
   * $in - membership in
   * $nin - not in
   */

  //?Logical Operators in mongoose
  //* or([{},{}]) here, [{},{}] are array of  filters if any of these filters are true for an object, it will accept it.
  //* and([{},{}]) just like or() but the object get accepted only if all filters in array are true for an object
  //* without using and(like Course.find({ author: "Mosh", isPublished: true }) ) works the same but its needed in some more complex queries
  // const pattern = /^Mosh/;
  //*Hard-coded variables for Pagination
  const page = 2;
  const pageSize = 10;

  const courses = await Course
    //*Starts with Mosh with case-insensitive
    .find({ author: /^Mosh/i })
    //*Contains price greater than or equal to 10
    // .find({ price: { $gte: 10 } })
    //*Ends with Hamedani $ indicates end of string
    // .find({ author: /Hamdani$/ })
    //*Contains Mosh
    // .find({ author: /.*Mosh*./ })
    //*To skip documents, generally used for Pagination
    // .skip((page - 1) * pageSize)
    //*limit is just like we know it caps the amout of data we fetching [if you remember head(10) and tail(10)]
    .limit(pageSize)
    //*sort name:1 indicates ascending order rouped by name and -1 indicates descending order
    .sort({ name: 1 })
    //*To Count number of document that verifies all conditions
    // .count()
    //*To select and return all documents(objects) that verifies given conditions
    //NOTE: Either use count or select, there is no meaning of selecting both at the same time!
    .select({ name: 1, tags: 1 });
  console.log(courses);
}

getCourse();
