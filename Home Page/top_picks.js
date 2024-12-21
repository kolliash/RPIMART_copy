async function fetchAndDisplayListings() {
    try {
        const response = await fetch('/Home Page/top_picks.php'); // Fetch top 3 listings
        const result = await response.json();

        if (result.success) {
            // Map the top listings to their respective containers
            const boxMap = {
                0: document.querySelector('#item1'), // First listing
                1: document.querySelector('#item2'), // Second listing
                2: document.querySelector('#item3'), // Third listing
            };

            // Iterate over the top 3 listings and populate their containers
            result.listings.forEach((data, index) => {
                if (boxMap[index]) {
                    boxMap[index].innerHTML = `
                        <a class="listingLink" href="Listing/listing.html?item_id=${data.id}"><div class="shine"></div>
                        <h4>${data.item_name}</h4>
                        <img src="${data.image_url}" alt="${data.item_name}" style="width:50%sa; max-height:150px; object-fit:cover; border-radius:5px;">
                        <p><strong>Price:</strong> $${data.price}</p>
                        <div style="display: flex; align-items: center; margin-top: 10px;">
                            <img src="/heart.png" alt="Like Icon" style="width: 24px; height: 24px; margin-right: 8px;">
                            <span style="font-size: 1rem; color: #6c757d;">${data.total_likes || 0}</span>
                        </div>
                        <p><em>Posted on: ${new Date(data.created_at).toLocaleDateString()}</em></p></a>
                    `;
                }
            });
        } else {
            console.error('No listings found.');
        }
    } catch (error) {
        console.error('Error fetching listings:', error);
    }
}

// Fetch and display listings when the page loads
document.addEventListener('DOMContentLoaded', fetchAndDisplayListings);
