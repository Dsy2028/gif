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
  )*/

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
    "name": "Systems of Equations and Inequalities",
    "course": "65641442e17b033e4ac90558",
    "topics": [
      "656634fad3172fb0cc9c6a69",
      "659b6b7df4ec653b96a43465",
      "659b6bb7f4ec653b96a43466",
      "659b6bd3f4ec653b96a43467"
    ]
  },
  {
    "name": "Polynomials and Factoring",
    "course": "65641442e17b033e4ac90558",
    "topics": [
      "659b6c16f4ec653b96a43469",
      "659b6c42f4ec653b96a4346a",
      "659b6c5cf4ec653b96a4346b"
    ]
  },
  {
    "name": "Rational Expressions and Equations",
    "course": "65641442e17b033e4ac90558",
    "topics": [
      "659b6c88f4ec653b96a4346c",
      "659b6cb2f4ec653b96a4346d",
      "659b6cd2f4ec653b96a4346e"
    ]
  }

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

db.units.insertMany(data)