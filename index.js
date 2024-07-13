require('dotenv').config();
const menu = require("./routes/menu");
const connectDB = require("./repositories/connectMongoDB")
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.send("Welcome to the homepage!");
});

app.use("/api/v1/menu", menu);


const start = async() => {
    try {
        await connectDB(process.env.MONGODB_URI);
        console.log("Connected to the database.");
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server is running on port ${process.env.PORT || 3000}.`);
        });
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}

start();