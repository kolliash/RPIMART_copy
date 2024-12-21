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

// Ensure the user is logged in
if (!isset($_SESSION['id'])) {
    echo json_encode(['success' => false, 'message' => 'User not logged in.']);
    exit;
}

$user_id = $_SESSION['id'];

if (isset($_GET['image_id'])) {
    // Serve the image for a specific listing
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
    // Fetch liked listings for the logged-in user along with total likes for each listing
    $sql = "
        SELECT l.id, l.user_id, l.full_name, l.email, l.item_name, l.price, l.description, l.created_at,
               (SELECT COUNT(*) FROM user_likes WHERE listing_id = l.id) AS total_likes
        FROM user_likes ul
        JOIN listings l ON ul.listing_id = l.id
        WHERE ul.user_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $listings = [];

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $listings[] = $row;
        }
        echo json_encode(['success' => true, 'listings' => $listings]);
    } else {
        echo json_encode(['success' => false, 'message' => 'No liked listings found.']);
    }

    $stmt->close();
}

$conn->close();

?>
