# My Solution for Lenskart Solutions' Programming Test
Name: Sophia Marani<br>
Email: smarani.2019@smu.edu.sg<br>
Date: 2 May 2021

# Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.<br>
Things you need to have before launching this web application:
```
Download/clone these set of project files
localhost server (e.g. WAMP/MAMP)
MySQL database
```
In this remaining setup guide, we will be using WAMP/MAMP alongside with MySQL database. 

### Importing eyewear_db-create.sql to MySQL
Head to localhost/phpmyadmin and log in with: 
```
username = "root"
password = "" or "root" (Mac users)
```
Initialize 1 database (Eyewear) in MySQL from db folder.

### Opening the web application
Change MySQL database settings in eyewear.py accordingly.
```
e.g. app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3308/eyewear'
```
Launch WAMP.<br>
Open up eyewear.py and run the Python file.<br>
Ensure Flask is running on port 5000.
```
e.g. This is flask eyewear.py to get all the eyewear objects.
 * Debugger is active!
 * Debugger PIN: 123-456-789
 * Running on http://0.0.0.0:5000/ (Press CTRL+C to quit)
```
Head to Chrome and open the categoryselection.html.
```
e.g. http://localhost/LenskartSolutions/categoryselection.html
```

## Built with
* HTML
* Bootstrap 5.0 - CSS styling
* JavaScript
* MySQL
