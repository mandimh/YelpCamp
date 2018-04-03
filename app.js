var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");

var campgrounds = [
    {
        name: "Salmon Creek",
        image: "https://images.unsplash.com/photo-1444124818704-4d89a495bbae?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a128b113cb6090ba5d87ee29fc3a7869&auto=format&fit=crop&w=400&q=60"
    },
    {
        name: "Granite Hill",
        image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d9df10d159cc11074d9a7996e8aca442&auto=format&fit=crop&w=400&q=60"
    },
    {
        name: "Mountain Goats Rest",
        image: "https://images.unsplash.com/photo-1445308394109-4ec2920981b1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1c80f31bb4040015d51db663252fbd30&auto=format&fit=crop&w=753&q=80"
    }, {
        name: "Camp 4",
        image: "https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=45fc8a446ad11a120c543c426382119f&auto=format&fit=crop&w=400&q=60"
    }, {
        name: "Camp 5",
        image: "https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d1c8cc988efddbda8746281871c0c8bf&auto=format&fit=crop&w=400&q=60"
    },
    {
        name: "Camp 6",
        image: "https://images.unsplash.com/photo-1465865523598-a834aac5d3fa?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3c5ad1730ca0862e11d1df3157d99a8f&auto=format&fit=crop&w=400&q=60"
    }
]

app.get("/", function (req, res) {
    res.render("landing")
})

app.get("/campgrounds", function (req, res) {
    res.render("campgrounds", {
        campgrounds: campgrounds
    });
})

app.post("/campgrounds", function (req, res) {
    // get data from form and add to campgrounds array
    var name = req.body.name
    var image = req.body.image
    var newCampground = {
        name: name,
        image: image
    }
    campgrounds.push(newCampground);
    // redirect back to campgrounds page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function (req, res) {
    res.render('new.ejs');
})

app.listen(3000, () => console.log("ctrl + C to quit server"));
