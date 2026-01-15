<?php

$servername = "localhost";
$username = "loginsystem";
$password = "12345";
$dbname = "loginsystem";

$conn = new mysqli($servername, $username, $password, $dbname);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}