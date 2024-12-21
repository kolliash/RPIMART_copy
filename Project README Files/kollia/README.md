# Ashrita Kollipara README
## My Branches
kollia-editListings
kollia-editListingDelete
kollia-favorites
kollia-finalLikes
kollia-listings-json
kollia-listingsPHP
kollia-logo

Below are the most important branches for the project, where I made the most significant changes. I had issues with using github in the start of the project and was using pull requests incorrectly. I approved some pull requests before October myself. I eventually learned what I was doing wrong and changed my workflow to do it correctly. 


# kollia-logo
I created a logo for the website, which is also used as the site's favicon.

### kollia-displayListings
In this branch I created a form for users to upload information about a listing and have it submit into the listings table of our rpimartDB. This took a while to understand how to store images. I eventually decided to store images as BLOBS after doing some research online. This worked for the purposes of our website and was fairly simple for me to understand. In this branch I also tested with displaying the information from the database after the form was submitted. 

### kollia-listings-json/kollia-listingsPHP
In this branch, I set up the database and the tables important for this project. The main database is called rpimartDB. I created the listings table, which contains all the information for each listing. The most important part of this was implementing an auto-increment for the listing_id so that each new listing entered has a unique ID that could be used later. This is one of the largest tables I have created, but I found that using the command line to create the table streamlined the process and made it easy to understand.

### kollia-finalLikes/kollia-favorites
In this branch, I worked on the liked.html, get_all_likes.php, and get_all_likes.js files. I added functionality so that each listing includes a total_likes element, which can be displayed on the front end along with all the additional information for the listing. I implemented the functionality so users can like a listing, and this action would be recorded. To do this, I created a users_likes table in our database where each user is associated with the listings they liked. My JavaScript also accounted for the fact that a user can only like each listing once and, if they tried to like it again, it would "unlike" the listing. This toggle between liking and unliking took some time to implement and required help from outside resources. I also added a heart icon next to the likes and turned it into a button. This feature made the website look and feel more professional.

I also added to the home page so that it would dispaly the top three listings with the most number of likes on the home page. 

### kollia-myListings
In this branch, I worked on the "My Listings" page of the website. I wrote JavaScript that fetched all the listings from the database where the creator of the listings matched the user's user_id. The files I created were myListings.html, myListings.php, and myListings.js. The main code in my JavaScript aimed to fetch all listings created by the logged-in user, along with the total likes for each listing. It took some time to implement this code, but it followed a similar format to the "total likes" idea from another branch.

### kollia-editListings/kollia-editListingDelete
When I merged a previous branch, I inadvertently broke the functionality of the buttons that another group member had created. In this branch, I updated their code with the correct functionality. The error in deleting a listing occurred because the item would be removed from the listings table but not from the user_likes table. Therefore, the item was not fully deleted. To fix this, I updated the JavaScript to ensure all relevant tables in our database were checked so listings would be deleted everywhere.

Editing a listing also caused a lot of issues. Quinn started working on this issue, and when he hit a roadblock, I took over to finish it. The main issue we encountered was getting the form to save. In the end, we got it to work so that when a user clicked on the "edit" button for a listing, they were taken to a new edit form. Once the form was submitted, they were redirected back to the marketplace with the updated changes. Implementing the redirection took some time and involved troubleshooting thoroughly using the console.

The feature we were unable to implement was autofilling the edit form with the existing information. This is slightly inefficient for users since they need to re-enter all the information for the item; however, it is not a major issue for the overall site.

### kollia-dropDown
On this branch I added to the navbar so different pages from the website would be more accessible for users. I added my likes, my listings, and added a new listing to this navbar. This was a recommendation from Dr. Callahan specifically and helped make our website overall more accessible.

## Citations 
- https://chatgpt.com/
- https://www.w3schools.com/
- https://www.w3schools.com/howto/howto_js_toggle_like.asp
- https://stackoverflow.com/questions/1347461/saving-images-files-or-blobs
- https://stackoverflow.com/questions/8683528/embed-image-in-a-button-element
- https://www.w3schools.com/html/html_forms.asp
- https://www.mightyforms.com/blog/how-to-create-autofill-forms
- https://www.w3schools.com/sql/sql_create_db.asp




