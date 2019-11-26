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
    created: {type: Date, default: Date.now}
})
const Blog = mongoose.model('Blog', blogSchema)
//routes


app.listen(3000, () => {
  console.log("the server is running");
});
