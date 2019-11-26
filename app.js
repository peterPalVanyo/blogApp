//get data out the form, form send to req body and we parse it
const bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  express = require("express"),
  app = express();
//app config
mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb://localhost:27017/blogApp", {
  useNewUrlParser: true
});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
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
      res.render("index", {blogs: blogs});
    }
  });
});
app.post('/blogs', (req, res) => {
    Blog.create(req.body.blog, (err, newBlog) => {
        if(err) {
            res.render('new')
        } else {
            res.redirect('/blogs')
        }
    })
})
app.get('/blogs/new', (req, res) => {
    res.render('new')
})

app.listen(3000, () => {
  console.log("the server is running");
});
