const mongoose = require("mongoose");
const personSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: String,
  email: { type: String, required: true },
  password: { type: String, required: true, default: "1234567" },
  age: Number,
  date: { type: Date, default: Date.now },
  favFoods: [
    {
      type: String,
    },
  ],
});

const Person = mongoose.model("people", personSchema);
module.exports = Person;
