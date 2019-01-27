<?php
  session_start();
  include_once "../includes/dbh-inc.php";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta property="description" content="Gogobin is an online food service that lets you connect with grocery shoppers who can deliver your groceries">
    <link rel="stylesheet" href="css/gogobin.css">
    <link rel='stylesheet' href="css/header.css">
    <link rel="stylesheet" href="css/banner.css">
    <link rel='stylesheet' href="css/how-section.css">
    <link rel="stylesheet" href="css/map-section.css">
    <link rel='stylesheet' href="css/food-area.css">
    <link rel="stylesheet" href="css/contact.css">
    <link rel='stylesheet' href="css/footer.css">
    <link rel="stylesheet" href="css/login-wrapper.css">
    <link rel='stylesheet' href="css/item-modal.css">
    <link rel="stylesheet" href="css/noti-modal.css">
    <link rel='stylesheet' href="css/convo-modal.css">
    <link rel="stylesheet" href="css/deliveries-modal.css">
    <link rel='stylesheet' href="css/store-modal.css">
    <link rel="stylesheet" href="css/cart-modal.css">
    <link href="https://fonts.googleapis.com/css?family=Lobster|Ubuntu" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="shortcut icon" href="../img/favicon.ico" type="image/icon"> 
    <title>Gogobin</title>
</head>
<body>

    <?php 
      include_once "php/header-section.php";
      include_once "php/login-wrapper.php";
      include_once "php/user-menu.php";
      include_once "php/banner-section.php";
      include_once "php/how-section.php";
      include_once "php/map-section.php";
      include_once "php/food-section.php";
      include_once "php/contact-section.php";
      include_once "php/footer-section.php";
      include_once "php/item-temp.php";
      include_once "php/cart-row-template.php";
      include_once "php/cart-window.php";
      include_once "php/orders-section.php";
      include_once "php/notis-section.php";
      include_once "php/convos-section.php";
      include_once "php/deliveries-section.php";
    ?>



  
    <?php
      if (isset($_SESSION['edit-in-progress'])){
        if($_SESSION['edit-in-progress'] == "yes"){
          echo "<span id='edit-in-progress'>yes</span>";
        } else {
          echo "<span id='edit-in-progress'>no</span>";
        }
      }
      if (isset($_SESSION['same-order-in-progress'])){
        if($_SESSION['same-order-in-progress'] == "yes"){
          echo "<span id='same-order-in-progress'>yes</span>";
        } else {
          echo "<span id='same-order-in-progress'>no</span>";
        }
      }
    ?>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script type="text/javascript" src="js/main.js"></script>
  <script type="text/javascript" src="js/login-section.js"></script>
  <script type="text/javascript" src="js/banner-section.js"></script>
  <script type="text/javascript" src="js/how-section.js"></script>
  <script type="text/javascript" src="js/notis-section.js"></script>
  <script type="text/javascript" src="js/deliveries-section.js"></script>
  <script type="text/javascript" src="js/orders-section.js"></script>
  <script type="text/javascript" src="js/convos-section.js"></script>
  <script type="text/javascript" src="js/food-section.js"></script>
  <script type="text/javascript" src="js/contact-section.js"></script>
  <script type="text/javascript" src="js/footer-section.js"></script>
  <!-- <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDrQVQzF7VuwHhRVfm7OykRl2puiMMGjEI&callback=initializeMap"></script> -->

</body>
</html>