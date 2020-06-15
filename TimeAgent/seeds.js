var mongoose = require("mongoose");
var Campground = require("./models/task");
 var Comment   = require("./models/comment");
 
function seedDB(){
   //Remove all tasks
   Campground.remove({}, function(err){
        // if(err){
        //     console.log(err);
        // }
        // console.log("removed tasks!");
        // Comment.remove({}, function(err) {
        //     if(err){
        //         console.log(err);
        //     }
        //     console.log("removed comments!");
        //      //add a few tasks
            // data.forEach(function(seed){
            //     Campground.create(seed, function(err, task){
            //         if(err){
            //             console.log(err)
            //         } else {
            //             console.log("added a task");
            //             //create a comment
            //             Comment.create(
            //                 {
            //                     text: "This place is great, but I wish there was internet",
            //                     author: "Homer"
            //                 }, function(err, comment){
            //                     if(err){
            //                         console.log(err);
            //                     } else {
            //                         task.comments.push(comment);
            //                         task.save();
            //                         console.log("Created new comment");
            //                     }
            //                 });
            //         }
            //     });
        //     });
        // });
   
     });
}
    //add a few comments
module.exports = seedDB;