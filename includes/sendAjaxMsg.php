<?php
session_start();

if(isset($_POST['other-id']) && isset($_POST['message'])){
  include_once "dbh-inc.php";
  $otherId = mysqli_real_escape_string($conn, $_POST['other-id']);
  $msgContent = mysqli_real_escape_string($conn, $_POST['message']);
  $id = $_SESSION['user_id'];
  $sendMsg = "INSERT INTO msg_system (sender_id, recipient_id, msg_content, msg_status) VALUES (?, ?, ?, 'unread');";
  $stmt = mysqli_stmt_init($conn);
  if(!mysqli_stmt_prepare($stmt, $sendMsg)){
    header("Location: ../homepage/foodbin.php?stmt-error");
    exit();
  } else {
    mysqli_stmt_bind_param($stmt, "sss", $id, $otherId, $msgContent);
    mysqli_stmt_execute($stmt);
  }
} else {
  header("Location: ../homepage/foodbin.php?message-unsent");
  exit();
}