<?php
require("nav.php");
require("config0.php");

if (isset($_GET['code'])) {
    die(highlight_file(__FILE__, 1));
}

global $yhendus;
?>


<!DOCTYPE html>
<html lang="et">
<head>
    <meta charset="UTF-8">
    <title>Tooted lehel</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<h1>Galerii</h1>

<div class="tooted_block">
    <div class="tooted_container">
        <ul>
            <?php

            $stmt1 = $yhendus->prepare("SELECT tootedID, nimetus, photo FROM tooded");
            $stmt1->execute();
            $stmt1->bind_result($id, $nimi, $photo);

            while($stmt1->fetch()){
                echo "<li>
                        <div class='product-card'>
                        <a href='?id=$id'>
                        <img src='".htmlspecialchars($photo)."' alt='toode' class='product-img'>
                        </a>
                        </div>
                     </li>";
            }
            $stmt1->close();
            ?>
        </ul>
    </div>

    <div class="tooted_info">
        <?php
        if(isset($_REQUEST["id"])){
            $stmt1 = $yhendus->prepare("SELECT tootedID, nimetus, hind, photo, kirjeldus, linn FROM tooded WHERE tootedID = ?");
            $id = $_REQUEST["id"];
            $stmt1->bind_param("i", $id);
            $stmt1->execute();
            $stmt1->bind_result($id, $nimi, $hind, $photo, $kirjeldus, $linn);

            while($stmt1->fetch()){
                echo "<h2>$nimi</h2>";
                echo "<img src='$photo' alt='toode' class='product-img'>";
                echo "<p>$kirjeldus</p>";
                echo "<div class='price-location-container'>";
                echo "<p id='hind'>$hind €</p>";
                echo "<p id='linn'>$linn</p>";
                echo "</div>";
            }

            $stmt1->close();
        }
        ?>
    </div>
</div>

</body>
</html>

<?php $yhendus->close(); ?>
<?php
echo "<br>";
?>
