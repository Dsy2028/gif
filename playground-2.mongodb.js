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

 
  
db.questions.findOne({ "_id": ObjectId("656603178bc2ccb633300114") })


  console.log(topic);*/
  const find = db.questions.findOne({ "_id": ObjectId("656603178bc2ccb633300114") })

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
  )
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
        "course": {
          "_id": {"$oid": "65641442e17b033e4ac90558"},
          "courseName": "Algebra 1",
        }
      }
    }
  );*/
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
console.log(find)
//console.log(find)