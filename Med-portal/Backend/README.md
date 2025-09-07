# PBL Medicines Server

This is a server application for a medicine management system, developed as part of a Problem-Based Learning (PBL) project.

## Getting started

### Prerequisites

To run the application, you need to have [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/) installed on your system.

### Installing

1. Clone this repository to your local machine using `git clone https://github.com/varadpundlik/PBL_medicines_server.git`
2. Navigate to the project directory using `cd PBL_medicines_server`
3. Install the dependencies using `npm install`

### Running the application

To start the server, run the following command: `node index.js`

Port :5000
## API created in backend
### 1. Medical Store DataBase
    Endpoint : http://localhost:5000/med
<br>

    Parameters:
        name
        quantity
        expiry date
        purchase date
        description
        price
#### GET Route:
    Description: To get all medicines data to medical store admin 
    

#### POST Route:
    Description: Post a new medicine stock in store database
<br>

### 2. Prescription 

    Endpoint : http://localhost:5000/presc
<br>

    Parameters:
        name
        doctor's name
        email
        med : (array of medicine name)
            name:
            quantity:
        date:
#### POST Route:
    Decription: Create a new prescription and recompute medical store stock according to medicines quantity 

<br>

### 3. Check medicines in prescription 

    Endpoint : http://localhost:5000/check
<br>

    Parameters:
        name
        doctor's name
        email
        med : (array of medicine name)
            name:
            quantity:
        date:
#### POST Route:
    Decription: Returns wheather a medicine is present in medical shop inventory or not

<br>

### 4. Mailing Route 

    Endpoint : http://localhost:5000/mail
<br>

    Parameters:
        name
        doctor's name
        email
        med : (array of medicine name)
            name:
            quantity:
        date:
#### POST Route:
    Decription: Sends a mail using nodemailer that  prescription is ready
    
        Endpoint : http://localhost:5000/mail/not
<br>

    Parameters:
        name
        doctor's name
        email
        med : (array of medicine name)
            name:
            quantity:
        date:
#### POST Route:
    Decription: Sends a mail using nodemailer that  prescription is ready but medicines are not available
    
        Endpoint : http://localhost:5000/mail/delivered
<br>

    Parameters:
        name
        doctor's name
        email
        med : (array of medicine name)
            name:
            quantity:
        date:
#### POST Route:
    Decription: Sends a mail using nodemailer that  medicines are delivered
    
### Built with

- [Node.js](https://nodejs.org/) - A JavaScript runtime built on Chrome's V8 JavaScript engine
- [Express](https://expressjs.com/) - A minimalist web framework for Node.js
- [MongoDB](https://www.mongodb.com/) - A document-based NoSQL database

## Contributing

Contributions to the project are welcome. To contribute, please follow these steps:

1. Fork this repository to your own account
2. Create a new branch for your feature or bug fix
3. Make your changes and commit them with descriptive messages
4. Push your changes to your fork
5. Submit a pull request to this repository with a description of your changes

## Authors

- Varad Pundlik (https://github.com/varadpundlik)


