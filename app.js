// app.js
const express = require('express');
const app = express();
const axios = require('axios');

const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

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

/**
@method POST
@route /getUserByState
@param {String} stateCode
@return {Array<User>} users with the state matching the stateCode param
*/
app.post('/getUserByState', (req, res) => {
  const stateCode = req.body.stateCode;
  const users = fetchedData.filter(user => user.address.state === stateCode);
  // Response
  res.json(users);
});

/**
@method POST
@route /countByState
@return {Array<String, Int>} all existing states with the number of users within them
*/
app.post('/countByState', (req, res) => {
  const stateCount = fetchedData.reduce((acc, user) => {
    acc[user.address.state] = (acc[user.address.state] || 0) + 1;
    return acc;
  }, {});
  // Response
  res.json(stateCount);
});

/**
@method POST
@route /userGroupByState
@return {Array<String, {Array<User>}>} all existing states with the complete user objects within them
*/
app.post('/userGroupByState', (req, res) => {
  const groupedUsers = fetchedData.reduce((acc, user) => {
    if (!acc[user.address.state]) acc[user.address.state] = [];
    acc[user.address.state].push(user);
    return acc;
  }, {});
  // Response
  res.json(groupedUsers);
});

/**
@method POST
@route /searchUsers
@param {String} searchParam
@return {Array<User>} users with any field matching searchParam
*/
app.post('/searchUsers', (req, res) => {
  const searchParam = req.body.searchParam.toLowerCase();
  const users = fetchedData.filter(user => 
    Object.values(user).some(value => 
      typeof value === 'object' && value !== null 
        ? Object.values(value).some(addrValue => 
            String(addrValue).toLowerCase().includes(searchParam) // Check nested properties
          )
        : String(value).toLowerCase().includes(searchParam) // Check other properties
    )
  );
  // Response
  res.json(users);
});

/**
@method POST
@route /updateUser
@param {Int} userId
@param {Dict} fieldsToUpdate
@return {User} updated user object matching userId
*/
app.post('/updateUser', (req, res) => {
  const userId = parseInt(req.body.userId);
  const fieldsToUpdate = req.body.fieldsToUpdate;
  let user = fetchedData.find(user => user.id === userId);

  if (user) {
    user = { ...user, ...fieldsToUpdate };
    fetchedData = fetchedData.map(u => (u.id === userId ? user : u));
    // Response
    res.json(user);
  } else {
    // Response
    res.status(404).json({ message: 'User not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});