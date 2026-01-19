<?php
session_start();

if (!isset($_SESSION['tuvastamine'])) {
    header('Location: login.php');
    exit();
}

session_destroy();
header('Location: admin.php');
exit();

?>