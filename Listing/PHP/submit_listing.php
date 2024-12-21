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
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve data from the POST request
$item_name = $_POST['title'];
$price = $_POST['price'];
$description = $_POST['description'];
$created_at = date('Y-m-d H:i:s');
$tags = $_POST['tags'];
$location = $_POST['location'];

// Handle image upload as a BLOB
$imageBlob = null;
if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
    $imageTmpPath = $_FILES['image']['tmp_name'];
    $imageBlob = file_get_contents($imageTmpPath); // Read the image file as binary data
} else {
    echo json_encode(['success' => false, 'message' => 'No image uploaded or upload error.']);
    exit;
}

// Prepare and execute the SQL query
$sql = "INSERT INTO listings (user_id, full_name, email, item_name, price, description, image, created_at, tags, location, total_likes) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

$total_likes = 0; // Set the default value for total_likes

$stmt->bind_param("isssssssssi", $_SESSION['id'], $_SESSION['username'], $_SESSION['email'], $item_name, $price, $description, $imageBlob, $created_at, $tags, $location, $total_likes);

// Bind the BLOB parameter
$stmt->send_long_data(6, $imageBlob);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Listing added successfully.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
