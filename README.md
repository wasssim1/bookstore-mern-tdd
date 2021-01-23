# Project Overview

This is a Book Store implemented basing on MERN stack.

### Server Side (backend)

Tech-Stack used:
* Node.js (a free JavaScript run-time environment, It executes JavaScript code outside of a browser)
* Express.js (a web-based application framework work with Node.js)
* Mongoose (allows to interact with the MongoDB database)
* Mocha (a testing library) 

### Client Side (frontend)

Tech-Stack used:
* ReactJS (a JavaScript User Interface library created by Facebook)
* Redux (State manager)
* Axios (Http calls handler)

### Database
* Mongo DB (an open-source NoSQL cross-platform document-oriented database)

# Project Layout
Here is the project layout:
 ```
   book-store
    |__ client/ (React App Frontend)
        |__ public/
            |__ index.html
        |__ src/
            |__ App.jsx
        |__ package.json
    |__ server/
        |__ database/ (Mock Data)
        |__ server.js (Express Backend)
        |__ package.json
 ```

# Project Structure

The app simply displays a library store of books and a borrowing functionality for the current user.
I will be using local storage since there is no user session management required for the task.

Adding to localStorage, I will use Redux as a state manager for the client app.

Tests will be only implemented for the server side. (The JD requires no testing for the UI)

I will be using a generic MERN (MongoDB, Express, React, Node.js) stack app which uses a proxy with the Express server.

This means that instead of having two separate servers running (One for the frontend (React) and the other for the backend (Express)) I will build the React project into a directory of static files which Express will then serve.

---

## Setting Up `book-store` manually:
This method requires having the following to be installed on your local machine:
* Node.js (check by typing `node --version`)
* NPM (check by typing `npm --version`)
* MongoDB service

##### Single Step
Run the following command lines:
 ```
     $ cd books-store/server    
     $ npm run buildThenStart    
 ```

##### Step By Step
* Start by installing project dependencies for both, server and client sides:
 ```
    $ cd books-store/server    
    $ npm install    
    $ cd books-store/client    
    $ npm install    
 ```
* Create build version for the client app:
 ```
     $ cd books-store/client    
     $ npm run build    
 ```
* Launch the app on (http://localhost:8080):
 ```
     $ npm start    
 ```

#### Testing
To run test, type the following commands:
 ```
     $ cd books-store/server    
     $ npm test    
 ```

## Setting Up `book-store` with Docker:
Alternatively, you can buil and launch the app using Docker.
You need to have only [Docker Engine](https://docs.docker.com/engine/install/) installed on your machine.

Run this command: (This may take a few minutes)
 ```
     $ docker-compose -f docker-compose.prod.yml up --build    
 ```

# Author
* [Wassim Mhamdi](https://wassimmhamdi.com)
