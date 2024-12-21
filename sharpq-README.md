Quinn Sharp

9/16
Added the info for each article on the articles page. Fixed bug where navbar links on home page would not lead to the other pages. Also fixed a bug where the white box on articles.html would not display correctly by setting a rigid pixel size.

9/21
Worked on html basic html and css formating, using inserted data to represent 
the listing data. Used flexboxes to organize the page

9/26
Implemented loading from a json file using Javascript, still buggy, image will
not display properly

9/30
Fixed image display, though only temporoarily. Currently only works for downloaded images. Created html layout for the listing, no styling of note added yet.

10/18
Added navbar to the item display page

10/23
Created the marketplace page to display all listings. Wrote php and js files to get the listing data and display it properly in listing.html. Added outline for pagination box

10/24
Did final bug fixing on marketplace page, added new links to the navbar, and cleaned out old files. Added linking to individual items on the marketplace page. I couldn't figure out how to make the entire box clickable, so for right now its just the name of the item. I also started on making the individual item pages load data from the database, wrote out php and js files to fetch data based on link query, and display the data on the page.

10/25
Did some css edits to the item page and added php calls in js to display the image.

12/2
Completed delete function for listings. Essentially added js that checks the logged-in users id with the session id and if they match displays a delete button that calls a php script to delete the data from the database.

12/5
Started work on edit listings function, got borderline no where with it, all I did was create the form page with css and js-accepting fields. Could not figure out how to both auto-load item data into the fields or actually submit a change to the database. Plan to ask Ashrita to work on this, as she did the submit page and knows more about the forms.

12/6/24
Finally added api functionality into the site!! Added new addition to create a listing form: "Location" only gives user 4 options of on campus location to select for a meetup, but when chosen displays the location with a pin using google maps api on the listings page. To get it working, I essentially just added a css container to hold the map and a js file to call a php file to get the location data.

Unrelated to the map, added new tags for Buying, Selling, Renting, For Free. Did some general cleanup of pages we never actually implemented.

12/9/24
Relinked and cleaned the listing folder, condensed all css, and made sure all html and css validated.




