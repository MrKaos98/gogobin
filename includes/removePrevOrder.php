<?php
# - when 'Remove Order' btn is pressed
session_start();
if(isset($_POST['submit'])){
  include_once "dbh-inc.php";
  $id = $_SESSION['user_id'];
  $orderId = mysqli_real_escape_string($conn, $_POST['num']);
  $delPrevOrder = "DELETE FROM previous_orders WHERE id=? AND user_id=?;";
  $stmt = mysqli_stmt_init($conn);
  if(!mysqli_stmt_prepare($stmt, $delPrevOrder)){
    header("Location: ../profile/profile.php?stmt-error");
    exit();
  } else {
    mysqli_stmt_bind_param($stmt, "ss", $orderId, $id);
    mysqli_stmt_execute($stmt);
  }
  header("Location: ../profile/profile.php?prev-order-removed");
  exit();
} else {
  header("Location: ../profile/profile.php?order-remove-error");
  exit();
}
