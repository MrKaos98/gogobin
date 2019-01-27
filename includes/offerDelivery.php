<?php
session_start();
unset($_SESSION['address']);
include_once "dbh-inc.php";
if(isset($_POST['submit'])){
  $id = $_SESSION['user_id'];
  $message = mysqli_real_escape_string($conn, $_POST['message']);
  $ordererId = mysqli_real_escape_string($conn, $_POST['orderer-id']);
  $sendQuery = "INSERT INTO notification_system (sender_id, recipient_id, message, noti_type, noti_status) VALUES ('$id', '$ordererId', '$message', 'offer', 'unread');";
  $result = mysqli_query($conn, $sendQuery);
  if($result){
    header("Location: ../homepage/foodbin.php?offer-sent");
    exit();
  }
} else {
  header("Location: ../homepage/foodbin.php?offer-error");
  exit();
}
