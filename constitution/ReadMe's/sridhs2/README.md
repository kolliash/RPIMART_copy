ITWS 2110

Swaroop Sridhar

Which files I modified:
1. index.html
2. index.css
3. history.html
4. history.css
5. articles.html
6. articles.css
7. amendments.html
8. amendments.css

<br />
<strong>
Contributions:
</strong>
<br />
For this assignment, I made a general framework of how our constitution website was going to look like stylistically. For the home page,
I specifically added a navigation bar, a banner below it, as well as added a white box where information would be displayed. On the history page, I duplicated the navigation bar. On the amendment and article pages, I duplicated the navigation bar as well as write javascript that would make it so that on the left side of the webpage, there would be options to select which article/amendment you would like to be displayed
on the right side of the page.
<br />
<br />
<strong>
Problems:
</strong>
<br />
I was having an issue where I was unable to get the white box to align the way I wanted on the left side of the page for navigation on which article/amendment the user wanted to display. It would always end up covering the entire page. The way I resolved this was prompting AI in which it used box-sizing, border-box, and overflow-y to resolve this issue. Another issue I was facing was using the javascript to implement the article/amendment selection. This was resolved with just looking over some documentation regarding how to use the event listeners as I was a bit rusty.

<br />
Citations - Websites:

1. https://www.w3schools.com/Css/css_navbar.asp
I referenced this w3schools page to determine how to display the navbar and how to connect it to other sites as I had forgotten.

2. https://www.w3schools.com/css/css3_borders.asp
I referenced this w3schools page to figure out how to curve the border of the white box I created on the home page.

3. https://www.w3schools.com/css/css_border.asp
I referenced this w3schools page to make it so that I was able to add a border of the white box I created on the home page.

4. https://www.w3schools.com/css/css_padding.asp
5. https://www.w3schools.com/css/css3_box-sizing.asp
I referenced these w3schools page because I had forgotten how to generally make a box and then pad it the way I wanted.

6. https://www.w3schools.com/html/html_images.asp
I referenced this w3schools page to remember how to add an image to the home page. Specifically the American flag banner.

7. https://www.w3schools.com/css/css3_buttons.asp
8. https://www.w3schools.com/tags/tag_button.asp
I referenced these w3school pages to remember how to add buttons to the articles and amendment pages.

9. https://www.w3schools.com/css/css3_transitions.asp
I referenced this w3schools page to add a transition of ease onto the buttons to make it more natural looking.

10. https://www.w3schools.com/css/css_positioning.asp
I referenced this w3schools page to check how to place the white box at a certain place on the page.

11. https://www.w3schools.com/jsref/met_element_addeventlistener.asp
12. https://www.w3schools.com/jsref/met_element_getattribute.asp
I referenced these w3schools pages in order to make it so when the button is clicked, it displays different information on the page.


Citations - AI Prompts and Solutions:

ChatGPT Prompt: How do I make the white box size to the borders of the page?

Changes it made to the white-box class in the home.css file:
<br />
Added: <br />
    width: 90vw; <br />
    height: 80vh;  <br />
    max-width: 2000px; <br />
    margin: 1rem auto;  <br />
    box-sizing: border-box;<br />
    overflow-y: auto;
Removed: <br />
    height: 300px; <br />
    width: 100px; <br />

I used this prompt because I was struggling in getting the white box to display properly on the left side of the page.