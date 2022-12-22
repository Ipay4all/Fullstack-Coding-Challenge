# Full-Stack-Developer-Coding-Challenge
As the next step in the interview process, we’d like you to complete a coding challenge.

## The Project

You will be building a basic version of a Virtual Product Management (VPM) Dashboard. There's a postman collection in this repository, Access token is required to get product details based on the country UAE. You will need to take product data and persist it in a backend database. You will then develop a backend API, to be called upon by your frontend, which will display the data. This dashboard should allow registration and login of a user, requiring a password, and the user's credentials should also be persisted in your database.

The result should be a dashboard with two pages (the application can be single-page (SPA), or multiple pages):

* A registration/login page
* A main page that displays products with details well formatted 
* User should be able to add products, update details and delete products 

## Requirements

**Git**
* Maintain code on git (github/gitlab).
* Push code with proper commits.
* Create feature branch for each push (registration, dashboard).
* Create a conflict and resolve.

**Backend**
* The backend of this project should be done in PHP using any framework. 
* *product data* and *user credentials* data is persisted in a database. 
  * Each data point should have a corresponding column in the database.
  * You may use any databse tool of your choice, such as PostgresQL, MongoDB, SQLite, etc.
* API provides frontend with *product details*, and *verified user credentials*.

**Frontend**
* The frontend of this project can be done in React, Vue, or Angular. You are permitted to use any of these frameworks CLI generators to quickly start a project (npx create-react-app, ng new my-app, etc.)
* Login Page Reuirements
  * Authentication is required to access the application
  * User must register for a new account, or login with an existing account, to proceed to the dashboard
* Main Page/Dashboard Requirements
  * The dashboard page cleanly displays the *product data*
  * User should be able to add product
  * User should be able to delete product
  * User should be able to update product details
  
## Additional Information
* You are free to use any third-party libraries.
* Have fun and be as creative as you like!
* Please feel free to reach out to ask any questions (rtahir@ipay4all.com).

## How to submit this challenge (Optional):
1. Fork this repository
2. Work on your solution
3. Deploy the frontend and backend of your application using free services (Netlify, Heroku, etc).
4. Create a pull request as the reviewer.

## Timeframe

We would like the take home challenge to be completed within 1.5 hours. If you need more time, please reach out to us. You will not be judged on how quickly you complete the challenge.
