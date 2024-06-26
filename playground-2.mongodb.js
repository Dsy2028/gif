/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('bpa-react');

// Run a find command to view items sold on April 4th, 2014.
/*const update = db.topics.updateOne(
    { "_id": ObjectId("656604348bc2ccb633300115") },
    { "$addToSet": { "questions": "656603178bc2ccb633300114" } }
 )
 
const topic = db.getCollection('topics').findOne({
    _id: ObjectId("656604348bc2ccb633300115")
  });

 
  
db.questions.findOne({ "_id": ObjectId("658f71fc7229c6f6b320219d") })


  console.log(topic);*/
 /* const find = db.questions.findOne({ "_id": ObjectId("656603178bc2ccb633300114") })

  const top = db.topics.findOne({ "_id": ObjectId("656604348bc2ccb633300115") })

  db.topics.updateOne(
    { "_id": ObjectId("656604348bc2ccb633300115") },
    {
      $push: {
        "harderQuestions": {
          "_id":ObjectId("656f4e79a2bacccc8796ca41"),"questionText":"Which of the following is a whole number?","options":["-2","1/2","0.75","8"],"correctOption":"8"
        }
      }
    }
  )*/
  /*db.courses.updateOne(
    { "_id": ObjectId("65641442e17b033e4ac90558") },
    { $push: { "units": { "unitName": "New Unit", "topics": ["New Topic"] } } }
  )
  */
  

  /*db.topics.updateOne(
    { "_id": ObjectId("6566139211b29158ae802fa6") },
    {
      $push: {
        questions: {
          $each:[
            {"_id":{"$oid":"6567711c9593c8d2e0dabaf7"},"questionText":"What is 2 + 2?","options":[["2","3","4","5"]],"correctOption":"4","__v":{"$numberInt":"0"}}
          ]
        }
      }
    }
  )
  db.courseheader.updateOne(
    { "_id": ObjectId("659d59e5a3b0fa9e20136cd8") },
    {
      $set: {
        courses: [
          "659d7ef31a42fa5c06a74140",
          "659d7ef31a42fa5c06a74141"
      ]
          
      }
    }
  )*/

  /*db.tests.updateOne(
    { "_id": ObjectId("659d5eb7a3b0fa9e20136cda") },
    {
      $set: {
        units: [
          "659da923e64fbbe736cc79b7",
          "659da923e64fbbe736cc79b8",
          "659da923e64fbbe736cc79b9",
          "659da923e64fbbe736cc79ba",
          "659da923e64fbbe736cc79bb",
          "659da923e64fbbe736cc79bc",
          "659da923e64fbbe736cc79bd"
      ]
          
      }
    }
  )
*/

 /* db.topics.update(
    { "_id": ObjectId("656604348bc2ccb633300115") },
    {
      $set: {
        "quiz": {
          "quizQuestions": [{"$oid": "656603178bc2ccb633300114"},{"$oid": "656f4017a2bacccc8796ca34"},{"$oid": "656f3faea2bacccc8796ca33"},{"$oid": "656f4e79a2bacccc8796ca41"},{"$oid": "656f4ceaa2bacccc8796ca36"}],
        }
      }
    }
  );
  db.topics.update(
    { "_id": ObjectId("656604348bc2ccb633300115") },
    {
      $set: {
        "quiz": {
          "quizQuestions": ["656603178bc2ccb633300114", "656f4017a2bacccc8796ca34", "656f3faea2bacccc8796ca33", "656f4e79a2bacccc8796ca41", "656f4ceaa2bacccc8796ca36"],
        }
      }
    }
  );
/*
  db.lessons.updateOne(
    {
      $set: {
        "topicId": {"$oid": "656604348bc2ccb633300115"},
        "lessons": {
          "intro": {
            "title": "Intro to Real Numbers",
            "link": "/link-to-lesson-1",
            "icon": "fa-play",
            "position": "relative"
          },
          "recap": {
            "title": "Recap",
            "link": "/link-to-lesson-2",
            "icon": "fa-pause",
            "position": "relative",
            "marginLeft": "80px",
            "marginTop": "40px"
          },
          "practice": {
              "title": "Practice Questions",
              "link": "/link-to-lesson-2",
              "icon": "fa-pencil",
              "position": "relative",
              "marginLeft": "140px",
              "marginTop": "40px"
            },
            "practice-2": {
              "title": "Practice Questions 2",
              "link": "/link-to-lesson-2",
              "icon": "fa-pencil",
              "position": "relative",
              "marginLeft": "250px",
              "marginTop": "40px"
            },
          "review": {
            "title": "Review",
            "link": "/link-to-lesson-2",
            "icon": "fa-file",
            "position": "relative",
            "marginLeft": "140px",
            "marginTop": "40px"
          },
          "quiz": {
            "title": "Quiz",
            "link": "/link-to-lesson-2",
            "icon": "fa-trophy",
            "position": "relative",
            "marginLeft": "60px",
            "marginTop": "40px",
            "backgroundColor": "#ffd24d",
            "borderRadius": "25px"
          }
        }
      }
      }
  );
  */
