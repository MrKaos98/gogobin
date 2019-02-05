<?php
  echo "
  <section id='user-map-area'>
    <div id='user-location-section'>
      <div id='user-location-inputs'>
        <h3>Choose a Location</h3>
        <div id='input-container'>
          <div id='marker-input-container'>
            <span><i class='fa fa-map-marker'></i></span>
            <input type='text' id='location-input-field' placeholder='city, state' autocomplete='off' required='required' />
          </div>
          <div id='search-case-list'>
              <ul id='city-list'>
                  <li>Sacramento, CA</li>
                  <li>San Francisco, CA</li>
                  <li>Oakland, CA</li>
                  <li>San Diego, CA</li>
                  <li>Fremont, CA</li>
                  <li>Berkeley, CA</li>
                  <li>Stockton, CA</li>
                  <li>San Jose, CA</li>
                  <li>Los Angeles, CA</li>
                  <li>Santa Barbara, CA</li>
                  <li>Riverside, CA</li>
                  <li>Long Beach, CA</li>
                  <li>Anaheim, CA</li>
                  <li>Irvine, CA</li>
              </ul>
            </div>";
             include_once "city-store-list.php";

          echo "
              <select name='delivery-time' id='delivery-time-list'>
              <option style='font-weight: bold' value='Stores Heading'>Delivery Time:</option>
              <option value='eight-am'>8:00 AM</option>
              <option value='nine-am'>9:00 AM</option>
              <option value='ten-am'>10:00 AM</option>
              <option value='eleven-am'>11:00 AM</option>
              <option value='twelve-pm'>12:00 PM</option>
              <option value='one-pm'>1:00 PM</option>
              <option value='two-pm'>2:00 PM</option>
              <option value='three-pm'>3:00 PM</option>
              <option value='four-pm'>4:00 PM</option>
              <option value='five-pm'>5:00 PM</option>
              <option value='six-pm'>6:00 PM</option>
              <option value='seven-pm'>7:00 PM</option>
              <option value='eight-pm'>8:00 PM</option>
              <option value='nine-pm'>9:00 PM</option>
              <option value='ten-pm'>10:00 PM</option>
              <option value='eleven-pm'>11:00 PM</option>
            </select>
            <div id='start-order-container'>
              <span id='checkmark'>&#10004;</span>
              <input type='button' id='start-order-btn' value='Ready'/>
              <p id='map-section-error-msg'>Must choose a city and store for delivery</p>
            </div>
          </div>
        </div>
      </div>
      <div id='map-container'>
        <div id='map'></div>
      </div>
    </section>
    <form action='../includes/setAddress.php' method='POST' id='address-form' hidden>
      <input type='text' id='store-address' name='store-address'>
      <input type='submit' name='submit' id='address-submit-btn'>
    </form>
  ";
?>