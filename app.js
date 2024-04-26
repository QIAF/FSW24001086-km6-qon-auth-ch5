require("dotenv").config();

const express = require("express");
const morgan = require("morgan");

const router = require("./routes")

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use(morgan('dev'));

app.use(router);
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.json({
		status: err.status || 500,
		message: err.message,
	});
});

module.exports = app;



