<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();

$db = new mysqli("localhost", "phpmyadmin", "phpmyadmin", "rpimartDB");

$query = "SELECT * FROM `emailTimeout` WHERE user_id = ?";
$statement = $db->prepare($query);
$statement->bind_param("i", $_SESSION['id']);
$statement->execute();
$statement->bind_result($user_id, $timestamp);

if ($statement->fetch()) {
    echo "Please wait two hours between support tickets";
    die();
}

$subject = htmlspecialchars(trim($_POST["subject"]));
$content = htmlspecialchars(trim($_POST["content"]));
$headers = "From: " . $_SESSION['email'];

$subject = $_SESSION['email'] . ": " . $subject;

$content = wordwrap($content, 70);

mail("rpimartsec1@gmail.com", $subject, $content, $headers);

$query = "INSERT INTO `emailTimeout` (`user_id`, `email_timestamp`) VALUES(?, ?)";
$statement = $db->prepare($query);
$statement->bind_param("ii", $_SESSION['id'], time());
$statement->execute();

$subject = "Do Not Respond";
$content = "Hello RPIMart user. Your email has been successfully recieved by RPIMart. Thank you for your patience while we observe your ticket.";
$headers = "From: rpimartsec1@gmail.com";

mail($_SESSION['email'], $subject, $content, $headers);

header("Location: .");
die();

?>

