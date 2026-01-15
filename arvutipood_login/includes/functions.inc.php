<?php

function emptyInputSignup($username, $email, $uid, $pwd, $pwdRepeat) {
    if (
        empty($username) ||
        empty($email) ||
        empty($uid) ||
        empty($pwd) ||
        empty($pwdRepeat)
    ) {
        return true;
    }
    return false;
}

function invalidUid($uid) {
    if (!preg_match("/^[a-zA-Z0-9]*$/", $uid)) {
        return true;
    }
    return false;
}
function invalidEmail($email) {
    $result;
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $result = true;
    }
    else {
        $result = false;
    }
    return $result;
}
function pwdMatch($pwd, $pwdRepeat) {
    $result;
    if ($pwd !== $pwdRepeat) {
        $result = true;
    }
    else {
        $result = false;
    }
    return $result;
}
function uidExists($yhendus, $username, $email) {
    // В SQL запросе используем usersuid (маленькая u), как в вашей базе
    $sql = "SELECT * FROM users WHERE usersuid = ? OR usersEmail = ?;";
    $stmt = mysqli_stmt_init($yhendus);

    if (!mysqli_stmt_prepare($stmt, $sql)) {
        header("location: ../signup.php?error=stmtfailed");
        exit();
    }

    mysqli_stmt_bind_param($stmt, "ss", $username, $email);
    mysqli_stmt_execute($stmt);

    $resultData = mysqli_stmt_get_result($stmt);

    // Если данные найдены, возвращаем всю строку из БД
    if ($row = mysqli_fetch_assoc($resultData)) {
        return $row;
    } else {
        return false;
    }

    mysqli_stmt_close($stmt);
}

function createdUsers($yhendus, $uid, $email, $pwd, $name) {
    // Убедитесь, что порядок столбцов совпадает: usersName, usersEmail, usersuid, usersPwd
    $sql = "INSERT INTO users (usersName, usersEmail, usersuid, usersPwd) VALUES (?, ?, ?, ?);";
    $stmt = mysqli_stmt_init($yhendus);

    if (!mysqli_stmt_prepare($stmt, $sql)) {
        header("location: ../signup.php?error=stmtfailed");
        exit();
    }

    $hashedPwd = password_hash($pwd, PASSWORD_DEFAULT);

    mysqli_stmt_bind_param($stmt, "ssss", $name, $email, $uid, $hashedPwd);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
    header("location: ../signup.php?error=none");
    exit();
}

function emptyInputLogin($username, $pwd) {
    if (
        empty($username) ||
        empty($pwd)
    ) {
        return true;
    }
    return false;
}

function loginUser($yhendus, $username, $password) {
    $uidExists = uidExists($yhendus, $username, $username);

    if ($uidExists === false) {
        header("location: ../login.php?error=wronglogin");
        exit();
    }

    $pwdHashed = $uidExists["usersPwd"];
    $checkPwd = password_verify($password, $pwdHashed);

    if ($checkPwd === false) {
        header("location: ../login.php?error=wronglogin");
        exit();
    } else if ($checkPwd === true) {
        session_start();
        // Используем точные названия из вашей базы: usersId и usersuid
        $_SESSION["userid"] = $uidExists["usersId"];
        $_SESSION["useruid"] = $uidExists["usersuid"];
        header("location: ../index.php");
        exit();
    }
}