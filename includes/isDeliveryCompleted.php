<?php
session_start();
if(isset($_POST['submit'])){
 include_once "dbh-inc.php";
 $ordererId = mysqli_real_escape_string($conn, $_POST['other-id']);
 $user = mysqli_real_escape_string($conn, $_POST['user']);
 $notiContent = "Has " . $user . " completed your order?";
 $id = $_SESSION['user_id'];
 $stmt = mysqli_stmt_init($conn);
 $insertNoti = "INSERT INTO notification_system (sender_id, recipient_id, message, noti_type, noti_status) VALUES (?, ?, ?, 'delivery-complete', 'unread');";
 if(!mysqli_stmt_prepare($stmt, $insertNoti)){
  header("Location: ../homepage/foodbin.php?stmt-error");
 } else {
  mysqli_stmt_bind_param($stmt, "sss", $id, $ordererId, $notiContent);
  mysqli_stmt_execute($stmt);
  header("Location: ../homepage/foodbin.php?delivery-completed");
 }
}