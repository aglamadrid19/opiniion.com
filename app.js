// app.js
const express = require('express');

const userRouter = require('./routes/users');

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Use the user router for /users endpoint
app.use('/', userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});