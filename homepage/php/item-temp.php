<?php 
  echo '
    <div id="item-modal-window"></div>
    <section class="item-modal-wrapper">
      <h3></h3>
      <div id="item-modal-close-btn">
        <div></div>
        <div></div>
      </div>
      <figure><img id="img" class="item-modal-image"></figure>
      <ul>
        <li id="item-price" data-value="2.99">$1.99/lb</li>
        <li><i class="fa fa-times"></i></li>
        <li><input type="number" placeholder="amount" min="1" max="100" value="1"></li>
        <li id="amount-btns">
          <button type="button"><i class="fa fa-angle-up"></i></button>
          <button type="button"><i class="fa fa-angle-down"></i></button>
        </li>
      </ul>
      <button type="button" id="add-to-cart-btn">Add to Cart</button>
    </section>
  ';
?>