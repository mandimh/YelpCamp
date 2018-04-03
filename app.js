var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

//Campground.create({
//    name: "Granite Hill",
//    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d9df10d159cc11074d9a7996e8aca442&auto=format&fit=crop&w=400&q=60",
//    description: "This is a huge granite hill, no bathrooms. No water. Beautiful granite!"
//}, (err, campground) => {
//    if (err) {
//        console.log(err);
//    } else {
//        console.log("NEWLY CREATED CAMPGROUND");
//        console.log(campground);
//    }
//})

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
});

//INDEX ROUTE - Display all campgrounds
app.get("/campgrounds", function (req, res) {
    // Get all campgrounds from DB
    Campground.find({}, (err, allCampgrounds) => {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {
                campgrounds: allCampgrounds
            });
        }
    })
});

//NEW ROUTE - Displays form to make new campground
app.get("/campgrounds/new", function (req, res) {
    res.render('new.ejs');
});

//CREATE ROUTE - Add new campground to DB
app.post("/campgrounds", function (req, res) {
    // get data from form and add to campgrounds array
    var name = req.body.name
    var image = req.body.image
    var desc = req.body.description
    var newCampground = {
        name: name,
        image: image,
        description: desc
    }
    // Create a new background and save to DB
    Campground.create(newCampground, (err, newlyCreated) => {
        if (err) {
            console.log(err)
        } else {
            // redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    })
});

//SHOW ROUTE - shows more info about ONE campground
app.get("/campgrounds/:id", function (req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id, function (err, foundCampground) {
        if (err) {
            console.log(err)
        } else {
            //render show template with that campground
            res.render("show", {
                campground: foundCampground
            });
        }
    });
})


//Server setup
app.listen(3000, () => console.log("ctrl + C to quit server"));
