// app.js
const express = require('express');

const userRouter = require('./routes/users');

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Use the user router for /users endpoint
app.use('/', userRouter);

app.listen(PORT, (error) => {
  if (!error)
    console.log("Server is Successfully Running, and App is listening on port " + PORT);
  else
    console.log("Error occurred, server can't start", error);
});