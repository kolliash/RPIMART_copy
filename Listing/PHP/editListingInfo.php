<?php
// Database connection settings
$servername = "localhost";
$username = "phpmyadmin";
$password = "phpmyadmin";
$dbname = "rpimartDB";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Connection failed: ' . $conn->connect_error]));
}

// Retrieve item_id from the query string
$listing_id = $_GET['item_id'] ?? null;

// Retrieve form data
$title = $_POST['title'] ?? '';
$price = $_POST['price'] ?? '';
$description = $_POST['description'] ?? '';
$tags = $_POST['tags'] ?? '';
$location = $_POST['location'] ?? '';
$image = null;

// Validate input
if (!$listing_id || empty($title) || empty($price) || empty($description)) {
    echo json_encode(['success' => false, 'message' => 'Missing required fields.']);
    exit;
}

// Handle image upload if an image is provided
if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
    $uploadDir = 'uploads/';
    $imageName = basename($_FILES['image']['name']);
    $imagePath = $uploadDir . $imageName;

    // Ensure the upload directory exists
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    if (move_uploaded_file($_FILES['image']['tmp_name'], $imagePath)) {
        $image = $imagePath;
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to upload image.']);
        exit;
    }
}

// Update the listing in the database
$sql = "UPDATE listings 
        SET title = ?, price = ?, description = ?, tags = ?, location = ?, image = COALESCE(?, image) 
        WHERE id = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $conn->error]);
    exit;
}

$stmt->bind_param("ssssssi", $title, $price, $description, $tags, $location, $image, $listing_id);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to update listing: ' . $stmt->error]);
}

// Close connection
$stmt->close();
$conn->close();
?>
