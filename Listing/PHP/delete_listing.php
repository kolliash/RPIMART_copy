<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

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

// Get the item ID from the request
$item_id = $_GET['item_id'];

$conn->autocommit(false); // Start a transaction

try {
    // Delete from user_likes table
    $stmt1 = $conn->prepare("DELETE FROM user_likes WHERE listing_id = ?");
    $stmt1->bind_param("i", $item_id);

    if (!$stmt1->execute()) {
        throw new Exception("Error deleting from user_likes: " . $stmt1->error);
    }

    // Delete from listings table
    $stmt2 = $conn->prepare("DELETE FROM listings WHERE id = ?");
    $stmt2->bind_param("i", $item_id);

    if (!$stmt2->execute()) {
        throw new Exception("Error deleting from listings: " . $stmt2->error);
    }

    $conn->commit(); // Commit the transaction

    echo json_encode(["success" => true, "message" => "Record and related likes deleted successfully"]);
} catch (Exception $e) {
    $conn->rollback(); // Rollback the transaction on error
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
} finally {
    // Close the statements
    $stmt1->close();
    $stmt2->close();
    $conn->close();
}
?>
