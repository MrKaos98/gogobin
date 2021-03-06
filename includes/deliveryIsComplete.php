<?php
session_start();
if(isset($_POST['submit'])){
  include_once "dbh-inc.php";
  $id = mysqli_real_escape_string($conn, $_SESSION['user_id']);
  $notiId = mysqli_real_escape_string($conn, $_POST['noti-id']);
  $updateOrder = "UPDATE current_orders SET order_status='3' WHERE user_id=?;";
  $stmt = mysqli_stmt_init($conn);
  if(!mysqli_stmt_prepare($stmt, $updateOrder)){
    header("Location: ../homepage/foodbin.php?stmt-error");
    exit();
  } else {
    mysqli_stmt_bind_param($stmt, "s", $id);
    mysqli_stmt_execute($stmt);
  }
  $removeNoti = "DELETE FROM notification_system WHERE recipient_id=? AND noti_id=?;";
  $stmt2 = mysqli_stmt_init($conn);
  if(!mysqli_stmt_prepare($stmt2, $removeNoti)){
    header("Location: ../homepage/foodbin.php?stmt2-error");
    exit();
  } else {
    mysqli_stmt_bind_param($stmt2, "ss", $id, $notiId);
    mysqli_stmt_execute($stmt2);
    header("Location: ../homepage/foodbin.php?order-completed");
    exit();
  }
} else {
  header("Location: ../homepage/foodbin.php?submit-error");
  exit();
}