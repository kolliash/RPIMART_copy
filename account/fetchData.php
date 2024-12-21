<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start(); // Start the session
if (!isset($_SESSION['id'])) {
    // user is not logged in, send a response code
    http_response_code(401);
    echo json_encode(['error' => 'User not logged in']);
    exit();
}

$dbOk = false;

/* Create a new database connection object, passing in the host, username,
     password, and database to use. The "@" suppresses errors. */
$db = new mysqli('localhost', 'phpmyadmin', 'phpmyadmin', 'rpimartDB');

if ($db->connect_error) {
    echo '<div class="messages">Could not connect to the database. Error: ';
    echo $db->connect_errno . ' - ' . $db->connect_error . '</div>';
} else {
    $dbOk = true;
}

if ($dbOk) {
    $query = 'select * from users where id = ?';
    $statement = $db->prepare($query);
    $statement->bind_param("i", $_SESSION['id']);
    $statement->execute();
    $result = $statement->get_result();
    if ($result) {
        $record = $result->fetch_assoc();
        if ($record) {
            if ($record['image'] === '') {
                $record['image'] = 'defaultPFP.png';
            }
            echo json_encode($record);
        } else {
            echo json_encode(['message' => 'No results found.']);
        }
    } else {
        echo 'No results found.';
    }
    $statement->close();
    $result->free();
}


//close the db
$db->close();
?>


