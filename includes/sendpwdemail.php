<?php
if(isset($_POST["submit"])){
  include_once "dbh-inc.php";
  $username = mysqli_real_escape_string($conn, $_POST["username"]);
  $email = mysqli_real_escape_string($conn, $_POST["confirm-email"]);
  $str = "abcdefghijklmnopqrstuvwxyz0123456789";
  $shuffledStr = str_shuffle($str);
  $subStr = substr($shuffledStr,0,9);
  $insertKey = "INSERT INTO users (change_key) VALUES (?);";
  $stmt = mysqli_stmt_init($conn);
  if(!mysqli_stmt_prepare($stmt, $insertKey)){
    header("Location: ../forgotpwd.php?stmt-error");
    exit();
  } else {
    mysqli_stmt_bind_param($stmt, "s", $subStr);
    mysqli_stmt_execute($stmt);
    header("Location: ../foodbin.php?email-sent");
    exit();
  }
  $emailLink = "www.gogobin.com/changepwd?key=" . $subStr;
  $msg = "To change your password click on the link below\n" . $emailLink;
  $header = "From: adminjr@gogobin.com\r\n";
  mail($email, "Change Password", $msg, $header);+
  // after person clicks link to changepwd
}
