# RB-QA-Dashboard

Dashboard for QA automated test showing tests campaigns run results

## Getting started

you must have node and npm/yarn installed.

**client side librairies :**

- npm i axios
- npm i react-bootstrap bootstrap
- npm i react-paginate --save
- npm i react-chartjs-2 chart.js
- npm i chartjs-plugin-stacked100 --save
- npm i react-router-dom
- npm i --save @fortawesome/fontawesome-svg-core
- npm i --save @fortawesome/free-solid-svg-icons
- npm i --save @fortawesome/react-fontawesome
- npm i react-copy-to-clipboard
- npm install -g typescript

**server side librairies :**

- npm i cors
- npm i mysql express
- npm i express-session body-parser cookie-parser
- npm i bcrypt
- npm i dotenv
- npm i jsonwebtoken
- npm i node-schedule
- npm i mysqldump
- npm i compression --save

## How it works

each tests suites should be run once each day (with Jenkins) ==> Thanks to some procedures, result will be stored into a database
In server folder, you can find server.js. This file will make all interaction with the database.
In client folder, you can find all the front end, all react code.

## How to launch this Dashboard

### To start the server :

`node C:/Dashboard/dashboardTS/server/server.js`

### To start the client (React) :

pour une version de dev :

- go to client folder (with `cd C:/Dashboard/dashboardTS/client`)
- then execute `npm start`
  this command will launch a server where modification will be shown directly

pour une version de build :

- go to client folder (with `cd C:/Dashboard/dashboardTS/client`)
- then execute `npm run build`
  this command will compile the code and optimized it
- then execute `serve -s build`
  this command will launch the hosting of the compiled app
