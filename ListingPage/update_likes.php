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

// Ensure user is logged in
if (!isset($_SESSION['id'])) {
    echo json_encode(['success' => false, 'message' => 'User not logged in.']);
    exit;
}

// Get user ID from session and item ID from POST request
$user_id = $_SESSION['id'];
$item_id = isset($_POST['item_id']) ? intval($_POST['item_id']) : null;

if (!$item_id) {
    echo json_encode(['success' => false, 'message' => 'Item ID is required.']);
    exit;
}

// Check if the user has already liked this item
$check_sql = "SELECT * FROM user_likes WHERE user_id = ? AND listing_id = ?";
$check_stmt = $conn->prepare($check_sql);
$check_stmt->bind_param("ii", $user_id, $item_id);
$check_stmt->execute();
$result = $check_stmt->get_result();

if ($result->num_rows > 0) {
    // User already liked the item, so remove the like (dislike)
    $delete_sql = "DELETE FROM user_likes WHERE user_id = ? AND listing_id = ?";
    $delete_stmt = $conn->prepare($delete_sql);
    $delete_stmt->bind_param("ii", $user_id, $item_id);

    if ($delete_stmt->execute()) {
        // Decrement total_likes in listings table
        $update_sql = "UPDATE listings SET total_likes = total_likes - 1 WHERE id = ?";
        $update_stmt = $conn->prepare($update_sql);
        $update_stmt->bind_param("i", $item_id);

        if ($update_stmt->execute()) {
            // Get the updated total likes
            $select_sql = "SELECT total_likes FROM listings WHERE id = ?";
            $select_stmt = $conn->prepare($select_sql);
            $select_stmt->bind_param("i", $item_id);
            $select_stmt->execute();
            $result = $select_stmt->get_result();

            if ($result->num_rows > 0) {
                $data = $result->fetch_assoc();
                echo json_encode(['success' => true, 'message' => 'Like removed.', 'total_likes' => $data['total_likes']]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Failed to retrieve updated likes count.']);
            }
            $select_stmt->close();
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to decrement likes in the listings table.']);
        }
        $update_stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to remove like from user_likes table.']);
    }
    $delete_stmt->close();
} else {
    // User has not liked the item, so add the like
    $insert_sql = "INSERT INTO user_likes (user_id, listing_id, liked_at) VALUES (?, ?, NOW())";
    $insert_stmt = $conn->prepare($insert_sql);
    $insert_stmt->bind_param("ii", $user_id, $item_id);

    if ($insert_stmt->execute()) {
        // Increment total_likes in listings table
        $update_sql = "UPDATE listings SET total_likes = total_likes + 1 WHERE id = ?";
        $update_stmt = $conn->prepare($update_sql);
        $update_stmt->bind_param("i", $item_id);

        if ($update_stmt->execute()) {
            // Get the updated total likes
            $select_sql = "SELECT total_likes FROM listings WHERE id = ?";
            $select_stmt = $conn->prepare($select_sql);
            $select_stmt->bind_param("i", $item_id);
            $select_stmt->execute();
            $result = $select_stmt->get_result();

            if ($result->num_rows > 0) {
                $data = $result->fetch_assoc();
                echo json_encode(['success' => true, 'message' => 'Like added successfully.', 'total_likes' => $data['total_likes']]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Failed to retrieve updated likes count.']);
            }
            $select_stmt->close();
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to increment likes in the listings table.']);
        }
        $update_stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to add like to user_likes table.']);
    }
    $insert_stmt->close();
}

$check_stmt->close();
$conn->close();
