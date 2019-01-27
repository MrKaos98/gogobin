<?php
if(isset($_POST["submit"])){
  include_once "dbh-inc.php";
  $email = mysqli_real_escape_string($conn, $_POST["email"]);
  $token = mysqli_real_escape_string($conn, $_POST["token"]);
  $pwd = mysqli_real_escape_string($conn, $_POST["pwd-two"]);
  $insertQuery = "INSERT INTO users (user_pwd) VALUES (?);";
  $stmt = mysqli_stmt_init($conn);
  if(!mysqli_stmt_prepare($stmt, $insertQuery)){
    header("Location: ../inputphysics.com?stmt-error");
    exit();
  } else {
    $hashedPwd = password_hash($pwd, PASSWORD_DEFAULT);
    mysqli_stmt_bind_param($stmt, "s", $hashedPwd);
    mysqli_stmt_execute($stmt);
    $updateQuery = "UPDATE users SET pwd_token='' WHERE user_email=? AND pwd_token=?;";
    $stmt2 = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $updateQuery)){
      header("Location: ../inputphysics.com?stmt2-error");
      exit();
    } else {
      mysqli_stmt_bind_param($stmt2, "s", $email, $token);
      mysqli_stmt_execute($stmt2);
      header("Location: ../inputphysics.com?pwd-changed");
      exit();
    }
  }
}
