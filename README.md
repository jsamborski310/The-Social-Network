  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  
# The Social Network

An API for a social network application where users can share their thoughts, react to friends' thoughts, and create a friend list. 
  

## Description

This application is an API for a social network application, and uses a NoSQL database. Users can share their thoughts, react to friends' thoughts, and create a friend list. 

Users and Thoughts can be created, updated, and deleted. Additionally, when a User is deleted, all associated thoughts are deleted. Reactions to thoughts can be created and deleted. A friend can be added or removed from the Users' friend list.

This application uses Express.js for routing, a MongoDB database, the Mongoose ODM, and Moment.

* Javascript
* Mongoose
* Express
* Moment


## Table of Contents

  * [Description](#description)
  * [Installation](#installation)
  * [License](#license)
  * [Preview](#preview)
  * [Questions](#questions)

## Installation

Clone the repository onto your local environment. 

The following dependancies, listed in `package.json` must be installed to run this application: 

* express
* moment
* mongoose

Run the following code to install the dependancies: 

`npm install` 

To start the application, run the following code in the terminal:

`npm start`


## License

This application is covered under the MIT license.


### Application Preview

Preview of the application in action. 

#### USER ROUTES
Displays GET, POST, PUT and DELETE routes for Users.

![Gif displaying user routes in action.](/assets/user-routes.gif)

#### THOUGHT ROUTES
Displays GET, POST, PUT and DELETE routes for Thoughts.

![Gif displaying thought routes in action.](/assets/thought-routes.gif)

#### FRIEND & REACTION ROUTES
Displays POST and DELETE routes for Friends and Reactions.

![Gif displaying friend and reaction routes in action.](/assets/friend-reaction-routes.gif)

## Preview

GitHub Repo: https://github.com/jsamborski310/The-Social-Network

Walkthrough Video 1: https://www.loom.com/share/e739537cd4024d25838a9a89287d25be

Walkthrough Video 2: https://www.loom.com/share/76fc8ffe50c04968bbc960e5013c4ba5

## Questions

For questions about this application or if you would like to collaborate, connect with me on <a href="https://www.linkedin.com/in/juanita-samborski/" target="_blank">Linkedin</a>.

