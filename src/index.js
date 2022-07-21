// ============================[Requirements]========================
const express = require("express");
const bodyParser = require("body-parser");
const route = require("./routes/route.js");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.json());

// =============================[Connect DataBase]=========================
mongoose
  .connect(
    "mongodb+srv://sahilkushwaha:aasahil@cluster0.jluapfr.mongodb.net/group5Database?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("database is connected "))
  .catch((err) => console.log(err.message));

app.use("/", route);

app.all('/**', (req, res) => {
  res.status(404).send({ status: false, message: "Either Page Not Found! or You are missing some of the ParaMeters" })
})

app.listen(process.env.PORT || 3000, function () {
  console.log("Express app is running on port " + (process.env.PORT || 3000));
});