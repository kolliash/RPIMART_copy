<?php
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

// Check if the request is to serve an image
if (isset($_GET['image_id'])) {
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
    $conn->close();
    exit;
}

// Fetch the top 3 listings based on total likes
$sql = "SELECT id, item_name, price, description, created_at, total_likes, image 
        FROM listings 
        ORDER BY total_likes DESC 
        LIMIT 3";
$result = $conn->query($sql);

$listings = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Add the listing details to the response array
        $listings[] = [
            'id' => $row['id'],
            'item_name' => $row['item_name'],
            'price' => $row['price'],
            'description' => $row['description'],
            'created_at' => $row['created_at'],
            'total_likes' => $row['total_likes'],
            'image_url' => "/Home Page/top_picks.php?image_id=" . $row['id'], // Image endpoint
        ];
    }
    echo json_encode(['success' => true, 'listings' => $listings]);
} else {
    echo json_encode(['success' => false, 'message' => 'No listings found.']);
}

$conn->close();
?>
