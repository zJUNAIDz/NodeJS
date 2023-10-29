
const Course = mongoose.model("Course", courseShcema);

const course = new Course({
  name:"NodeJS",
  author:"Mosh"
})
