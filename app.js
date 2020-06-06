const express = require('express');
const bodyparser = require('body-parser');
var items = ["watermelon", "apple", "kiwi"];
let workitems = [];

const app = express();


app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({
  extended: true
}));


app.get("/", function(req, res) {
  var options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  var today = new Date();
  var currentday = today.toLocaleDateString("en-US", options);
  res.render("index", {
    listtitle: currentday,
    newListitems: items
  });


});


app.post("/",function (req,res) {
  var item = req.body.newitem;

  if (req.body.list==="work") {
    workitems.push(item);
    res.redirect("/work");
  }else {
    items.push(item);
    res.redirect("/");
  }
});


app.get("/work", function(req, res) {
  res.render("index", {listtitle: "Work List",newListitems: workitems});
});


app.listen(3000, function() {
  console.log("server is running perfectly at port 3000");
});
