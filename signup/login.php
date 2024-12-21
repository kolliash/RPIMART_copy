<?php

session_start();

$email = htmlspecialchars(trim($_POST["email"]));
$password = htmlspecialchars(trim($_POST["password"]));
$username = "";

$db = new mysqli('localhost', 'phpmyadmin', 'phpmyadmin', 'rpimartDB');
if ($db->connect_error) {
    echo '<div class="messages">Could not connect to the database. Error: ';
    echo $db->connect_errno . ' - ' . $db->connect_error . '</div>';
} else {
    $dbOk = true;
}

if ($dbOk) {
    $insQuery = "SELECT password, id, username FROM `users` WHERE `email` = ?";
    $statement = $db->prepare($insQuery);
    $statement->bind_param("s", $email);
    $statement->execute();
    $statement->store_result();
    if ($statement->num_rows() === 0) {
        header("Location: ./?mode=login&error=Invalid email or password");
        die();
    }
    $statement->bind_result($recievedPassword, $id, $username);
    $statement->fetch();


    if (password_verify($password, $recievedPassword)) {
        $_SESSION['id'] = $id;
        $_SESSION['email'] = $email;
        $_SESSION['username'] = $username;
        header("Location: ../account/");
        exit();
    } else {
        header("Location: ./?mode=login&error=Invalid email or password");
        die();
    }
    $statement->close();
}
$db->close();

?>

