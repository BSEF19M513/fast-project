const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

// path of config file containing configuration details
dotenv.config({ path: "backend/config/config.env" });

// connect to database
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
}).catch(err => {
    console.log(`Error connecting to database: ${err.message}`);
});

// start the server
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
