<?php
include('config0.php');
global $yhendus;
session_start();

if (!isset($_SESSION['tuvastamine'])) {
    header('Location: login.php');
    exit();
}

$kasutaja = $_SESSION['useruid'];
$paring = "SELECT kasutaja, roll FROM kasutajad WHERE kasutaja = '$kasutaja'";
$valjund = mysqli_query($yhendus, $paring);
$andmed = mysqli_fetch_assoc($valjund);

require('nav.php');
?>
<!DOCTYPE html>
<html lang="et">
<head>
    <meta charset="UTF-8">
    <title>Profiil - <?php echo htmlspecialchars($andmed['kasutaja']); ?></title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<section class="sing-form">
    <div class="tooted_info" style="width: 100%; max-width: 400px; text-align: center;">
        <h1>Profiil</h1>

        <div style="margin-bottom: 20px;">
            <img src="https://png.klev.club/uploads/posts/2024-03/png-klev-club-p-chelovek-ikonka-png-3.png" alt="Avatar" style="width: 100px; height: 100px;">
        </div>

        <p><strong>Tere, <?php echo htmlspecialchars($andmed['kasutaja']); ?>!</strong></p>

        <p>Sinu roll: <u><?php echo htmlspecialchars($andmed['roll']); ?></u></p>

    </div>
</section>

</body>
</html>