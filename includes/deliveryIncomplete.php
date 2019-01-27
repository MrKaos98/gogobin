<?php
session_start();
if(isset($_POST['submit'])){
  include_once "dbh-inc.php";
  $otherId = mysqli_real_escape_string($conn, $_POST['other-id']);
  $id = $_SESSION['user_id'];
  $first = $_SESSION['user_first'];
  $last = $_SESSION['user_last'];
  $lastInitial = ucfirst($last[0]. ".");
  $full = $first . " " . $lastInitial;
  $notiContent = $full . " said the order is not complete";
  $insert = "INSERT INTO notification_system (sender_id, recipient_id, noti_content, noti_type, noti_status) VALUES (?, ?, ?, 'delivery-incomplete', 'unread');";
  $stmt = mysqli_stmt_init($conn);
  if(!mysqli_stmt_prepare($stmt, $insert)){
    header("Location: ../homepage/foodbin.php?stmt-error");
    exit();
  } else {
    mysqli_stmt_bind_param($stmt, "sss", $id, $otherId, $notiContent);
    mysqli_stmt_execute($stmt);
    header("Location: ../homepage/foodbin.php?incomplete-sent");
    exit();
  }
} else {
  header("Location: ../homepage/foodbin.php?submit-error");
  exit();
}
