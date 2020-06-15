Restful routes:

name 	url								verb		desc.
============================================================================================
INDEX	/tasks					       GET			Display a list of all tasks
NEW		/tasks/new				       GET			Displays form to make a new task
CREATE	/tasks					       POST		    Add new tasks
SHOW	/tasks/:id				       GET			Shows info about a task
EDIT    /tasks/:id/edit                GET          Shows an HTML form to edit an existing task.    
UPDATE  /tasks/:id                     PUT          Manipulate database to update Task
DELETE                                 DESTROY

NEW         /tasks/:id/comments/new	       GET          Displays form to make a new comment
CREATE      /tasks/:id/comments		       POST         Add new comments

REGISTER    /register                       GET         Displays form to make a new User
            /register                       POST        Add new users
LOGIN       /login                          GET         Displays form to make a new login
            /login                          POST        Authenticated and if true successfully logs in.
LOGOUT      /logout                         POST        Logs the current logged in user out.



//TO RUN THE CODE 

MAKE SURE MONGODB IS INSTALLED

RUN COMMAND:
"browser_refresh app.js