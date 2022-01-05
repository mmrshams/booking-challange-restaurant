# booking-challenge-restaurant
 This is the Small code challenge for Booking Reservation on Both Admin and Customer sides
 and base on the Description here is some of key business logics:

 - Admin can add table 
 - Admin can Create/Edit reservation 
 - Restaurant have start and end time (hour) per day that can be changed
 - Customer need to see available tables
 - Customer need to book a tables
 - Customer/Admin need to cancel a tables
 - Customer need to add his/her name to waiting queue

## Please read this before review:
This code is implemented with typescript Tsconfig-google code style and some kind of javascript libraries but Based on Nest.js Framework with mono-repo Structure with SOLID considerations
base on Microservice Architecture and DDD design, you can find more information on Documentation link


## Why MonoRepo Structure ? and why Nest.js:
AS long as Dockerizing is the one of important part of this challenge,
for easier code management i preferred to use monorepo structure it means we need to
copy all the code per instance but with different configs,
it means only some specific number of nest.js modules will run per instance

about why Nest.js, easy to use instead of preparing clean boilerplate

## Flow of implementation:
 you can see the progress of implementation on related "tasks" if 
 they were done on "github issues" tab (it may some designed parts are not completed!)

## Documentation:

You can find related Diagrams on [Draw.io](https://drive.google.com/file/d/1lzbL3fLtyA80jj6UB9ibCP6479VDiZE5/view?usp=sharing)

![Alt image](./Booking-Api-Diagrams-Diagrams.drawio.png?raw=true "image")

## Installation:

Use the package manager [YARN](https://yarnpkg.com/cli/node) to install dependencies.

```bash
# For install dependencies
yarn install 
```

## Usage

```bash

# For easy run the project
yarn start:dev 

# For run project with docker.file

# build
 docker build .
# For see the list of containers  
 docker ps -a 
# run
 docker run containerId 

# For run with Docker-compose
 docker-compose up
 
# For run tests
 yarn test
```

## Contributing
this code is designed to be scalable and ready for easy changes on business logics
and add more APIs but because it not mention on code-challenge there are not implemented

## Code structure
 > src
 > > common 
 > > > interfaces, enums, schemas, repositories, utils, ...
 > >
 > > mongoDb
 > > > mongoDb connector
 > > >
 > > inventory
 > > > controller, service, module
 > > >
 > > reservation
 > > > controller, service, module
 > > >
 > > reservation
 > > > controller, service, module
 > > >
 > > admin gateway
 > > > controller, service, module
 > > >
 > > catalog (customer gateway)
 > > > controller, service, module
 > > >
 > > main.ts
 > > > entry point of project
 > > >
 > other files ...

## License
 - no license
