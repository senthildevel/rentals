const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/febbatchembed')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  // name: String,
  name: {
    type: String,
    required: true
  },
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: authorSchema
}));

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors
  });

  const result = await course.save();
  console.log(result);
}

async function updateAuthor(courseId) {
  const course = await Course.findById(courseId);
  course.authors.name = "John Smith";

  const result = await course.save();

  console.log(result)



  /*const course = await Course.updateOne({ _id: courseId }, {
    $unset: {
      //one or more key value pairs
      'author': ''
    }
  });
  */


}

async function addAuthor(courseId, author) {
  //find  course first
  const course = await Course.findById(courseId);
  //we ca call the push method to add the new object 
  //to the array
  course.authors.push(author)
  //save it to the db
  course.save();
}

async function removeAuthor(courseId, authorId) {

  const course = await Course.findByIdAndUpdate(courseId, {
    $pull: {
      authors: { _id: authorId }
    }
  }, { new: true });

  console.log(course);
}

//removeAuthor('65fc0bd1125d40be54e708eb', '65fc0bd1125d40be54e708ea')

//addAuthor('65fc0bd1125d40be54e708eb', new Author({ name: "Smith" }))


// createCourse('Python Course',
//   new Author({ name: "James" }));

// 65fc0bd1125d40be54e708e9
/*
createCourse('Fullstack Course',
[
  new Author({ name: "James" }),
  new Author({ name: "Williams" }),
  new Author({ name: "JOhn" }),
]
);
*/

updateAuthor('6607b2a9d1dbb346a1bf8243')

