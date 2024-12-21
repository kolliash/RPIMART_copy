// Function to get query parameters from the URL
function getQueryParameter(param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Load predefined tags when the page loads
async function loadTags() {
    try {
        const response = await fetch('PHP/get_tags.php');
        const result = await response.json();

        if (result.success) {
            const tagSelect = document.getElementById('tagSelect');
            result.tags.forEach(tag => {
                const option = new Option(tag.name, tag.id);
                tagSelect.add(option);
            });
        }
    } catch (error) {
        console.error('Error loading tags:', error);
    }
}

// Load predefined locations when the page loads
async function loadLocations() {
    try {
        const response = await fetch('PHP/get_locations.php');
        const result = await response.json();

        if (result.success) {
            const locationSelect = document.getElementById('locationSelect');
            result.locations.forEach(location => {
                const option = new Option(location.name, location.id);
                locationSelect.add(option);
            });
        }
    } catch (error) {
        console.error('Error loading locations:', error);
    }
}

// Handle image preview
function handleImagePreview() {
    const imageInput = document.getElementById('image');
    const imagePreview = document.getElementById('imagePreview');

    imageInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            imagePreview.style.display = 'none';
        }
    });
}

// Handle tag selection
function handleTagSelection() {
    const tagSelect = document.getElementById('tagSelect');
    const selectedTagsContainer = document.getElementById('selectedTags');
    let selectedTags = new Set();

    tagSelect.addEventListener('change', function () {
        const selectedOption = tagSelect.options[tagSelect.selectedIndex];
        if (selectedOption && !selectedTags.has(selectedOption.value)) {
            selectedTags.add(selectedOption.value);

            const tagElement = document.createElement('span');
            tagElement.className = 'selected-tag';
            tagElement.innerHTML = `${selectedOption.text}<span class="remove-tag" onclick="removeTag('${selectedOption.value}', this)">×</span>`;
            selectedTagsContainer.appendChild(tagElement);
        }

        // Clear the selection
        tagSelect.value = '';
    });

    window.removeTag = function (tagId, element) {
        selectedTags.delete(tagId);
        element.parentElement.remove();
    };

    return selectedTags;
}

// Handle form submission
async function handleFormSubmission(selectedTags) {
    const listingForm = document.getElementById('listingForm');
    listingForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        // Get the item ID from the URL
        const itemId = getQueryParameter('item_id');
        if (!itemId) {
            alert('Item ID is missing. Cannot update listing.');
            return;
        }

        const formData = new FormData(listingForm);
        formData.append('tags', Array.from(selectedTags).join(',')); // Append tags as a comma-separated string
        const selectedLocation = locationSelect.options[locationSelect.selectedIndex].value;
        formData.append('location', selectedLocation);

        try {
            const response = await fetch(`PHP/submit_edit_listing.php?item_id=${itemId}`, {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            if (result.success) {
                alert(result.message);
                window.location.href = '../ListingPage/index.html'; // Redirect to marketplace
            } else {
                alert('Error: ' + result.message);
            }
        } 
        catch (error) {
            console.error('Error submitting form :', error);
            alert('Listing edited successfully!');
           // redirect to ListingPage index.html
           //window.location.href = '../ListingPage';

        }
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
    loadTags();
    loadLocations();
    handleImagePreview();
    const selectedTags = handleTagSelection();
    handleFormSubmission(selectedTags);
});
