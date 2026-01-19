<?php

//$servername = 'localhost';
//$kasutajanimi = 'arvutipood1';
//$parool = "12345";
//$andmebaasinimi = 'arvutipood1';


//$servername = "d141133.mysql.zonevs.eu";
//$kasutajanimi = "d141133_nikitan";
//$parool = "Polopo232_";
//$andmebaasinimi = "d141133_php";


$servername = "localhost";
$username = "loginsystem";
$password = "12345";
$dbname = "loginsystem";

$yhendus = new mysqli($servername, $username, $password, $dbname);
$yhendus->set_charset("utf8");

if (!$yhendus) {
    die("Connection failed: " . mysqli_connect_error());
}


