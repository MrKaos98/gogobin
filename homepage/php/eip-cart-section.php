<?php
  $id = $_SESSION["user_id"];
  $getEditableOrder = "SELECT * FROM edit_orders WHERE user_id=?;";
  $stmt = mysqli_stmt_init($conn);
  if(!mysqli_stmt_prepare($stmt, $getEditableOrder)){
    header("Location: ../homepage/foodbin.php?edit-cart-stmt-error");
    exit();
  } else {
    mysqli_stmt_bind_param($stmt, "s", $id);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $resultRows = mysqli_num_rows($result);
    if($resultRows > 0){
      $resultData = mysqli_fetch_all($result, MYSQLI_ASSOC);
      $foodIdsStr = $editData[0]['food_ids'];
      $foodIdsArr = explode(" ", $foodIdsStr);
      array_pop($foodIdsArr);
      $foodIdsArrLength = count($foodIdsArr);
      echo "
      <h3 id='cart-modal-heading' verse='edit-order-cart'>Shopping Cart</h3>
      <div class='line-divider'></div>
      <div id='no-groceries-added' style='display:none'><p>Your shopping cart is empty.</p></div>";
      $itemNamesStr = $editData[0]['item_names'];
      $itemNamesArr = explode(" ", $itemNamesStr);
      array_pop($itemNamesArr);
      //loop through the food items and output them
      for($item = 0; $item < $foodIdsArrLength; $item++){
        echo "
          <div class='cart-row'>
            <div class='left-cart-col'>
              <h6 class='left-col-heading'>" . $itemNamesArr[$item] . "</h6>
              <div class='col-image-container'>
                <input type='image' src='../img/image" . $foodIdsArr[$item] . ".jpg' data='" . $foodIdsArr[$item] . "' class='cart-image' alt='" . $itemNamesArr[$item] . "' />
              </div>
            </div>
            <div class='right-cart-col'>
              <h6 class='right-col-heading'>Details</h6>
              <ul class='details-list'>";
              $specStr = $editData[0]['item_' . $foodIdsArr[$item] . '_specs'];
              $specsArr = explode(" | ", $specStr);
              $specsArrLength = count($specsArr);
              //loop through each line of item details
              for($x2 = 0; $x2 < $specsArrLength; $x2++){
                echo "<li>" . $specsArr[$x2] . "</li>";
              }
              //end of looping through each line of details
            echo "
              </ul>
              <div class='item-btns-container'>
                <button class='make-changes-btn' for='item-" . $foodIdsArr[$item] . "-window'>Make Changes</button>
                <button class='remove-item-btn'>Remove Item</button>
              </div>
            </div>
          </div>
          <div class='line-divider'></div>
        ";
      }
      //end of looping through food items
      echo "</div>"; # - this is cart item rows
      echo "
        <div id='hidden-form'>
          <form action='../includes/orderfood.php' id='form-inner' method='POST'>";
            echo '
            <input type="text" name="store_name" value="' . $editData[0]["store_name"] . '"/>
            <input type="text" name="store_address" value="' . $editData[0]["store_address"] . '"/>
            <input type="text" name="store_city" value="' . $editData[0]["store_city"] . '"/>
            <input type="text" name="delivery_time" value="' . $editData[0]["delivery_time"] . '"/>
            <input type="text" name="food_ids" />
            <input type="text" name="item_names" />
            ';
            for($x3 = 0; $x3 < $foodIdsArrLength; $x3++){
              echo "<input type='text' name='item_" . $foodIdsArr[$x3] . "_specs' value='" . $editData[0]['item_' . $foodIdsArr[$x3] . '_specs'] . "' data='" . $foodIdsArr[$x3] . "' class='item-spec-inputs'/>";
            }
            echo
            "<input type='submit' name='submit' value='Submit' id='hidden-submit'/>
          </form>
        </div>
      ";

      echo "
        <div id='modal-footer'>
          <div id='location-and-time-container' style='display: grid'>
            <div id='cart-location'>" . $editData[0]['store_city'] . "</div>
            <div id='cart-store-name'>" . $editData[0]['store_name'] . "</div>
            <div id='cart-store-address'>" . $editData[0]['store_address'] . "</div>
            <div id='cart-delivery-time'>" . $editData[0]['delivery_time'] . "</div>
          </div>
          <button id='place-order-btn' style='display: block'>Place Order</button>
        </div>
      ";
    }
  }
?>