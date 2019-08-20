# Kyle's Calories

Kyle's Calories is a calorie counter app that can catalog and calculate users calorie intake which they simply can use to contemplate, correlate and craft their cognitive conditional corrections, and cease their corruptive patterns conspiring to condemn them into cynical actions. Chao!

## Learning Goals
  - Create an Express API given specified endpoints and response formats
  - Create a microservice that interfaces with the Edamam API
  - Integrate both apps together and complete the quantified self experience

## Technologies Used
  - [Node.JS](https://nodejs.org/en/)
  - [Express](https://expressjs.com/)
  - [Jest](https://jestjs.io/)

## Setup
1. Clone this repository
2. Install npm with the command `npm install`
3. Create a sequelize database `npx sequelize db:create`
3. Migrate the with database `npx sequelize db:migrate`
4. Run your npm server `npm start`

  ### Testing
  1. Globally install Jest
    - `npm install jest -g`
  2. Install [babel-jest](https://www.npmjs.com/package/babel-jest) and [supertest](https://github.com/visionmedia/supertest)
    - `npm install jest -g`
  3. Add a test script to the `package.json` file
  ```
    // example
    "scripts": {
      "start": "node ./bin/www",
      "test": "jest --watch"
    },
  ```
  4. Run the test suit from the terminal
    - `npm test`

---

## Endpoints
  - [All Foods](#all-foods)
  - [Single Food](#single-food)
  - [Create A New Food](#create-a-new-food)
  - [Update A Food](#update-a-food)
  - [Delete A Food](#delete-a-food)


## All Foods
Send a GET request to receive all the foods currently in the data base.

  #### GET /api/v1/foods
  ```
  Content-Type: application/json
  Accept: application/json
  ```

  ##### Successful Response
  ```
  {
    "id": 1,
    "name": "Banana",
    "calories": 150
  },
  {
    "id": 2,
    "name": "Milk Steak",
    "calories": 2000
  }
  ```

## Single Food

Send a GET request with a valid food ID to receive a food object.

  #### GET /api/v1/foods/:id
  ```
  Content-Type: application/json
  Accept: application/json
  ```

  ##### Successful Response
  ```
  {
    "id": 1,
    "name": "Banana",
    "calories": 150
  },
  ```

  ##### Requirements
  - A valid ID must be provided, otherwise a (404) status code will be returned.


## Create A New Food

Send a POST request with parameters of the name and calories of the food, to create a new food.

  #### POST /api/v1foods
  ```
  Content-Type: application/json
  Accept: application/json
  ```

  ##### Example Request
  ```{ "food": { "name": "Name of food here", "calories": "Calories here"} }```

  ##### Successful Response
  ```
  {
    "id": 1,
    "name": "Banana",
    "calories": 150
  },
  ```

  ##### Requirements
  - If the food is not successfully created, a 400 status code will be returned. Both name and calories are required fields.

## Update A Food

Send a PATCH request with parameters of the name and calories of the food, to update the food.

  #### PATCH /api/v1foods
  ```
  Content-Type: application/json
  Accept: application/json
  ```

  ##### Example Request
  ```{ "food": { "name": "Mint", "calories": "14"} }```

  ##### Successful Response
  ```
  {
    "id": 1,
    "name": "Mint",
    "calories": "14"
  },
  ```

  ##### Requirements
  -  If the food is not successfully updated, a 400 status code will be returned.

## Delete A Food

Send a DELETE request with ID of food to be deleted.

  #### DELETE /api/v1foods/:id
  ```
  Content-Type: application/json
  Accept: application/json
  ```

  ##### Successful Response
  - Status code of 204

  ##### Requirements
  - If the food is not successfully updated, a 400 status code will be returned.
----------

## Contributing
   - Please open a pull request to contribute!
## Kyle loves feed back!
