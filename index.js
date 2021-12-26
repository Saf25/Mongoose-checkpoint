const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
require("dotenv").config();

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) console.log(err);
    else console.log("connected to the Database...");
  }
);
app.use("/people", require("./routes/personRoutes"));

app.listen(3000, (err) => {
  if (err) console.log(err);
  else console.log("Server is running on port 3000");
});
