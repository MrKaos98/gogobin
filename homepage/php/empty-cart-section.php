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
      <div id='location-and-time-container'>
        <div id='cart-location'></div>
        <div id='cart-store-name'></div>
        <div id='cart-store-address'></div>
        <div id='cart-delivery-time'></div>
      </div>
      <div id='cart-cost-section'>
        <p><b>Item Total</b>: &nbsp; <span id='all-items-subtotal'>$10.95</span></p>
        <p><b>Delivery Fee</b>: &nbsp; $4.99</p>
        <p><b>Cost / Mile</b>: &nbsp; $0.85</p>
        <p><b>Total</b>: &nbsp; <span id='cart-total'>$15.79</span></p>
      </div>
      <button type='button' id='place-order-btn'>Place Order</button>
      <form action='../includes/orderfood.php' id='cart-form' method='POST'>
        <input type='text' name='store_city' />
        <input type='text' name='store_address' />
        <input type='text' name='store_name' />
        <input type='text' name='delivery_time' />
        <input type='text' name='food_ids' />
        <input type='text' name='item_names' />
        <input type='submit' name='submit' value='Submit' id='hidden-submit'/>
      </form>
    </section>
  ";
?>