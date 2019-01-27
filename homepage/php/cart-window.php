<?php 
  //oip = order in progress
  //eip = edit in progress
  $editInProgressSet = isset($_SESSION["edit-in-progress"]);
  // $editInProgress = $_SESSION["edit-in-progress"];
  $orderInProgressSet = isset($_SESSION["same-order-in-progress"]);
  // $orderInProgress = $_SESSION["same-order-in-progress"];
  // if($editInProgressSet && $editInProgress == "yes"){
  //   include_once "eip-cart-section.php";
  // } else if ($orderInProgressSet && $orderInProgress == "yes"){
  //   include_once "oip-cart-section.php";
  // } else {
  //   include_once "empty-cart-section.php";
  // }
  include_once "empty-cart-section.php";
?>


