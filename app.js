// app config

    var express     = require("express"),
        app         = express(),
        mongoose    = require("mongoose"),
        bodyParser  = require("body-parser"),
    methodOverride  = require("method-override");
    
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static("public"));
app.use(methodOverride("_method"));


//Mongoose Config
//mongoose.connect("mongodb://localhost/restfulBlog");
mongoose.connect("mongodb://freespace:yoyoyoyo143@ds163745.mlab.com:63745/restfulblog");

var blogSchema = new mongoose.Schema({
    
                 title : String,
                 image: { type:String, default : " "},
                 body : { type:String, default : " "},
                 created: { type: Date, default : Date.now() }
    
});


var blog = mongoose.model("blog", blogSchema);



//Restful Routes
//index route
app.get("/blogs", function(req,res){
    
    blog.find({}, function(err, allblogs){
        if(err){
            console.log(err);
        }else{
             res.render("index", {allblogs : allblogs}); 
        }
        
    })
    
});

app.get("/", function(req,res){
    res.redirect("/blogs");
});

//New Route

app.get("/new", function(req,res){
    
    res.render("new");
    
});

app.post("/blogs", function(req,res){
   
   blog.create(req.body.blog, function(err, newblog){
       if(err){
           console.log(err);
            res.render("new");
       }else{
          res.redirect("/blogs");
       }
       
   } )
    
    
});

//show one blog

app.get("/blogs/:id", function(req,res){
    
    blog.findById(req.params.id, function(err, foundblog){
        
        if(err){
            console.log(err)
        }
        else{
              res.render("show", {blog: foundblog});
        }
    })
 
});

//Edit route
app.get("/blogs/:id/edit", function(req, res){
   
   blog.findById(req.params.id, function(err, foundblog){
       
       if(err){
          console.log(err); 
       }
       else{
            res.render("edit", {blog : foundblog}) ;
       }
   })
    
});

//Update route
app.put("/blogs/:id", function(req,res){
    
   blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
       
       if(err){
           console.log(err);
       }else{
           
           res.redirect("/blogs/"+ req.params.id);
       }
   })
    
});

//DELETE ROUTE

app.delete("/blogs/:id", function(req,res){
    
   blog.findByIdAndRemove(req.params.id, function(err){
       
       if(err){
           res.redirect("/blogs");
       }
       else{
           res.redirect("/blogs");
       }
       
   }) 
    
});


app.listen(process.env.PORT,process.env.IP, function(){
    console.log("blog server started");
});