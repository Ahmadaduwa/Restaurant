const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

//Routes
const apiRoutes = require("./routes/auth");
const catchAsync = require("./utils/catchAsync");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");

// Set up
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/auth", apiRoutes);

app.use(catchAsync(async (req, res, next) => {
  throw new AppError(`Can't find ${req.originalUrl} on this server`, 404);
})
);

app.use(globalErrorHandler);

const PORT = process.env.APP_PORT;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
