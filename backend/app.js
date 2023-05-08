const express = require("express")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(cors())
const coursesList = require("./Routes/prefernceRoutes");
const courseSchema = require("./Routes/courseSchema");

app.use("/api/v1/", coursesList);
app.use("/", courseSchema);


module.exports = app