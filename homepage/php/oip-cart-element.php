<?php 
  $id = $_SESSION['user_id'];
  $orderRequested = $_SESSION['order-requested-again'];
  $getPrevOrder = "SELECT * FROM previous_orders WHERE user_id=? AND id=?;";
  $stmt = mysqli_stmt_init($conn);
  if(!mysqli_stmt_prepare($stmt, $getPrevOrder)){
    header("Location: ../homepage/foodbin.php?prev-stmt-error");
    exit();
  } else {
    mysqli_stmt_bind_param($stmt, "ss", $id, $orderRequested);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $resultRows = mysqli_num_rows($result);
    if($resultRows > 0){
      $prevData = mysqli_fetch_all($result, MYSQLI_ASSOC);
      $foodIdsStr = $prevData[0]["food_ids"];
      $foodIdsArr = explode(" ", $foodIdsStr);
      array_pop($foodIdsArr);
      $foodIdsArrLength = count($foodIdsArr);
      echo "
        <li id='shopping-cart'>
          <p id='cart-container' vers='prev-order-again'>
            <i class='fa fa-shopping-cart' aria-hidden='true'></i>
            <span id='cart-badge' style='display:block'>" . $foodIdsArrLength . "</span>
          </p>
        </li>
      ";
    }
  }
?>