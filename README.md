# When I Work Scheduling Demo
Deployed to https://when-i-work-challenge.herokuapp.com/

## Purpose
The purpose of this app is to create a basic scheduling application where a user can create, edit, view and delete shifts. This project was created using the MERN stack. All API code is located under the `server` directory. All UI code is located in the `client` directory which has a spearate `package.json` file to manage its own dependencies
---
## Overview
There are two roles for users; Administrator or Employee.
When a user signs up, they will enter a unique business name and will automatically become an Administrator. The Administrator can then create more users, both Employees and Administrators, that will automatically be associated with the business name the initial user entered. The created Employees and Administrators will then be able to log in with the password and email entered. 

An Aministrator can see all shifts for all users while an Employee can only see their own shifts. Only an Administrator can create, edit or delete a shift or a user. An Employee will not have the ability to edit or delete their shifts.
---
## API Documentation
[CLICK HERE FOR API DOCUMENTATION](./server/README.md)
---
## Running Locally
### Prerequisites 
1. Node Version 14 or higher
2. Yarn installed globally `npm install --global yarn`
3. In `client/src/api/index.ts`, change the `baseUrl` variable to `'http://localhost:4000/api'`
4. Add a `.env` file located at the root directory. This needs to include two variables
    - SECRET - can be any value but the more complex the more secure. Used for express-session to manage user session
    - CONNECTION_STRING - the connection string to the mongodb instance in MongoDB Atlas
---
1. Clone repository down and run `yarn install` in root directory
2. `cd` into `client` directory and run `yarn install`
3. `..cd` up into root and run `yarn dev`. This will start both node server and client

Server code will be up and running on port 4000 and client will be running on port 3000. To access local UI visiti http://localhost:3000

## Available Scripts

In root project package.json:

### `yarn dev`
Runs both the UI and Server concurrently. 

### `yarn server`

Runs just the server code at https://localhost:4000. Used if UI is not necessary just working on API. All api endpoints can be reached through https://localhost:4000/api

### `yarn client`

`cd`s into the `client` directory and runs `yarn start` to serve up the webpack dev build of the UI at localhost:3000

### `yarn format`

Uses `prettier` npm package to format all code in repo

### `heroku-postbuild`

Used for Heroku deployment and should not be used locally

---
In client directory package.json:

### `yarn start` 

Serves up the UI code using webpack at localhost:3000

### `yarn build`

Create a production build using webpack that is outputed in the `dist` folder

