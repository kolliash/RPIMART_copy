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

if(isset($_GET['location_id'])) {
    $id = $_GET['location_id'];

    $sql = "SELECT id, name, latitude, longitude FROM locations WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->bind_result($id, $name, $latitude, $longitude);
    $stmt->fetch();

    if($id) {
        echo json_encode(['success' => true, 'location' => ['id' => $id, 'name' => $name, 'latitude' => $latitude, 'longitude' => $longitude]]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Location not found.']);
    }

    $stmt->close();
    exit;
}

$sql = "SELECT id, name, latitude, longitude FROM locations";
$result = $conn->query($sql);

if(!$result) {
    error_log("Query failed: " . $conn->error);
    echo json_encode(['success' => false, 'error' => $conn->error]);
    exit;
}

$locations = [];

while($row = $result->fetch_assoc()) {
    $locations[] = $row;
}

echo json_encode(['success' => true, 'locations' => $locations]);

if(isset($_GET['location_id'])) {
    $id = $_GET['location_id'];
    $sql = "SELECT * FROM locations WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    if($row = $result->fetch_assoc()) {
        echo json_encode(['success' => true, 'location' => $row]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Location not found']);
    }
    exit;
}