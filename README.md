# **Welcome to easyparking**
Open-source application for finding parking spots in the city.

> Finding the best parking spot in the city has never been this easy!

## Motivation
We were tired of driving around the city to find good parking.  
This app was designed to help drivers and the city update parking spot availability in real time.  

## Features
- Create User Accounts
- Login users
-- Update Profile
- Find Available Parking


## Screenshots
Include logo/demo screenshot etc.


#### Built With

- [React](https://reactjs.org/) & [React Hooks](https://reactjs.org/docs/hooks-intro.html)
Used React w/ Hooks bc...
- [Bootstrap](https://getbootstrap.com/)
We used Bootstrap to build a fast CSS framework. It contains CSS and JavaScript-based design templates for the needs in our app.
- [Webpack](https://webpack.js.org/)
Given the complexity of our front-end and back-end, we used Webpack to bundle our JavaScript files for usage in a browser
- [Node](https://nodejs.org/en/) & [Express](https://expressjs.com/)
Used Node & Express to route different async requests to render html page, input/update user info & parking spot info in the database. 
- [PostgreSQL](https://www.postgresql.org/) & [ElephantSQL](https://www.elephantsql.com/)
Hosted our relational database in ElephantSQL because the entities in our DB have predefined relationships and can be organized as a set of tables and columns.
![ER Diagram](https://i.imgur.com/usi7hmE.png)


## Installation
### To Run Your Easy Parking Project

- Fork this repo
- Clone to local repo
- Install dependencies

```bash
npm install
```

- Build the app

```bash
npm run build
```

- Start an instance of server/ Run Express

```bash
npm start 
```
- Start an instance of Client Server

```bash
npm run dev 
```
- Open browser and navigate to localhost at specified port
  

## SQL 
### DB Script
  
  CREATE TABLE "Users" (
	"id" serial NOT NULL,
	"first_name" VARCHAR(255) NOT NULL,
	"last_name" VARCHAR(255) NOT NULL,
	"email" VARCHAR(255) NOT NULL,
	"password" VARCHAR(255) NOT NULL,
	"id_role" integer NOT NULL,
	CONSTRAINT "Users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Roles" (
	"id" serial NOT NULL,
	"name" serial(255) NOT NULL,
	"description" serial(255) NOT NULL,
	CONSTRAINT "Roles_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "ParkingSpace" (
	"id" serial NOT NULL,
	"status" VARCHAR(255) NOT NULL,
	"id_user" integer,
	"expired_time" DATETIME NOT NULL,
	"locationid" integer NOT NULL,
	CONSTRAINT "ParkingSpace_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Locations" (
	"id" integer NOT NULL
) WITH (
  OIDS=FALSE
);



ALTER TABLE "Users" ADD CONSTRAINT "Users_fk0" FOREIGN KEY ("id_role") REFERENCES "Roles"("id");


ALTER TABLE "ParkingSpace" ADD CONSTRAINT "ParkingSpace_fk0" FOREIGN KEY ("id_user") REFERENCES "Users"("id");



---

**Authors**
Version 0.1.0:
Nachiket Pingle [@Nachiket Pingle](https://github.com/Nachiket1)
Jono Calvo [@Jono Calvo](https://github.com/jonocr)
Mo Hmaidi [@Mo Hmaidi](https://github.com/mhmaidi789)
Dylan Bury [@Dylan Bury](https://github.com/dylanbury)

