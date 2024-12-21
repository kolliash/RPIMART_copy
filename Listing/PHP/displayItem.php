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

// Get item_id from the GET request
$item_id = isset($_GET['item_id']) ? intval($_GET['item_id']) : null;

if ($item_id) {
    // SQL query to fetch the data, including the total_likes column
    $sql = "SELECT user_id, full_name, email, item_name, price, description, tags, location, total_likes FROM listings WHERE id = ?";

    // Prepare the statement
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $item_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Fetch data
        $data = $result->fetch_assoc();

        // Output the data as JSON
        echo json_encode($data, JSON_UNESCAPED_SLASHES);
    } else {
        // No data found for the provided item_id
        echo json_encode(["error" => "No listings found for this item."]);
    }

    $stmt->close();
} else {
    // No item_id provided in the request
    echo json_encode(["error" => "No item ID provided."]);
}

// Close the database connection
$conn->close();

?>
