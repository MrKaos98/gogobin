<?php
session_start();
if(isset($_POST['submit'])){
  include_once "dbh-inc.php";
  date_default_timezone_set("America/Los_Angeles");
  $fullname = mysqli_real_escape_string($conn, $_POST['fullname']);
  $email = mysqli_real_escape_string($conn, $_POST['email']);
  $subject = mysqli_real_escape_string($conn, $_POST['subject']);
  $message = mysqli_real_escape_string($conn, $_POST['message']);
  $msg_date = date("d-m-Y", time()) . " "  . date("h:i:s a");

  if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
    header("Location: ../homepage/foodbin.php?invalid=email&fullname=$fullname&subject=$subject&message=$message");
    exit();
  } else {
    $insertQuery = "INSERT INTO user_contact (user_full, user_email, user_subject, user_msg, msg_date) VALUES (?, ?, ?, ?, ?);";
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $insertQuery)){
      header("Location: ../homepage/foodbin.php?stmt-error");
      exit();
    } else {
      mysqli_stmt_bind_param($stmt, "sssss", $fullname, $email, $subject, $message, $msg_date);
      mysqli_stmt_execute($stmt);
      header("Location: ../homepage/foodbin.php?message-sent");
      exit();
    }
  }
} else {
  header("Location: ../homepage/foodbin.php?message=error");
  exit();
}
