<?php
global $yhendus;

if (isset($_POST['submit'])) {

    $username = $_POST['uid'];
    $password = $_POST['pwd'];

    require_once '../config0.php';
    require_once 'functions.inc.php';

    if (emptyInputLogin($username, $password)) {
        header("location: ../login.php?error=emptyinput");
        exit();
    }

    loginUser($yhendus, $username, $password);
}
else {
    header("location: ../login.php");
    exit();
}
