const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/mongo-exercises")
  .then(() => console.log("Connected..."))
  .catch((err) => console.log("Something's wrong", err));

//* Schema of our data
const courseSchema = mongoose.Schema({
  name: String,
  date: { type: Date, default: Date.now() },
  author: String,
  category: {
    //* SchemaType on String
    type: String,
    required: true,
    enum: ["web", "mobile", "desktop"],
    lowercase: true,
    //uppercase:true,
    trim: true,
  },
  //* Custom validation
  // tags: [String],
  //* Synchronous validation
  // tags: {
  //   type: Array,
  //   validate: {
  //     validator: function (v) {
  //       return v && v.length > 0;
  //     },
  //     message: "Tag is required!",
  //   },
  // },
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function (v) {
        setTimeout(() => {
          //* Do some async works
          const result = v && v.length > 0;
          // callback(result);
        }, 2000);
      },
      message: "The course should have at least one tag",
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 0,
    max: 1000,
    get: (v) => Math.round(v), //* rounds off while GET data from DB
    set: (v) => Math.round(v), //* rounds off while POST/add/modify data to DB
  },
});

//* Making Course class
const Course = mongoose.model("Course", courseSchema);

//*Making course object as an instance
const courseObject = {
  name: "Python",
  author: "Junaid Shaikh",
  category: "web",
  tags: ["Backend"],
  isPublished: true,
  price: 50.9,
};
//* To push document to DB
async function createCourse(courseObject) {
  const course = new Course(courseObject);

  try {
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    for (const err in ex.errors) {
      console.log(err.message);
    }
    // console.log("fail hogaya bhay ");
  }

  // console.log(result);
}

createCourse(courseObject);

async function getCourses() {
  return await Course
    //*Title containing by and price >= 15
    .find()
    .or([{ name: /.*by*./ }, { price: { $gte: 10 } }])
    //*either frontend or backend
    // .find({ tags: { $in: ["frontend", "backend"] } })
    //* Instead of $in operator, we can use or() too
    // .or([{ tags: "frontend" }, { tags: "backend" }])
    //* Sort by price in descending order
    // .sort({ price: -1 })
    //* more syntatic sugar
    .sort("-price")
    //* to select name author price and tags only
    // .select({ name: 1, author: 1, price: 1, tags: 1 });
    //*More syntatic sugar
    .select("name author price tags");
  // return await Course.find({ author: /^Junaid/i })
  //   .sort({ name: 1 })
  //   .select({ name: 1, author: 1 });
}

//* Update
async function updateCourse(id) {
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

  //*1.
  const course = await Course.findById(id);
  if (!course) {
    console.log("No such course exist...");
    return;
  }
  //* Setting values individually
  // course.isPublished = true;
  // course.author = "John the Don";
  //* Using set method
  course.set({
    isPublished: true,
    author: "Junaid",
  });
  course.save();
}

// createCourse(courseObject);
async function display() {
  const course = await getCourses();
  console.log(course);
}
// updateCourse("653e99a020d5c99192230301");
// display();
