<?php
global $yhendus;
if (isset($_POST['submit'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $uid = $_POST['uid'];
    $pwd = $_POST['pwd'];
    $pwdRepeat = $_POST['pwdrepeat'];

    require_once '../config0.php';
    require_once 'functions.inc.php';

    if (emptyInputSignup($name, $email, $uid, $pwd, $pwdRepeat) !== false) {
        header("location: ../signup.php?error=emptyinput");
        exit();
    }
    if (invalidUid($uid) !== false) {
        header("location: ../signup.php?error=invaliduid");
        exit();
    }
    if (invalidEmail($email) !== false) {
        header("location: ../signup.php?error=invalidemail");
        exit();
    }
    if (pwdMatch($pwd, $pwdRepeat) !== false) {
        header("location: ../signup.php?error=passwordsdontmatch");
        exit();
    }
    if (uidExists($yhendus, $uid, $email) !== false) {
        header("location: ../signup.php?error=usernametaken");
        exit();
    }

    createdUsers($yhendus, $uid, $email, $pwd, $name);
}
else {
    header("location: ../signup.php");
    exit();
}