// Get form and input elements
const listingForm = document.getElementById('listingForm');
const imageInput = document.getElementById('image');
const imagePreview = document.getElementById('imagePreview');
const listingsContainer = document.getElementById('listingsContainer');
let selectedTags = new Set();
const tagSelect = document.getElementById('tagSelect');
const selectedTagsContainer = document.getElementById('selectedTags');

// Handle image preview
imageInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        imagePreview.style.display = 'none';
    }
});

// Load predefined tags when page loads
async function loadTags() {
    try {
        console.log('Fetching tags...');
        const response = await fetch('PHP/get_tags.php');
        const result = await response.json();
        console.log('Tags result:', result);
        
        if (result.success) {
            result.tags.forEach(tag => {
                const option = new Option(tag.name, tag.id);
                tagSelect.add(option);
            });
        }
    } catch (error) {
        console.error('Error loading tags:', error);
    }
}

// Handle tag selection
tagSelect.addEventListener('change', (e) => {
    const selectedOptions = Array.from(tagSelect.selectedOptions);
    selectedOptions.forEach(option => {
        if (option.value) {
            addTag({
                id: option.value,
                name: option.text
            });
        }
    });
    // Clear all selections after processing
    tagSelect.selectedIndex = -1;
});

function addTag(tag) {
    if (!selectedTags.has(tag.id)) {
        selectedTags.add(tag.id);
        const tagElement = document.createElement('span');
        tagElement.className = 'selected-tag';
        tagElement.innerHTML = `${tag.name}<span class="remove-tag" onclick="removeTag('${tag.id}', this)">×</span>`;
        selectedTagsContainer.appendChild(tagElement);
    }
}

function removeTag(tagId, element) {
    selectedTags.delete(tagId);
    element.parentElement.remove();
    // Deselect the option
    tagSelect.value = '';
}

async function loadLocation() {
    try {
        const response = await fetch('PHP/get_locations.php');
        const result = await response.json();
        console.log('Location result:', result);
        if (result.success) {
            result.locations.forEach(location => {
                const option = new Option(location.name, location.id);
                locationSelect.add(option);
            });
        }
    }
    catch (error) {
        console.error('Error loading locations:', error);
    }
}

// Function to save listing data to PHP
async function saveListingToDatabase(formData) {
    try {
        formData.append('tags', Array.from(selectedTags));
        const locationSelect = document.getElementById('locationSelect');
        const selectedLocation = locationSelect.options[locationSelect.selectedIndex].value;
        formData.append('location', selectedLocation);
        const response = await fetch('PHP/submit_listing.php', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();

        if (result.success) {
            alert('Listing added successfully!');
            fetchAndDisplayListings();
            selectedTags.clear();
            selectedTagsContainer.innerHTML = '';
        } else {
            alert('Error adding listing: ' + result.message);
        }
    } catch (error) {
        console.error('Error saving listing data:', error);
        alert('Error submitting form. Please try again.');
    }
}

// Function to fetch and display listings
async function fetchAndDisplayListings() {
    try {
        const response = await fetch('PHP/get_listings.php');
        const result = await response.json();

        if (result.success) {
            listingsContainer.innerHTML = '';
            result.listings.forEach(displayListing);
        } else {
            listingsContainer.innerHTML = '<p>No listings found.</p>';
        }
    } catch (error) {
        console.error('Error fetching listings:', error);
        listingsContainer.innerHTML = '<p>Error loading listings.</p>';
    }
}

async function getUserInformation() {
    const response = await fetch('PHP/getUserInfo.php');
    if (response.status === 401) {
        window.location.href = '../signup/';
        return;
    }
    const result = await response.json();

    usernameText = document.getElementById('username');
    emailText = document.getElementById('email');
    usernameText.innerHTML += `${result.username}`;
    emailText.innerHTML += `${result.email}`;
}

// Function to display a listing
function displayListing(data) {
    const listingDiv = document.createElement('div');
    listingDiv.style.border = '1px solid #ccc';
    listingDiv.style.margin = '10px';
    listingDiv.style.padding = '10px';

    const imageUrl = `PHP/get_listings.php?image_id=${data.id}`;

    listingDiv.innerHTML = `
        <h3>${data.item_name}</h3>
        <p><strong>Seller:</strong> ${data.full_name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Price:</strong> $${data.price}</p>
        <p><strong>Description:</strong> ${data.description}</p>
        <img src="${imageUrl}" alt="${data.item_name}" style="width:100px; height:100px;">
    `;

    listingsContainer.appendChild(listingDiv);
}

// Handle form submission
listingForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(listingForm);
    saveListingToDatabase(formData);
    listingForm.reset();
    imagePreview.style.display = 'none';
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayListings();
    getUserInformation();
    loadTags();
    loadLocation();
});
