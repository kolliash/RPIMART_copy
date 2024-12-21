<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();

$servername = "localhost";
$username = "phpmyadmin"; // Replace with your MySQL username
$password = "phpmyadmin"; // Replace with your MySQL password
$dbname = "rpimartDB";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Connection failed: ' . $conn->connect_error]));
}

// Retrieve item_id from URL
$item_id = $_GET['item_id'] ?? null;


// Retrieve data from the POST request
$item_name = $_POST['title'];
$price = $_POST['price'];
$description = $_POST['description'];
$tags = $_POST['tags'];
$location = $_POST['location'];

// Handle image upload as a BLOB
$imageBlob = null;
if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
    $imageTmpPath = $_FILES['image']['tmp_name'];
    $imageBlob = file_get_contents($imageTmpPath); // Read the image file as binary data
}

// Prepare the SQL query to update the existing listing
$sql = "UPDATE listings 
        SET item_name = ?, price = ?, description = ?, tags = ?, location = ?, image = COALESCE(?, image) 
        WHERE id = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(['success' => false, 'message' => 'Error preparing statement: ' . $conn->error]);
    exit;
}

$stmt->bind_param("ssssssi", $item_name, $price, $description, $tags, $location, $imageBlob, $item_id);

// Bind the BLOB parameter if an image is provided
if ($imageBlob) {
    $stmt->send_long_data(5, $imageBlob);
}

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Listing updated successfully.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error updating listing: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
