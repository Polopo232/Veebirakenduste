<?php
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
            <?php
            if (isset($_SESSION['roll']) && $_SESSION['roll'] === 'admin') {
                echo '<li><a href="admin.php">Admin</a></li>';
            }
            ?>
        </ul>
    </nav>

    <nav class="nav-right">
        <ul>
            <?php
            if (isset($_SESSION['tuvastamine'])) {
                $userName = isset($_SESSION['useruid']) ? $_SESSION['useruid'] : 'Konto';

                echo '<li><a href="profile.php">' . htmlspecialchars($userName) . '</a></li>';
                echo '<li><a href="logout.php">Log Välja</a></li>';
            }
            else {
                echo "<li><a href='login.php'>Logi Sisse</a></li>";
            }
            ?>
        </ul>
    </nav>
</header>