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

// Check if the request is for an image or listings
if (isset($_GET['image_id'])) {
    // Serve the image
    $id = $_GET['image_id'];

    // Fetch the image from the database
    $sql = "SELECT image FROM listings WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->bind_result($image);
    $stmt->fetch();

    if ($image) {
        header("Content-Type: image/jpeg");
        echo $image;
    } else {
        http_response_code(404);
        echo "Image not found.";
    }

    $stmt->close();
} else {
    $sql = "SELECT id, full_name, email, item_name, price, description, created_at, tags, total_likes FROM listings";

    $result = $conn->query($sql);

    $listings = [];

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $listings[] = $row;
        }
        echo json_encode(['success' => true, 'listings' => $listings]);
    } else {
        echo json_encode(['success' => false, 'message' => 'No listings found.']);
    }
}

$conn->close();
