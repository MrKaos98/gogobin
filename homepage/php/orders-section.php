<?php 
  if(isset($_SESSION['address'])){
    echo "
    <div id='orders-displayed' style='display: none'>yes</div>
    <div id='orders-modal-window'></div>
    <section>
      <div id='orders-modal-container'>
        <div id='orders-body'>
          <div id='close-orders-btn'>
            <span class='window-bar-one'></span>
            <span class='window-bar-two'></span>
          </div>
    ";
    $id = $_SESSION['user_id'];
    $storeAddress = $_SESSION['address'];
    $getOrders = "SELECT * FROM current_orders WHERE store_address='$storeAddress' AND order_status='1' AND 'user_id' !='$id';";
    $currData = array();
    $result = mysqli_query($conn, $getOrders);
    $resultRows = mysqli_num_rows($result);
    if($resultRows > 0){
      while($row = mysqli_fetch_assoc($result)){
        $currData[] = $row;
      }
      $currDataLength = count($currData);
      echo "
        <div class='orders-modal-header'>
          <h2 style='text-align:center'>Current Orders</h2>
          <div class='location-time-container'>
            <div class='orders-store-name' style='text-align:center' title='" . $currData[0]['store_name'] . "'>
              " . $currData[0]['store_name'] . "
            </div>
            <div class='orders-store-address' style='text-align:center'>
              " . $currData[0]['store_address'] . "
            </div>
            <div class='orders-delivery-time' style='text-align:center'>
              " . $currData[0]['delivery_time'] . "
            </div>
          </div>
        </div>
      ";
      for($a = 0; $a < $currDataLength; $a++){
        $orderId = $currData[$a]["id"];
        $ordererId = $currData[$a]['user_id'];
        $usrData = array();
        $sqlUsr = "SELECT * FROM users WHERE id=$ordererId;";
        $resultUsr = mysqli_query($conn, $sqlUsr);
        $resultRowUsr = mysqli_num_rows($resultUsr);
        if($resultRowUsr > 0){
          while($rowUsr = mysqli_fetch_assoc($resultUsr)){
            $usrData[] = $rowUsr;
          }
          $userFirstName = $usrData[0]['user_first'];
          $userLastName = $usrData[0]['user_last'];
          $lastInitial = strtoupper($userLastName[0] . ".");
        }
        echo "
          <div class='orders-accordion'>
            <div class='users-name' style='text-align:center'>
              " . ucfirst($userFirstName) . ' ' . ucfirst($lastInitial) . "
            </div>
            <div style='text-align:center'><i class='fa fa-angle-down' style='font-size:36px'></i></div>
            <div class='num-of-items' style='text-align:center'>";
            //echo $currData[0]['food_ids'];
        $foodIdsStr = $currData[$a]['food_ids'];
        $foodIdsArr = explode(" ", $foodIdsStr);
        array_pop($foodIdsArr);
        $foodIdsArrLength = count($foodIdsArr);
        echo $foodIdsArrLength . " items";

        # - item names
        $itemNamesStr = $currData[$a]['item_names'];
        $itemNamesArr = explode(" ", $itemNamesStr);
        array_pop($itemNamesArr);
        $itemNamesArrLength = count($itemNamesArr);
        # - end of item names
        echo "
            </div>
          </div>
          <div class='accordion-inner'>
            ";
            for($b = 0; $b < $itemNamesArrLength; $b++){
              echo "
                <div class='store-order-row'>
                  <div class='store-order-left'>
                    <div class='store-item-name'>" . $itemNamesArr[$b] . "</div>
                    <input type='image' src='../img/image" . $foodIdsArr[$b] . ".jpg' class='store-modal-img'/>
                  </div>
                  <div class='store-order-right'>
                    <div class='item-details-heading'>Details</div>";
                    echo "<ul>";
                    for($c = 0; $c < 4; $c++){
                      $itemSpecsStr = $currData[$a]['item_' . $foodIdsArr[$b] . '_specs'];
                      $itemSpecsArr = explode(" | ", $itemSpecsStr);
                      echo "<li>" . $itemSpecsArr[$c] . "</li>";
                    }
                    echo "</ul>";
              echo "
                  </div>
                </div>
                <div class='line-divider'></div>
              ";
            }
            $userFirst = $_SESSION['user_first'];
            $userLastArr = $_SESSION['user_last'];
            $userLastInitial = $userLastArr[0] . ".";
        echo "
          <div class='orders-deliver-container'>
            <button class='deliver-order-btn'>Deliver</button>
            <form action='../includes/offerDelivery.php' class='deliver-order-form' method='POST'>
              <input type='number' name='orderer-id' value='". $ordererId . "'/>
              <input type='text' name='message' value='". ucfirst($userFirst) ." ". ucfirst($userLastInitial) ." offered to deliver your order'/>
              <input type='submit' name='submit' class='deliver-order-submit'/>
            </form>
          </div>
          </div>
        ";
      }
    } else {
      echo "
        <h2 style='text-align: center' id='no-orders'>No orders</h2>
      ";
    }
  }
  echo "
        </div>
      </div>
    </section>
    <form action='../includes/unsetAddress.php' method='POST' id='unset-address-form' hidden>
      <input type='submit' name='submit' id='unset-address-btn'/>
    </form>
  ";
?>