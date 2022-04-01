# Employee Tracker

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table of Contents

* [Description](#description)
* [Visuals](#visuals)
* [Installation](#installation)
* [Technologies](#technologies)
* [Licenses](#licenses)
* [Support](#support)
* [Authors](#authors)
* [Contributions](#contributions)

## Description

Welcome to the Employee Tracker, where you can see comprehensive lists of your company's departments, job roles, and employees. Additionally, you can add to any of these lists, and make update to employee roles as necessary, all from your command line. SImple installation, and even simpler interface. 

## Visuals

The following image is of the website where you will download Node JS, if necessary.

![node j s website](./images/Download-Node-js.png)

This is the appearance of the main menu in the terminal.

![main menu](./images/main-menu.png)

This is the display for the departments table, with a unique ID for each.

![departments table display](./images/departments.png)

This is the display for the roles table, with unique ID, title, department, and salary fields.

![roles table display](./images/roles.png)

Thhis is the display for the employee table, with unique ID, first, last, title, and salary.

![employee table display](./images/employees.png)

[Click here for a video explaining installation and initalizing the application](https://drive.google.com/drive/folders/1t82iAdKtW-BBx0jmapCqC82QJS31dJ_F?usp=sharing)

## Installation

To enjoy this application, you will need to install Node JS on your local computer. [Click here for links to download Node JS.](https://nodejs.org/en/download/)

Then, clone this repository to your local computer, and open up the folder in your coding software (i.e. Visual Studio Code). Once open, open up your Terminal (on Mac OS) or GitBash (on Windows OS). You will have to direct yourself to the cloned repository, and then run this command in the terminal: 

`npm install`

This will download the node modules MySQL, Express, and Inquirer that this application needs to run on your local computer. After install, you will run the following command to open a MySQL shell in your terminal: 

`mysql -u root` 

Then you will install the schema.sql file so MySQL can format your database. The semi-colon is necessary.

`SOURCE db/schema.sql;`

You can exit the shell by entering:

`exit`

And then type:

`node index.js`

If you get a message in the terminal saying "Connected to the emptracker_db database.
Welcome to the Employee Tracker. Please enter an action below.", then you have installed the program correctly.  

The Inquirer module will bring up the main menu of the Employee Tracker. When adding data, simply type your response to each question in the terminal and hit enter. You can navigate menus by pressing the numbers associated with each option and hitting enter.

Even directly after an update, you can immediately see the changes when viewing your lists. Choose 'quit' on the main menu when finished.

[Click here for a video explaining installation and initalizing the application](https://drive.google.com/drive/folders/1t82iAdKtW-BBx0jmapCqC82QJS31dJ_F?usp=sharing)

## Technologies

* Node JS
* Inquirer module
* MySql2
* Express

## Licenses

This application uses the MIT Software License. [Click here to view full license.](LICENSE)

## Support

Contact us at devonfaria@gmail.com if you need assistance downloading or activating this repository. You can also find me on [GitHub.](https://github.com/devonfaria)

## Authors

Devon Faria

## Contributions

Thanks to the UNC Bootcamp for a great week!