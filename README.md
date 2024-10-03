# Opiniion.com
This repository contains a solution to the Opiniion backend advanced coding challenge.

# Considerations
- Put the routes in a separate file.
- Implement mock mongo db connection and queries.
- Add authentication to the API.
- Use node-cron for scheduled task.
- Create API docs, hopefully with a playground.
- Path parameters vs query parameters in a RESTful API.
- Configure CI/CD (GitHub Actions?)
- Add CORS

# Specifications
/*
We use Mongo and Node/Express as our backend technologies.
However, for this exercise, we will be using https://dummyapi.online/api/users as our data source.
Write an app that grabs the data every minute, storing the data in a global variable or mock mongo db.  Check for changes in the data and update it accordingly.
With that data, fill in the stubbed out endpoints, creating mongo queries to get the data (as if it were in a database) and return it in the specified format.
Make sure to emphasize efficiency, reusability, readability, and maintainability.
*/

/**
@method Get
@route /userById
@param {Int} userId
@return {User} the user with the id that matches the userId param
*/

/**
@method POST
@route /getUserByState
@param {String} stateCode
@return {Array<User>} users with the state matching the stateCode param
*/

/**
@method POST
@route /countByState
@return {Array<String, Int>} all existing states with the number of users within them
*/

/**
@method POST
@route /userGroupByState
@return {Array<String, {Array<User>}>} all existing states with the complete user objects within them
*/

/**
@method POST
@route /searchUsers
@param {String} searchParam
@return {Array<User>} users with any field matching searchParam
*/

/**
@method POST
@route /updateUser
@param {Int} userId
@param {Dict} fieldsToUpdate
@return {User} updated user object matching userId
*/



router.post('/sampleExpressRoute', function(res, req) {
  res.send('Finished!');
});

# Run
Development
```
npm run dev
```

Production
```
npm run start
```



