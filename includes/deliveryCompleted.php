<?php
session_start();
include_once "dbh-inc.php";
if(isset($_POST['submit'])){
 $ordererId = mysqli_real_escape_string($conn, $_POST['orderer-id']);
 $user = mysqli_real_escape_string($conn, $_POST['user']);
 $id = $_SESSION['user_id'];
 $message = "Has " . $user . " completed your order?";
 $sendMsg = "INSERT INTO notification_system (sender_id, recipient_id, message, noti_type, noti_status) VALUES ('$id', '$ordererId', '$message', 'delivery-complete', 'unread');";
 mysqli_query($conn, $sendMsg);
 if(isset($_POST['from'])){
   header("Location: ../foodbin.php?completed-sent");
   exit();
 } else {
   header("Location: ../profile.php?completed-sent");
   exit();
 }
} else {
  if(isset($_POST['from'])){
    header("Location: ../foodbin.php?completed-error");
    exit();
  } else {
    header("Location: ../profile.php?completed-error");
    exit();
  }
}
