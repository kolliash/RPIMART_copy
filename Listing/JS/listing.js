// Helper function to get URL query parameters
function getQueryParameter(param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Function to fetch item data and display it on the frontend
async function fetchItemData() {
    const itemID = getQueryParameter('item_id'); // Get the item_id from the URL
    if (itemID) {
        // URL to fetch the specific item details
        const imageUrl = `PHP/get_listings.php?image_id=${itemID}`;
        fetch(`PHP/displayItem.php?item_id=${itemID}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert("Error loading data");
                } else {
                    console.log("Fetched data:", data); // Debug the fetched data

                    // Set the item details on the frontend
                    document.getElementById('itemTitle').textContent = data.item_name;
                    document.getElementById('itemPrice').textContent = '$' + data.price;
                    document.getElementById('itemDescription').textContent = data.description;

                    // Add the item image to the page
                    const image = document.createElement('img');
                    image.src = imageUrl;
                    image.alt = data.item_name;
                    image.width = 300; // Set width to 300px
                    image.height = 300; // Set height to 300px
                    document.getElementById('itemImage').appendChild(image);

                    // Add seller details
                    document.getElementById('sellerName').textContent = data.full_name;
                    document.getElementById('sellerEmail').textContent = data.email;
                    showTags(data.tags);

                    // Display total likes
                    document.getElementById('itemLikes').textContent = ` ${data.total_likes}`;

                    // Load and display the map
                    loadLocationMap(data.location);

                    // Fetch user information for permissions (edit/delete buttons)
                    fetch('PHP/getUserInfo.php')
                        .then(response => response.json())
                        .then(userInfo => {
                            if (userInfo.error) {
                                console.log("User not logged in.");
                            }
                            if (userInfo.id == data.user_id) {
                                document.getElementById('editButton').style.display = 'block';
                                document.getElementById('deleteButton').style.display = 'block';
                            }
                        })
                        .catch(error => console.error('Error fetching user info:', error));
                }
            })
            .catch(error => console.error('Error fetching item data:', error));
    } else {
        document.getElementById('itemDetails').innerHTML = "No item ID found in the URL.";
    }
}

// Function to load and display the map based on location ID
async function loadLocationMap(locationId) {
    try {
        const response = await fetch(`PHP/get_locations.php?location_id=${locationId}`);
        const data = await response.json();

        if (data.success && data.location) {
            const location = data.location;
            const lat = parseFloat(location.latitude);
            const lng = parseFloat(location.longitude);
            
            // Create the map centered on the location
            const map = new google.maps.Map(document.getElementById("map"), {
                zoom: 17,
                center: { lat: lat, lng: lng },
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            // Add a marker at the location
            const marker = new google.maps.Marker({
                position: { lat: lat, lng: lng },
                map: map,
                title: location.name
            });

            // Add an info window with the location name
            const infoWindow = new google.maps.InfoWindow({
                content: `<div style="font-weight: bold;">${location.name}</div>`
            });

            // Show info window when marker is clicked
            marker.addListener('click', () => {
                infoWindow.open(map, marker);
            });
        }
    } catch (error) {
        console.error('Error loading map:', error);
        document.getElementById('map').innerHTML = 'Error loading map location';
    }
}

function showTags(tags) {
    if (tags == "") {
        return;
    }
    let taggingNames = new Map([["1","Electronics"], ["2","Books"], ["3","Furniture"], ["4","Clothing"], ["5","Sports"], ["6","Music"], ["7","Art"], ["8","Gaming"], ["9","Home"], ["10","School Supplies"],["11","Rental"],["12","Selling"],["13","Donation"]]);
    let tagBox = document.getElementById("tags");
    let tagsArr = tags.split(",");
    for (const tag of tagsArr) {
        const tagElement = document.createElement('span');
        tagElement.className = 'tag';
        tagElement.innerHTML = taggingNames.get(tag);
        tagBox.appendChild(tagElement);
    }
}

// Function to delete the item
async function deleteItem() {
    const itemID = getQueryParameter('item_id');
    fetch(`PHP/delete_listing.php?item_id=${itemID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = "../ListingPage/index.html";
            } else {
                alert("Error deleting item: " + data.message);
            }
        })
        .catch(error => console.error('Error deleting item:', error));
}

// Function to like the item
async function likeItem() {
    const itemID = getQueryParameter('item_id');

    if (itemID) {
        fetch('PHP/update_likes.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `item_id=${itemID}`,
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    document.getElementById('itemLikes').textContent = ` ${data.total_likes}`;
                    alert(data.message);
                } else {
                    alert(data.message);
                }
            })
            .catch(error => console.error('Error:', error));
    } else {
        alert("Item ID is required.");
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const editButton = document.getElementById('editButton');

    editButton.addEventListener('click', function() {
        const itemID = getQueryParameter('item_id'); // Get the item_id from the current URL
        if (itemID) {
            // Redirect to editform.html with the specific item_id
            const editURL = `editform.html?item_id=${itemID}`;
            console.log(`Redirecting to: ${editURL}`); // Debugging log
            window.location.href = editURL;
        } else {
            alert("Item ID is missing. Cannot proceed to edit.");
            console.error("Item ID is missing in the URL."); // Log the error
        }
    });
});
// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    fetchItemData();
    
    // Add event listeners
    document.getElementById('deleteButton').addEventListener('click', deleteItem);
    document.getElementById('likeButton').addEventListener('click', likeItem);
    document.getElementById('backButton').addEventListener('click', () => {
    window.location.assign("../ListingPage/");
    });
});
