<?php
  echo "
    <div id='cart-window'></div>
    <section id='cart-wrap'>
      <div id='close-cart-btn'>
        <div></div> 
        <div></div>
      </div>
      <h3 id='cart-heading'>Shopping Cart</h3>
      <div id='cart-line'></div>
      <p id='no-groceries-added'>Your shopping cart is empty.</p>
      <ul id='cart-items-wrap'></ul>
      <ul id='location-and-time-container'>
        <li id='cart-location'></li>
        <li id='cart-store-name'></li>
        <li id='cart-store-address'></li>
        <li id='cart-delivery-time'></li>
      </ul>
      <div id='cart-calculate-wrap'>
        <p><b>Items Total</b>: &nbsp; <span id='items-total'></span></p>
        <p><b>Delivery Fee</b>: &nbsp; <span id='delivery-fee'>$4.99</span></p>
        <p><b>Cost / Mile</b>: &nbsp; <span id='cpm-fee'>$0.85</span></p>
        <p><b>Total</b>: &nbsp; <span id='cart-total'></span></p>
      </div>
      <button type='button' id='place-order-btn'>Place Order</button>
    </section>
  ";
?>