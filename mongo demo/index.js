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
    //*All courses
    .find()
    //*Starts with Mosh with case-insensitive
    // .find({ author: /^Mosh/i })
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
    .select({ name: 1, tags: 1, author: 1 });
  console.log(courses);
}
/*
 * Approaches:
 * 1.Query First
 * findById()
 * modify its proerties
 * save()
 *
 * 2.Update First
 * Update directly
 * Optionally: get updated docs as well
 */
//*1. Query First [useful when we need to check few things before updating]
// async function updateCourse(id) {
//   const course = await Course.findById(id);
//   if (!course) {
//     console.log("No such course exist...");
//     return;
//   }
//   //* Setting values individually
//   // course.isPublished = true;
//   // course.author = "John the Don";
//   //* Using set method
//   course.set({
//     isPublished: true,
//     author: "Junaid",
//   });
//   //* Optionally returning result (useful in chaining)
//   const res = await course.save();
//   return res;
// }

//* 2. Useful in case where you are not getting input from user and just want to update database
async function updateCourse(id) {
  //*NOTE: syntax to update first : Course.update(conditional object, object of update operators)
  //NOTE: We dont have to .save() it explicitly, as it saves and returns the result ( of information about update like modified count, etc).
  //*Note: refer https://www.mongodb.com/docs/manual/reference/operator/update/ for more update operators

  //* $set used to set specific query

  //*To update every docs with isPublished:false and returns the result ( not course )
  // const result = await Course.updateMany(
  //   { isPublished: false },
  //   {
  //     $set: {
  //       isPublished: true,
  //     },
  //   }
  // );

  //* To upadate course at particular id and returns the result ( not course )
  //NOTE: If you want to update and get the those updated or original data defined by optional third parameter, we can use findByIdAndUpdate() method instead of just updateMany() or updateOne()
  // const result = await Course.updateMany(
  // { _id: id },
  const result = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "Annonymous",
        isPublished: false,
      },
    },
    { new: true } //* with this, we get updated data instead of original data which are updated.
  );
  console.log(result);
}

//*Delete query
async function deleteCourse(id) {
  //* delete query with specific condition deleteOne or deleteMany
  // const result = await Course.deleteOne({ _id: id });
  //* delete at particular id
  const result = await Course.findByIdAndDelete(id);
  console.log(result);
}

// updateCourse("653e0a777b4b18d1a1898872");
deleteCourse("653e5e83c9907da6fd659cab");

getCourse();
