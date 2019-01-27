<?php
  $id = $_SESSION["user_id"];
  $getEditableOrder = "SELECT * FROM edit_orders WHERE user_id=?;";
  $stmt = mysqli_stmt_init($conn);
  if(!mysqli_stmt_prepare($stmt, $getEditableOrder)){
    header("Location: ../homepage/foodbin.php?edit-stmt-error");
    exit();
  } else {
    mysqli_stmt_bind_param($stmt, "s", $id);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $resultRows = mysqli_num_rows($result);
    if($resultRows > 0){
      $editData = mysqli_fetch_all($result, MYSQLI_ASSOC);
      $foodIdsStr = $editData[0]['food_ids'];
      $foodIdsArr = explode(" ", $foodIdsStr);
      array_pop($foodIdsArr);
      $foodIdsArrLength = count($foodIdsArr);
      echo "
        <li id='shopping-cart'>
          <p id='cart-container' ver='edit-order-cart'>
            <i class='fa fa-shopping-cart' aria-hidden='true'></i>
            <span id='cart-badge' style='display:block'>" . $foodIdsArrLength . "</span>
          </p>
        </li>
      ";
    }
  }
?>              