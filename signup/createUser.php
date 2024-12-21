<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();

$code = '';
if (isset($_GET['code'])) {
    $code = $_GET['code'];
} else {
    echo "You must have a valid verification code1";
    die();
}

$db = new mysqli('localhost', 'phpmyadmin', 'phpmyadmin', 'rpimartDB');
if ($db->connect_error) {
    echo '<div class="messages">Could not connect to the database. Error: ';
    echo $db->connect_errno . ' - ' . $db->connect_error . '</div>';
    die();
} else {
    $dbOk = true;
}

$checkCodeQuery = "SELECT username, password, email FROM `pendingUsers` WHERE `validationString` = ?";
$statement = $db->prepare($checkCodeQuery);
$statement->bind_param("s", $code);
if (!$statement->execute()) {
    // Handle execution error
    echo "Error executing the query: " . $statement->error;
    die();
}
$statement->store_result();
if ($statement->num_rows() === 0) {
    echo "You must have a valid verification code";
    die();
}
$statement->bind_result($username, $password, $email);
$statement->fetch();

$insQuery = "INSERT INTO `users` (`username`, `password`, `email`, `flavor_text`, `image`) VALUES (?,?,?,?,?)";
$statement = $db->prepare($insQuery);
$flavorText = "";
$image = "";
$statement->bind_param("sssss", $username, $password, $email, $flavorText, $image);
if ($statement->execute()) {
} else {
    echo "Error inserting user: " . statement->error;
}

$delQuery = "DELETE FROM `pendingUsers` WHERE `validationString` = ?";
$statement = $db->prepare($delQuery);
$statement->bind_param("s", $code);
if (!$statement->execute()) {
    // Handle execution error
    echo "Error executing the query: " . $statement->error;
    die();
}
if ($statement->affected_rows > 0) {
    echo "Record deleted successfully.";
} else {
    echo "No record found with the given validation string.";
}
header("Location: .");

$db->close();
$statement->close();
exit();

?>

