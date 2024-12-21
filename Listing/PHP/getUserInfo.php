<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();

if (isset($_SESSION['email'])) {
    echo json_encode(['username' => $_SESSION['username'], 'email' => $_SESSION['email'], 'id'=> $_SESSION['id']]);
} else {
    http_response_code(401);
    echo json_encode(['error' => 'User not logged in']);
    exit();
}
