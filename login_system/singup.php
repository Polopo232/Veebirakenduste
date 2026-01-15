
<section class="sing-form">
    <h2>Sign Up</h2>
    <div class="signup-form-form">
        <form action="includes/signup.inc.php" method="post">
        <input type="text" name="name" placeholder="Full name...">
            <input type="text" name="email" placeholder="Email...">
            <input type="text" name="uid" placeholder="Username...">
            <input type="password" name="pwd" placeholder="Password...">
            <input type="password" name="pwdrepeat" placeholder="Repeat password...">
            <button type="submit" name="submit">Sign Up</button>
        </form>
    </div>
</section>

<?php
    if (isset($_GET['error'])) {
        if ($_GET['error'] == "emptyinput") {
            echo '<p class="error">Fill in all fields!</p>';
        }
        else if ($_GET['error'] == "invaliduid") {
            echo '<p class="error">Choose a proper username!</p>';
        }
        else if ($_GET['error'] == "invalidmail") {
            echo '<p class="error">Choose a proper email!</p>';
        }
        else if ($_GET['error'] == "passwordsdontmatch") {
            echo '<p class="error">Passwords do not match!</p>';
        }
        else if ($_GET['error'] == "stmtfailed") {
            echo '<p class="error">Something went wrong, try again!</p>';
        }
        else if ($_GET['error'] == "usernametaken") {
            echo '<p class="error">Username already taken!</p>';
        }
        else if ($_GET['error'] == "nonoe") {
            echo '<p>You have signed up!</p>';
        }
    }
?>