<?php
session_start();
if(isset($_POST['submit'])){
  include_once "dbh-inc.php";
  unset($_SESSION['address']);
  header("Location: ../homepage/foodbin.php?address=unset");
  exit();
} else {
  header("Location: ../homepage/foodbin.php?address=error");
  exit();
}
