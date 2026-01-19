<?php
include('config0.php');
global $yhendus;
session_status() === PHP_SESSION_NONE ? session_start() : null;

if (isset($_SESSION['tuvastamine'])) {
    header('Location: admin.php');
    exit();
}

$error_message = "";

if (!empty($_POST['login']) && !empty($_POST['pass'])) {
    $login = htmlspecialchars(trim($_POST['login']));
    $pass = htmlspecialchars(trim($_POST['pass']));

    $sool = 'taiestisuvalinetekst';
    $kryp = crypt($pass, $sool);

    $paring = "SELECT * FROM kasutajad WHERE kasutaja='$login' AND parool='$kryp'";
    $valjund = mysqli_query($yhendus, $paring);

    $row = mysqli_fetch_assoc($valjund);

    if (mysqli_num_rows($valjund) == 1) {
        $_SESSION['tuvastamine'] = 'misiganes';
        $_SESSION['useruid'] = $row['kasutaja'];
        $_SESSION['roll'] = $row['roll'];

        header('Location: admin.php');
        exit();
    } else {
        $error_message = "Kasutaja või parool on vale!";
    }
}
require('nav.php');
?>
<link rel="stylesheet" href="style.css">

<section class="sing-form">
    <div class="signup-form-form">
        <h1>Logi sisse</h1>

        <form action="" method="post">
            <input type="text" name="login" placeholder="Kasutajanimi" required>
            <input type="password" name="pass" placeholder="Parool" required>
            <button type="submit">Logi sisse</button>
        </form>

        <?php
        if (!empty($error_message)) {
            echo '<div class="error">' . $error_message . '</div>';
        }
        ?>
    </div>
</section>