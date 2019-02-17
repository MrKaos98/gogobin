<?php
session_start();
include_once "dbh-inc.php";

class OrderCheck {
  public $user = [];
  public function __construct($id){
    $this->user['id'] = $id;
  }
  public function check_current_orders(){
    $current_order = "SELECT order_status FROM current_orders WHERE user_id = ?";
    $stmt = mysqli_stmt_init($GLOBALS['conn']);
    $stmt_prepared = mysqli_stmt_prepare($stmt, $current_order);
    if(!$stmt_prepared){
      $this->end_process("check error");
    } else {
      $this->bind_and_execute($stmt);
    }
  }
  public function bind_and_execute($stmt){
    mysqli_stmt_bind_param($stmt, "s", $this->user['id']);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $num_rows = mysqli_num_rows($result);
    $data = mysqli_fetch_array($result);
    if($num_rows === 0){
      $this->end_process("ready to order");
    } else {
      $this->end_process($data['order_status']);
    }
  }
  public function end_process($val){
    exit($val);
  }
}
if(!$_SESSION['user_id']){
  echo "must log in";
} else {
  $id = $_SESSION['user_id'];
  $orderCheck = new OrderCheck($id);
  $orderCheck->check_current_orders();
}

