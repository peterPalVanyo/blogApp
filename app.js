//get data out the form, form send to req body and we parse it
const bodyParser = require("body-parser"),
  methodOverride = require("method-override"),
  mongoose = require("mongoose"),
  express = require("express"),
  app = express();
//app config
mongoose.set("useUnifiedTopology", true);
/* for findAndUpdate method to work properly */
mongoose.set("useFindAndModify", false);
mongoose.connect("mongodb://localhost:27017/blogApp", {
  useNewUrlParser: true
});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
//model
const blogSchema = mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now }
});
const Blog = mongoose.model("Blog", blogSchema);
//create a blog, one time
/* Blog.create({
    title: 'test01', 
    image: 'https://cdn.pixabay.com/photo/2019/11/15/05/23/dog-4627679__340.png', 
    body: 'sagdangop asdgagnaspow dwnoeg pfnlekqgnew pondisaggnd adsf'
}) */
//routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});
app.get("/blogs", (req, res) => {
  Blog.find({}, (err, blogs) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { blogs: blogs });
    }
  });
});
app.post("/blogs", (req, res) => {
  Blog.create(req.body.blog, (err, newBlog) => {
    if (err) {
      res.render("new");
    } else {
      res.redirect("/blogs");
    }
  });
});
app.get("/blogs/new", (req, res) => {
  res.render("new");
});
app.get("/blogs/:id", (req, res) => {
  Blog.findById(req.params.id, (err, foundBlog) => {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.render("show", { blog: foundBlog });
    }
  });
});
app.get("/blogs/:id/edit", (req, res) => {
  Blog.findById(req.params.id, (err, foundBlog) => {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.render("edit", { blog: foundBlog });
    }
  });
});
app.put("/blogs/:id", (req, res) => {
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.redirect(`/blogs/${req.params.id}`);
    }
  });
});
app.delete("/blogs/:id", (req, res) => {
  Blog.findByIdAndRemove(req.params.id, err => {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.redirect("/blogs");
    }
  });
});

app.listen(3000, () => {
  console.log("the server is running");
});
