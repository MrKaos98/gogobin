<?php
session_start();
include_once "dbh-inc.php";
$id = $_SESSION["user_id"];
$getNewNotis = "SELECT * FROM notification_system WHERE recipient_id=? AND noti_status='unread';";
$stmt = mysqli_stmt_init($conn);
if(!mysqli_stmt_prepare($stmt, $getNewNotis)){
  header("Location: ../homepage/foodbin.php?stmt-error");
  exit();
} else {
  mysqli_stmt_bind_param($stmt, "s", $id);
  mysqli_stmt_execute($stmt);
  $result = mysqli_stmt_get_result($stmt);
  $resultRows = mysqli_num_rows($result);
  if($resultRows > 0){
    echo "new noti";
  }
}
$checkForNewMsgs = "SELECT * FROM msg_system WHERE recipient_id=? AND msg_status='unread';";
$stmt2 = mysqli_stmt_init($conn);
if(!mysqli_stmt_prepare($stmt2, $checkForNewMsgs)){
  header("Location: ../homepage/foodbin.php?stmt2-error");
  exit();
} else {
  mysqli_stmt_bind_param($stmt2, "s", $id);
  mysqli_stmt_execute($stmt2);
  $result2 = mysqli_stmt_get_result($stmt2);
  $resultRows2 = mysqli_num_rows($result2);
  if($resultRows2 > 0){
    echo "new msg";
  }
}