//console.log(find)
//console.log(find)

//db.classes.findOne({ code: 'cD@J^F!AFK5!', teacher: ObjectId('658053a892ead5d8d52e8bfb') });


//db.intro.findOne({ "_id": ObjectId("658f71fc7229c6f6b320219d") })
//db.intro.find();
const data = [
  {
    "name": "Limits and Continuity",
    "course": "659d5eb7a3b0fa9e20136cda",
    "topics": [
  "659d8d7de431b9ef36b015d5",
    "659d8d7de431b9ef36b015d6",
      "659d8d7de431b9ef36b015d7"
    ]
  },
  {
    "name": "Differentiation",
    "course": "659d5eb7a3b0fa9e20136cda",
    "topics": [
  "659d8d7de431b9ef36b015d8",
    "659d8d7de431b9ef36b015d9",
      "659d8d7de431b9ef36b015da"
    ]
  },
  {
    "name": "Integration",
    "course": "659d5eb7a3b0fa9e20136cda",
    "topics": [
  "659d8d7de431b9ef36b015db",
    "659d8d7de431b9ef36b015dc",
      "659d8d7de431b9ef36b015dd"
    ]
  },
  {
    "name": "Multivariable Calculus",
    "course": "659d5eb7a3b0fa9e20136cda",
    "topics": [
  "659d8d7de431b9ef36b015de",
    "659d8d7de431b9ef36b015df",
      "659d8d7de431b9ef36b015e0"
    ]
  },
  {
    "name": "Differential Equations",
    "course": "659d5eb7a3b0fa9e20136cda",
    "topics": [
  "659d8d7de431b9ef36b015e1",
    "659d8d7de431b9ef36b015e2",
      "659d8d7de431b9ef36b015e3"
    ]
  },
  {
    "name": "Sequences and Series",
    "course": "659d5eb7a3b0fa9e20136cda",
    "topics": [
  "659d8d7de431b9ef36b015e4",
    "659d8d7de431b9ef36b015e5",
      "659d8d7de431b9ef36b015e6"
    ]
  },
  {
    "name": "Calculus Applications",
    "course": "659d5eb7a3b0fa9e20136cda",
    "topics": [
  "659d8d7de431b9ef36b015e7",
    "659d8d7de431b9ef36b015e8",
      "659d8d7de431b9ef36b015e9"
    ]
  },

];

/**
 *   {
    "name": "Radicals and Exponents",
    "course": mongoose.Types.ObjectId("65641442e17b033e4ac90558"),
    "topics": [
      mongoose.Types.ObjectId("65662793cd07b38b7263447d"),
      mongoose.Types.ObjectId("656627f5cd07b38b72634480"),
      mongoose.Types.ObjectId("656631decc8f724af2582a88")
    ]
  },
  {
    "name": "Functions",
    "course": mongoose.Types.ObjectId("65641442e17b033e4ac90558"),
    "topics": [
      mongoose.Types.ObjectId("65662793cd07b38b7263447d"),
      mongoose.Types.ObjectId("656627f5cd07b38b72634480"),
      mongoose.Types.ObjectId("656631decc8f724af2582a88")
    ]
  },
  {
    "name": "Quadratic Functions",
    "course": mongoose.Types.ObjectId("65641442e17b033e4ac90558"),
    "topics": [
      mongoose.Types.ObjectId("65662793cd07b38b7263447d"),
      mongoose.Types.ObjectId("656627f5cd07b38b72634480"),
      mongoose.Types.ObjectId("656631decc8f724af2582a88")
    ]
  },
  {
    "name": "Data Analysis and Probability",
    "course": mongoose.Types.ObjectId("65641442e17b033e4ac90558"),
    "topics": [
      mongoose.Types.ObjectId("65662793cd07b38b7263447d"),
      mongoose.Types.ObjectId("656627f5cd07b38b72634480"),
      mongoose.Types.ObjectId("656631decc8f724af2582a88")
    ]
  }
 */
/*db.units.insert(data)
.then(docs => console.log(docs))
.catch(err => console.error(err));*/

//db.units.insertMany(data)
//db.courses.findOne({ "_id": ObjectId("65641442e17b033e4ac90558") })
//db.units.find()
//db.tests.find()

//db.courseheader.find()

db.questions.updateOne(
  { "_id": ObjectId("656771044af3a930d3398e93") },
  {
    $set: {
      options: [
        "2",
        "3",
        "4",
        "5"
    ]
        
    }
  }
)

/**
 *   {
    "name": "Differentiation",
    "course": "659d5eb7a3b0fa9e20136cda",
    "topics": [
      "659d8d7de431b9ef36b015d8",
      "659d8d7de431b9ef36b015d9",
      "659d8d7de431b9ef36b015da"
    ]
  },
 */