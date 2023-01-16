const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const PORT = 8001;
const passport = require("passport");
const users = require("./routes/api/users");
const app = express();

mongoose.set("strictQuery", false);
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

//using passport middleware
app.use(passport.initialize());
//Passport config
require("./config/passport")(passport);

//Routes
app.use("/api/users", users);
const port = process.env.PORT || PORT; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () =>
  console.log(`Server up and running on port ${port}. You better catch it!`)
);
