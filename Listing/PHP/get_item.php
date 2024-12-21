<?php

session_start();

// Database configuration
$servername = "localhost";
$username = "phpmyadmin"; // Replace with your MySQL username
$password = "phpmyadmin"; // Replace with your MySQL password
$dbname = "rpimartDB";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Database connection failed: ' . $conn->connect_error]));
}

// Get the item ID from the URL
$item_id = isset($_GET['item_id']) ? intval($_GET['item_id']) : 0;

// Validate item_id
if ($item_id <= 0) {
    echo json_encode(['success' => false, 'message' => 'Invalid item ID']);
    exit;
}

// Fetch item details
$sql = "SELECT title, price, description FROM listings WHERE id = ?";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(['success' => false, 'message' => 'SQL prepare failed: ' . $conn->error]);
    exit;
}
$stmt->bind_param("i", $item_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $data = $result->fetch_assoc();
    echo json_encode(['success' => true, 'data' => $data]);
} else {
    echo json_encode(['success' => false, 'message' => 'Item not found']);
}

// Close the statement and connection
$stmt->close();
$conn->close();

?>
