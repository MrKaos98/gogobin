<?php
session_start();
include_once "dbh-inc.php";
class Order {
  private $order = [];
  public function __construct($city, $address, $store, $time, $ids, $names, $amounts, $total){
    $this->order['user_id'] = $_SESSION['user_id'];
    $this->order['ids'] = $ids;
    $this->order['names'] = $names;
    $this->order['amounts'] = $amounts;
    $this->order['city'] = $city;
    $this->order['store'] = $store;
    $this->order['address'] = $address;
    $this->order['time'] = $time;
    $this->order['total'] = $total;
  }
  public function process_order(){
    $insert_order = "INSERT INTO current_orders (user_id, store_city, store_address, store_name, delivery_time, item_ids, item_names, item_amounts, order_status, order_total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'placed', ?)";
    $stmt = mysqli_stmt_init($GLOBALS['conn']);
    $stmt_prepared = mysqli_stmt_prepare($stmt, $insert_order);
    if(!$stmt_prepared){
      $this->end_process('insert err');
    } else {
      $this->bind_and_execute($stmt);
    }
  }
  public function bind_and_execute($stmt){
    mysqli_stmt_bind_param($stmt, "sssssssss", 
      $this->order['user_id'],
      $this->order['city'],
      $this->order['address'],
      $this->order['store'],      
      $this->order['time'],
      $this->order['ids'],
      $this->order['names'],
      $this->order['amounts'],
      $this->order['total']
    );
    mysqli_stmt_execute($stmt);
    echo "order placed";
  }
  public function end_process($val){
    exit($val);
  }
}
$city = mysqli_real_escape_string($GLOBALS['conn'], $_POST['city']); 
$address = mysqli_real_escape_string($GLOBALS['conn'], $_POST['address']); 
$store = mysqli_real_escape_string($GLOBALS['conn'], $_POST['store']); 
$time = mysqli_real_escape_string($GLOBALS['conn'], $_POST['time']); 
$ids = mysqli_real_escape_string($GLOBALS['conn'], $_POST['ids']);
$names = mysqli_real_escape_string($GLOBALS['conn'], $_POST['names']);
$amounts = mysqli_real_escape_string($GLOBALS['conn'], $_POST['amounts']);
$total = mysqli_real_escape_string($GLOBALS['conn'], $_POST['total']);
$newOrder = new Order($city, $address, $store, $time, $ids, $names, $amounts, $total);
$newOrder->process_order();