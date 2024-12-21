const queryString = window.location.search;
const urlparams = new URLSearchParams(queryString);
const filters = urlparams.get('filters');
const filterArray = (filters !== null) ? filters.split(",") : [];
const itemsPerPage = 16;
let currentPage = 1;
let allListings = [];

async function fetchAndDisplayListings() {
  try {
    const response = await fetch('get_listings.php');
    const data = await response.json();
    
    if (data.success) {
      allListings = data.listings;
      showListings(currentPage);
      setupPagination();
      setupSearch();
    } else {
      document.getElementById('items-box').innerHTML = '<p>No listings found.</p>';
    }
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('items-box').innerHTML = '<p>Error loading listings.</p>';
  }
}

function setupSearch() {
  const searchInput = document.getElementById('searchInput');
  let originalListings = [...allListings];
  
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    if (!searchTerm) {
      allListings = [...originalListings];
      if (filterArray && filterArray.length > 0 && filterArray[0] !== '') {
        allListings = allListings.filter(listing => {
          if (!listing.tags) return false;
          const listingTags = listing.tags.split(",");
          return filterArray.some(filter => listingTags.includes(filter));
        });
      }
    } else {
      const filteredListings = originalListings.filter(listing => {
        return listing.item_name.toLowerCase().includes(searchTerm) || 
               listing.description.toLowerCase().includes(searchTerm);
      });
      if (filterArray && filterArray.length > 0 && filterArray[0] !== '') {
        allListings = filteredListings.filter(listing => {
          if (!listing.tags) return false;
          const listingTags = listing.tags.split(",");
          return filterArray.some(filter => listingTags.includes(filter));
        });
      } else {
        allListings = filteredListings;
      }
    }
    
    currentPage = 1;
    showListings(currentPage);
    setupPagination();
  });
}

function showListings(page) {
  const listingsContainer = document.getElementById("items-box");
  listingsContainer.innerHTML = '';
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  for (let i = startIndex; i < endIndex && i < allListings.length; i++) {
    const listing = allListings[i];

    let show = true;
    if (filterArray !== null && filterArray.length > 0 && filterArray[0] != '') {
      if (listing.tags) {
        listingFilters = listing.tags.split(",");
        show = filterArray.every(filter => listingFilters.includes(filter));
      } else {
        show = false;
      }
    }

    if (!show) {
      continue;
    }

    const listingElement = document.createElement('div');

    // Use the listing ID to fetch the image
    const imageUrl = `get_listings.php?image_id=${listing.id}`;

    // Populate the listing data
    listingElement.innerHTML = `<a id="listingLink" href=../Listing/listing.html?item_id=${listing.id}><div class="listing-item">
        <h3>${listing.item_name}</h3>
        <p><strong>Price:</strong> $${listing.price}</p>
        <img src="${imageUrl}" alt="${listing.item_name}" style="width:100px; height:100px;">
        <p><em>Posted on: ${new Date(listing.created_at).toLocaleDateString()}</em></p>

        <p>
        <img src="heart.png" alt="Like" style="cursor: pointer; width: 24px; margin-right: 8px;">
         ${listing.total_likes}
      </p>
    </div></a>`;

    // Add the listing to the container
    listingsContainer.appendChild(listingElement);
  }
}

function setupPagination() {
  const paginationContainer = document.querySelector('.pagination');
  const totalPages = Math.ceil(allListings.length / itemsPerPage);
  paginationContainer.innerHTML = '';

  // Create "Previous" button
  const prevButton = document.createElement('a');
  prevButton.href = 'javascript:void(0)';
  prevButton.innerHTML = '&laquo;';
  prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      showListings(currentPage);
      setupPagination();
    }
  });
  paginationContainer.appendChild(prevButton);

  // Create page number buttons
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('a');
    pageButton.href = 'javascript:void(0)';
    pageButton.innerText = i;

    if (i === currentPage) {
      pageButton.classList.add('active');
    }

    pageButton.addEventListener('click', () => {
      currentPage = i;
      showListings(currentPage);
      setupPagination();
    });

    paginationContainer.appendChild(pageButton);
  }

  // Create "Next" button
  const nextButton = document.createElement('a');
  nextButton.href = 'javascript:void(0)';
  nextButton.innerHTML = '&raquo;';
  nextButton.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      showListings(currentPage);
      setupPagination();
    }
  });
  paginationContainer.appendChild(nextButton);

}

// Fetch and display listings when the page loads
filterButton = document.getElementById("filterButton");
filterButton.addEventListener('click', function () {
  if (typeof (filterForm) === 'undefined' || filterForm === null) {
    filterForm = document.createElement("div");
    filterForm.innerHTML = `<form id="filterForm" action="filterItems.php" method="post">
        <div id="toggleContainer">
        <button type="button" class="toggle-btn" data-value="1" data-name="Electronics">Electronics</button>
        <button type="button" class="toggle-btn" data-value="2" data-name="Books">Books</button>
        <button type="button" class="toggle-btn" data-value="3" data-name="Furniture">Furniture</button>
        <button type="button" class="toggle-btn" data-value="4" data-name="Clothing">Clothing</button>
        <button type="button" class="toggle-btn" data-value="5" data-name="Sports">Sports</button>
        <button type="button" class="toggle-btn" data-value="6" data-name="Music">Music</button>
        <button type="button" class="toggle-btn" data-value="7" data-name="Art">Art</button>
        <button type="button" class="toggle-btn" data-value="8" data-name="Gaming">Gaming</button>
        <button type="button" class="toggle-btn" data-value="9" data-name="Home">Home</button>
        <button type="button" class="toggle-btn" data-value="10" data-name="School Supplies">School Supplies</button>
        <button type="button" class="toggle-btn" data-value="11" data-name="School Supplies">Rental</button>
        <button type="button" class="toggle-btn" data-value="12" data-name="School Supplies">Selling</button>
        <button type="button" class="toggle-btn" data-value="13" data-name="School Supplies">Donation</button>
        </div>
        <input type="hidden" name="selectedFilters" id="selectedFilters" value="">
        <button type="submit" id="filterSubmit">Submit</button></form>`;
    let filterDiv = document.getElementById("filterContainer");
    filterDiv.appendChild(filterForm);

    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const hiddenInput = document.getElementById('selectedFilters');

    toggleButtons.forEach(button => {
      button.addEventListener('click', () => {
        button.classList.toggle('active'); // Toggle active class
        updateSelectedFilters(); // Update the hidden input
      });
    });

    function updateSelectedFilters() {
      const selectedValues = Array.from(toggleButtons)
        .filter(button => button.classList.contains('active')) // Get active buttons
        .map(button => button.dataset.value); // Get their data-value attributes
      hiddenInput.value = selectedValues.join(','); // Join values with a comma
    }
  }
  else {
    filterForm.remove();
    filterForm = null;
  }
});
document.addEventListener('DOMContentLoaded', fetchAndDisplayListings);
