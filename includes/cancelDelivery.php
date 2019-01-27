<?php
session_start();
include_once "dbh-inc.php";
if(isset($_POST['submit'])){
 $otherId = mysqli_real_escape_string($conn, $_POST['other-id']);
 $user = mysqli_real_escape_string($conn, $_POST['user']);
 $id = $_SESSION['user_id'];
 $message = $user . " could not complete your order";
 $changeCurr = "UPDATE current_orders SET order_status='1', delivery_by='' WHERE user_id='$otherId';";
 mysqli_query($conn, $changeCurr);
 $sendMsg = "INSERT INTO notification_system (sender_id, recipient_id, message, noti_type, noti_status) VALUES ('$id', '$otherId', '$message', 'delivery-cancel', 'unread');";
 mysqli_query($conn, $sendMsg);
 if(isset($_POST['from'])){
   header("Location: ../homepage/foodbin.php?cancel-success");
   exit();
 } else {
   header("Location: ../profile/profile.php?cancel-success");
   exit();
 }
} else {
  if(isset($_POST['from'])){
    header("Location: ../homepage/foodbin.php?cancel-error");
    exit();
  } else {
    header("Location: ../profile/profile.php?cancel-error");
    exit();
  }
}
