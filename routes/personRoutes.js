const express = require("express");
const router = express.Router();
const Person = require("../model/personSchema");

// Create and save new person
router.post("/newPerson", (req, res) => {
  let newPerson = new Person(req.body);
  newPerson.save((err, msg) => {
    if (err) throw err;
    else res.json({ msg: "new person added" });
  });
});

//Create a list of people
router.post("/newPeople", (req, res) => {
  const arrayOfPeople = req.body;
  Person.create(arrayOfPeople, (err, msg) => {
    if (err) throw err;
    else res.json({ msg: "List added successfully !" });
  });
});

// GET: Find people with a given fname
router.get("/:fname", (req, res) => {
  Person.find({ fname: req.params.fname }, (err, data) => {
    if (err) throw err;
    else res.send(data);
  });
});

// GET: find one person with a certain fav food
router.get("/personByFavFoods/:favFoods", (req, res) => {
  Person.findOne({ favFoods: req.params.favFoods }, (err, data) => {
    if (err) throw err;
    else res.send(data);
  });
});

// GET by Id: Find the only people having a given _id
router.get("/personById/:id", (req, res) => {
  PerformanceResourceTiming.findById({ _id: req.params.id }, (err, data) => {
    if (err) throw err;
    else res.send(data);
  });
});

// UPDATE person by id
router.put("/updatePeople/:id", (req, res) => {
  let updatePerson = { $push: { favFoods: req.body.favFoods } };
  let PersonId = req.params.id;
  Person.findByIdAndUpdate({ _id: PersonId }, updatePerson, (err, data) => {
    if (err) throw err;
    else res.send(data);
  });
});
// Find a persone by Name and update his age.
router.put("/updatePersonByName/:fname", (req, res) => {
  const ageToSet = 20;
  let PersonByName = req.params.fname;
  Person.findOneAndUpdate(
    { fname: PersonByName },
    { age: ageToSet },
    (err, data) => {
      if (err) throw err;
      else res.send(data);
    }
  );
});
// Delete a persob with a given _id
router.delete("/deletePerson/:id", (req, res) => {
  Person.findByIdAndDelete({ _id: req.params.id }, (err, msg) => {
    if (err) throw err;
    else res.json({ msg: "Given Person deleted from the list" });
  });
});

// Delete people having a given name
router.delete("/deletePeople/:fname", (req, res) => {
  Person.deleteMany({ fname: req.params.fname }, (err, msg) => {
    if (err) throw err;
    else res.json({ msg: "People with the given name were deleted" });
  });
});
// search with query helpers for specific search
router.get("/People/:favFoods", (req, res) => {
  Person.find({ favFoods: req.params.favFoods })
    .sort({ fname: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec((err, data) => {
      if (err) throw err;
      else res.send(data);
    });
});
module.exports = router;
