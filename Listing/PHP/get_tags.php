<?php
session_start();

$servername = "localhost";
$username = "phpmyadmin";
$password = "phpmyadmin";
$dbname = "rpimartDB";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    error_log("Connection failed: " . $conn->connect_error);
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT id, name FROM tags";
$result = $conn->query($sql);

if (!$result) {
    error_log("Query failed: " . $conn->error);
    echo json_encode(['success' => false, 'error' => $conn->error]);
    exit;
}

$tags = [];
while ($row = $result->fetch_assoc()) {
    $tags[] = $row;
}

echo json_encode(['success' => true, 'tags' => $tags]);

$conn->close();

function saveTags($conn, $listingId, $tagIds) {
    foreach ($tagIds as $tagId) {
        $sql = "INSERT INTO listing_tags (listing_id, tag_id) VALUES (?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ii", $listingId, $tagId);
        $stmt->execute();
        $stmt->close();
    }
}
?>