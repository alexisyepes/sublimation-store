const sslRedirect = require("heroku-ssl-redirect");
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const productRouter = require("./routes/product");

require("dotenv").config();
app.use(cors());

app.use(sslRedirect());

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
}

//ROUTES//
app.use("/", productRouter);

//ROUTES//

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function (req, res) {
	res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

mongoose.connect(
	`mongodb+srv://dbSublimation:${process.env.MONGO_ATLAS}@cluster0-jgrcp.mongodb.net/test?retryWrites=true&w=majority`,

	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

app.listen(PORT, function () {
	console.log(`🌎 ==> API server now on port ${PORT}!`);
});
