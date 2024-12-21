# Isaac Lee README

<!--toc:start-->

- [Isaac Lee README](#isaac-lee-readme)
  - [Project Branches Modified](#project-branches-modified)
    - [User Accounts](#user-accounts)
    - [Navbar](#navbar)
    - [SQL Database](#sql-database)
    - [Listing Form](#listing-form)
    - [Favicon](#favicon)
    - [Contact Page](#contact-page)
    - [Tagging/Filtering](#taggingfiltering)
    - [Home Page](#home-page)
  - [Citations](#citations)
  <!--toc:end-->

## Project Branches Modified

- User Accounts
- Navbar
- SQL Database
- Listing form
- Favicon
- Contact Page
- Tagging/Filtering
- Home Page

### User Accounts

- Created user database in phpmyadmin
- Added account creation and account login functionality to login and signup pages
- Implemented password encryption
- Added session management to the website
- Created the initial user account page
- Updated navbar to show username or guest status in the website
- Created a logout php script for account page and navbar
- Added email verification to ensure that accounts belong to valid RPI students

### Navbar

- Updated navbar to show username or guest status in the website

### SQL Database

- Installed and configured phpmyadmin on the website
- Designed the structure of the database
- Created the user table
- Added user_id column to listings database
- Matched user_id to the id of the creator of the listing
- Helped teammates setup a local website and database for development
- Created a table to store the ids of people who sent us an email in the last 2 hours
- Created a table to store user accounts pending verification

### Listing Form

- Updated form to use certain values from the session rather than from user input

### Favicon

- Created and deployed a favicon for our website using a design from Ashrita

### Contact Page

- Created the contact/ page in the website
- Implemented a form which posts to a php script
- Made the php script send an email to an RPIMart email and a confirmation email to the sender
- Setup msmtp on our website to enable the email functionalities

### Tagging/Filtering

- Implemented adding tags to listings from Swaroop's addition to the listing form
- Made tags for a listing display on the listing's page
- Implemented the filter functionality in the market page to find wanted listings
- Added tags to existing listings

### Home Page

- Made the top items boxes into clickable links to the items' pages
- Moved page to the root directory and adjusted links from and to the page

## Citations

- <https://chatgpt.com>
- <https://w3schools.org>
- <https://geeksforgeeks.org>
- <https://favicon.io/favicon-converter/>
- <https://github.com/marlam/msmtp>
