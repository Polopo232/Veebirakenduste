
<section class="sing-form">
    <h2>Log In</h2>
    <div class="signup-form-form">
        <form action="includes/login.inc.php" method="post">
        <input type="text" name="name" placeholder="Username/Email...">
            <input type="password" name="pwd" placeholder="Password...">
            <button type="submit" name="submit">Log In</button>
        </form>
    </div>
</section>

<?php
if (isset($_GET['error'])) {
    if ($_GET['error'] == "emptyinput") {
        echo '<p class="error">Fill in all fields!</p>';
    } else if ($_GET['error'] == "wronglogin") {
        echo '<p class="error">Incorrect login information!</p>';
    }
}
?>