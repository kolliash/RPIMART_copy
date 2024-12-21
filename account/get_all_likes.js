async function fetchAndDisplayListings() {
    try {
        // Fetch liked listings
        const response = await fetch('get_all_likes.php');
        const result = await response.json();

        const listingsContainer = document.getElementById('items-box');

        if (result.success) {
            // Clear previous listings
            listingsContainer.innerHTML = '';

            // Display each liked listing
            result.listings.forEach(displayListing);
        } else {
            listingsContainer.innerHTML = '<p>No liked listings found.</p>';
        }
    } catch (error) {
        console.error('Error fetching liked listings:', error);
        document.getElementById('items-box').innerHTML = '<p>Error loading liked listings.</p>';
    }
}

function displayListing(data) {
    const listingDiv = document.createElement('div');
    listingDiv.className = 'listing';

    // Use the listing ID to fetch the image
    const imageUrl = `get_all_likes.php?image_id=${data.id}`;

    // Populate the listing data
    listingDiv.innerHTML = `<div class="listing-item">
        <h3><a href=../Listing/listing.html?item_id=${data.id}>${data.item_name}</a></h3>
        <p><strong>Price:</strong> $${data.price}</p>
        <img src="${imageUrl}" alt="${data.item_name}" style="width:100px; height:100px;">
        <p><em>Posted on: ${new Date(data.created_at).toLocaleDateString()}</em></p>
        <p>
        <img src="heart.png" alt="Like" style="cursor: pointer; width: 24px; margin-right: 8px;">
         ${data.total_likes}
      </p>
        </div>`;
    
    // Add the listing to the container
    document.getElementById('items-box').appendChild(listingDiv);
}

// Fetch and display liked listings when the page loads
document.addEventListener('DOMContentLoaded', fetchAndDisplayListings);
