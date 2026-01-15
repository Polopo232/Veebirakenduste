<?php
global $conn;

if (isset($_POST['submit'])) {

    $username = $_POST['uid'];
    $password = $_POST['pwd'];

    require_once 'dbh.inc.php';
    require_once 'functions.inc.php';

    if (emptyInputLogin($username, $password)) {
        header("location: ../login.php?error=emptyinput");
        exit();
    }

    loginUser($conn, $username, $password);
}
else {
    header("location: ../login.php");
    exit();
}
