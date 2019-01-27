<?php
session_start();
if(isset($_POST['submit'])){
  include_once "dbh-inc.php";
  $address = mysqli_real_escape_string($conn, $_POST['store-address']);
  $_SESSION['address'] = $address;
  header("Location: ../homepage/foodbin.php?address=set");
  exit();
} else {
  header("Location: ../homepage/foodbin.php?address=set-error");
  exit();
}
