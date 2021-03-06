<?php
# - when 'Edit Order' btn is clicked
session_start();
if(isset($_POST['submit'])){
  $id = $_SESSION['user_id'];
  include_once "dbh-inc.php";
  $delCurrOrder = "DELETE FROM current_orders WHERE user_id=?;";
  $stmt = mysqli_stmt_init($conn);
  if(!mysqli_stmt_prepare($stmt, $delCurrOrder)){
    header("Location: ../profile.php?stmt-error");
    exit();
  } else {
    mysqli_stmt_bind_param($stmt, "s", $id);
    mysqli_stmt_execute($stmt);
  }
  $delPrevOrder = "DELETE FROM previous_orders WHERE user_id=? ORDER BY id DESC LIMIT 1;";
  $stmt2 = mysqli_stmt_init($conn);
  if(!mysqli_stmt_prepare($stmt2, $delPrevOrder)){
    header("Location: ../profile.php?stmt2-error");
    exit();
  } else {
    mysqli_stmt_bind_param($stmt2, "s", $id);
    mysqli_stmt_execute($stmt2);
  }
  $_SESSION['edit-in-progress'] = "yes";
  $_SESSION['order-in-progress'] = "no";
  $_SESSION['same-order-in-progress'] = "no";
  header("Location: ../homepage/foodbin.php?edit-in-progress");
  exit();
}
