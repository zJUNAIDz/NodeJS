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
  // const result = await Course.find();
  //*sort name:1 indicates ascending order rouped by name and -1 indicates descending order
  //*limit is just like we know it caps the amout of data we fetching [if you remember head(10) and tail(10)]
  //*selact to select particular properties to show up
  //*don't forget the  await keyword for God's sake 💀

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
  const pattern = "^Mosh";
  const result = await Course.find({ author: /^Mosh/i, isPublished: true })
    // .find({ price: { $gte: 10 } })
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(result);
}

getCourse();
