<?php
session_start();
include_once "dbh-inc.php";
if(isset($_POST['submit'])){
  $id = $_SESSION['user_id'];
  $checkOrderStatus = "SELECT * FROM current_orders WHERE user_id='$id' AND order_status='1';";
  $checkResult = mysqli_query($conn, $checkOrderStatus);
  $checkResultNum = mysqli_num_rows($checkResult);

  if($checkResultNum > 0){
    $offererId = mysqli_real_escape_string($conn, $_POST['offerer-id']);
    $notiId = mysqli_real_escape_string($conn, $_POST['noti-id']);
    $firstName = $_SESSION['user_first'];
    $lastName = $_SESSION['user_last'];
    $lastInitial = $lastName[0];
    $delQuery = "DELETE FROM notification_system WHERE recipient_id='$id' AND sender_id='$offererId' AND noti_id='$notiId';";
    mysqli_query($conn, $delQuery);
    $message = ucfirst($_SESSION['user_first']) . " " . ucfirst($lastInitial) . ". has accepted your offer";
    $sendQuery = "INSERT INTO notification_system (sender_id, recipient_id, message, noti_type, noti_status) VALUES ('$id', '$offererId', '$message', 'accept-offer', 'unread');";
    mysqli_query($conn, $sendQuery);
    $selQuery = "UPDATE current_orders SET order_status='2', delivery_by='$offererId' WHERE user_id='$id';";
    $result = mysqli_query($conn, $selQuery);
    if($result){
      header("Location: ../profile/profile.php?accept-success");
      exit();
    }
  } else {
    $offererId = mysqli_real_escape_string($conn, $_POST['offerer-id']);
    $notiId = mysqli_real_escape_string($conn, $_POST['noti-id']);
    $delQuery = "DELETE FROM notification_system WHERE recipient_id='$id' AND sender_id='$offererId' AND noti_id='$notiId';";
    mysqli_query($conn, $delQuery);
    header("Location: ../profile/profile.php?already-being-delivered");
    exit();
  }
} else {
  header("Location: ../profile/profile.php?accept-error");
  exit();
}
