// app.js
const express = require('express');
const app = express();
const axios = require('axios');

const PORT = process.env.PORT || 3000;

// This will hold the fetched data
let fetchedData = {};

// Function to fetch data from an external API
const fetchData = async () => {
  try {
    const response = await axios.get('https://dummyapi.online/api/users'); // Replace with your API endpoint
    fetchedData = response.data; // Store the fetched data
    console.log('Data fetched:', fetchedData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Set an interval to fetch data every minute (60000 milliseconds)
setInterval(fetchData, 60000);

// Initial fetch when the server starts
fetchData();

/**
@method Get
@route /userById
@param {Int} userId
@return {User} the user with the id that matches the userId param
*/
app.get('/userById', (req, res) => {
  const userId = parseInt(req.query.userId);
  const user = fetchedData.find(user => user.id === userId);
  // Response
  res.json(user || {});
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});