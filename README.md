# Accident noting Application





# Constat

IOS Project Backend of a Mobile application designed for the motorcycle and car's owners wich facilates for them noting the accident and send the notes to insurance 100% digitaly without papers.
This application gives the users the ability to call emergency in case of damaged car.
Pay the fees for the SOS and insurance.


about

Initially appeared on
[gist](https://github.com/firaschaieb/FrontendIOS).

## Getting Started

These instructions will give you a copy of the project up and running on
your local machine for development and testing purposes. See deployment
for notes on deploying the project on a live system.

### Prerequisites

Requirements for the software and other tools to build, test and push 
- [NodeJS](https://nodejs.org/en/)
- [MangoDB](https://www.example.com)
- [Docker](https://www.docker.com)
### Installing

A step by step series of examples that tell you how to get a development
environment running

Say what the step will be
1.

    npm install

2.

    npm install express

3.

    npm dev start

### Docker

A step by step series of examples that tell you how to get a Docker environement working
1.

    docker build . -t <your username>/node-web-app
   
2.

    docker run -p 49160:8080 -d <your username>/node-web-app  


## Running the tests via http://localhost:3000/

you either use postman via this url : http://localhost:8080/ 
    
    or
    
you go to the url via navigator : http://localhost:8080/

### Login Tests

to login you can test

    POST http://localhost:8080/users/login  
 
send the username and password : 
        
        ContentType/applicationJson 
        {
            "username":"example",
            "password": "examplePassword" 
        }


## Built With

  - [JavaScript](https://www.contributor-covenant.org/) -
  - [NodeJS](https://nodejs.org/en/) - 
  - [MangoDB](https://www.example.com) -
  - [ExpressJS](https://expressjs.com/) -

## Authors

  - **Firas Chaieb** - *Provided README Template* -
    [firaschaieb](https://github.com/firaschaieb)
  - **Wissam Ben Njima** - ** -

![command-line-pic](https://blog.lecacheur.com/wp-content/uploads/2014/10/docker.png)
![command-line-pic](https://codemoto.io/wp-content/themes/cloudhost/library/images/node-express-mongo.png)

