<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();

$name = htmlspecialchars(trim($_POST["name"]));
$email = htmlspecialchars(trim($_POST["email"]));
$password = htmlspecialchars(trim($_POST["password"]));
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);
$validationString = substr(bin2hex(random_bytes(30)), 0, 30);

if (preg_match('/^[a-zA-Z]{1,6}[0-9]*@rpi\.edu$/', $email)) {
    echo "Valid email";
} else {
    echo "Invalid email";
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

$checkEmailQuery = "SELECT password, id FROM `users` WHERE `email` = ?";
$statement = $db->prepare($checkEmailQuery);
$statement->bind_param("s", $email);
$statement->execute();
$result = $statement->get_result();
if ($result->num_rows > 0) {
    header("Location: ./index.html?error=Email Used By Existing Account");
    exit();
}

$insQuery = "INSERT INTO `pendingUsers` (`username`, `password`, `email`, `validationString`) VALUES (?,?,?,?)";
$statement = $db->prepare($insQuery);
$statement->bind_param("ssss", $name, $hashedPassword, $email, $validationString);
if ($statement->execute()) {
    $subject = "Validate your email";
    $content = "Please visit https://rpimart.eastus.cloudapp.azure.com/signup/createUser.php?code={$validationString} to confirm your email.";
    $headers = "From: rpimartsec1@gmail.com";

    mail($email, $subject, $content, $headers);

    header("Location: ./?error=Check your email to validate your account");
    exit();
} else {
    echo "Error inserting user: " . statement->error;
}

$db->close();
$statement->close();

?>

