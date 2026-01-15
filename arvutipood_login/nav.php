<?php if (isset($_GET['code'])) {die(highlight_file(__FILE__, 1));}
session_start();
?>
<header class="header">
    <h3 class="logo">
        <a href="tervislik_lehed.php">Arvutipood</a>
    </h3>

    <nav class="nav-center">
        <ul>
            <li><a href="tervislik_lehed.php">Meist</a></li>
            <li><a href="tooted.php">Tooted</a></li>
            <li><a href="gallery.php">Galerii</a></li>
            <li><a href="index.php">Admin</a></li>
        </ul>
    </nav>

    <nav class="nav-right">
        <ul>
            <?php
            if (isset($_SESSION['userid'])) {
                echo '<li><a href="profile.php">' . $_SESSION['username'] . '</a></li>';
                echo '<li><a href="includes/logout.inc.php">Log Välja</a></li>';
            }
            else {
                echo "<li><a href='login.php'>Logi Sisse</a></li>";
                echo "<li><a href='signup.php'>Reg</a></li>";
            }
            ?>
        </ul>
    </nav>
</header>