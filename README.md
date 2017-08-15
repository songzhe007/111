# EatReview
EatReview Project-CS5610 Web Dev


Seesion cookies are implemented in this project. 

Prior to login a different account, please make sure you log out the current one, disable the browser's cookies or login via different browsers/devices.

Simply refresh the page if there is any displaying issue.
 
 WebApp is deployed at: https://cs5610-eatreview-zhesong.herokuapp.com
 
 Portfolio is deployed at: https://portfolio-zhesong.herokuapp.com/

## Installation

`npm install --save`


## Admin User:
Username: admin@admin

Password: admin

## Sample User:
Username: line@line

Password: 12345

## Tech Doc:
https://docs.google.com/document/d/1_nAomNVU2aCowWiKgdChc65NEvhkKsGOZ5Tx5jnSrmE/edit

## Navigation:
User Registration/Sign Up
*  User has to input a valid Email address (can be fake) as their username;
*  User’s password has to be at least 5 characters in length;
*  User’s password input has to match in two attempts (password and vertified password);
* “Sign Up” button is disabled before the user complete a legal input.
* If the email that the user input has already existed, the user would be asked to choose an alternative email address instead.

User Login
* Passport-local strategy: user log in to the website using their email address and password that registered locally.

Profile Page/View all users (From drop down menu in navbar after logged in)
* General users are able to update/delete their personal informations and reviews; They also able to delete themselves. 
* Besides the profile page, the admin users are able to perform  operations on general users in “View all users” page.

Search Food
* Everyone is able to search restaurants based on food types and location.
*10 nearest restaurants with  detailed information and reviews posted by users are available to everyone.
* Reviews for each restaurants are open to public.

Add/Edit  Reviews
* Only logged in users are able to write new reviews for any restaurants they want.
* Logged in users are able to edit or delete the reviews they created previously in the profile page (Just click the reviews title or content, you can edit it directly and all changes will be saved automatically).

See Reviews
* Everyone can see all reviews that has been made by logged in users.
* Admin users are able to delete any reviews from the website.
* If anyone is interest in a review, they can email that user who made it. 

Theme Customization 
* Users are able to change the theme at any time to protect their vision by selecting  “light or dark” mode in the dropdown menu of Home in navbar.




