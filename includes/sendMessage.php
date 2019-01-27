<?php
session_start();
include_once "dbh-inc.php";
if(isset($_POST['submit'])){
  $id = $_SESSION['user_id'];
  $firstName = $_SESSION['user_first'];
  $lastName = $_SESSION['user_last'];
  $lastInitial = $lastName[0];
  $otherId = mysqli_real_escape_string($conn, $_POST['other-id']);
  $message = mysqli_real_escape_string($conn, $_POST['message']);
  $sendQuery = "INSERT INTO msg_system (sender_id, recipient_id, message, msg_status) VALUES ('$id', '$otherId', '$message', 'unread');";
  $result = mysqli_query($conn, $sendQuery);
  if($result){
    if(isset($_POST['from'])){
      header("Location: ../homepage/foodbin.php?message-sent");
      exit();
    } else {
      header("Location: ../profile/profile.php?message-sent");
      exit();
    }
  }
} else {
  if(isset($_POST['from'])){
    header("Location: ../homepage/foodbin.php?message-error");
    exit();
  } else {
    header("Location: ../profile/profile.php?message-error");
    exit();
  }
}
