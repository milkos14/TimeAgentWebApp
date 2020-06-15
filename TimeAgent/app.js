const express 				= require("express"),
    app 					= express(),
    bodyParser 				= require("body-parser"),
    mongoose 				= require("mongoose"),
    flash                   = require("connect-flash"),
	passport 				= require("passport"),
	LocalStrategy 			= require("passport-local"),
	passportLocalMongoose 	= require("passport-local-mongoose"),
	methodOverride			= require("method-override"),
	Task 				= require("./models/task"),
	Comment 				= require("./models/comment"),
	User 					= require("./models/user")
	// seedDB 				= require("./seeds")
	
//requiring routes
const	taskRoutes = require("./routes/tasks"),
	commentRoutes = require("./routes/comments"),
	indexRoutes = require("./routes/index")

mongoose.connect("mongodb://localhost:27017/time_agent", {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
	.then(() => console.log("connected to database..."))
	.catch(err => console.log("Refuse to connect...", err));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//seed the DB
// seedDB();

app.locals.moment = require('moment');

///////////////////////////
//PASSSPORT CONFIGURATION//
///////////////////////////
app.use(require("express-session")({
	secret: "Once again Rusty wins cutest dog!",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
	next();
});

app.use("/",indexRoutes);
app.use("/tasks", taskRoutes);
app.use("/tasks/:id/comments", commentRoutes);


app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});



app.listen(process.env.PORT || 3000, process.env.IP, function(){
   console.log("The TimeAgent server have started!"); 
});

