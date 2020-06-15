const express	=	require("express");
const router	=	express.Router({mergeParams: true});
const Task = require("../models/task");
const Comment = require("../models/comment");
const middleware = require("../middleware");
// ======================
// COMMENTS ROUTES		//
//=======================

//comments new
router.get("/new", middleware.isLoggedIn, function(req,res){
	//find task by id
	Task.findById(req.params.id, function(err, task){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {task: task});
		}
	});
});

//Comments Create
router.post("/",middleware.isLoggedIn, function(req, res){
	Task.findById(req.params.id, function(err, task){
		if(err){
			console.log(err);
			res.redirect("/tasks");
		} else {
				Comment.create(req.body.comment, function(err, comment){
					if(err){
                        req.flash("error", "Something went wrong");
						console.log(err);
					} else {
						//add username and id to comment
						comment.author.id = req.user._id;
						comment.author.username = req.user.username;
						//save comment
						comment.save();
						task.comments.push(comment);
						task.save();
                        req.flash("success", "Successfully added comment");
						res.redirect("/tasks/" + task._id);
					}
				});
			}	
	});
});

//Edit Route
router.get("/:comment_id/edit",middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/edit", {task_id: req.params.id, comment: foundComment}); 
        }
    });
    
});

//comment upodate
router.put("/:comment_id/",middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/tasks/" + req.params.id);
        }
    });
});

//comments destroy route
router.delete("/:comment_id",middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted");
            res.redirect("/tasks/" + req.params.id);
        }
    });
});



module.exports = router;