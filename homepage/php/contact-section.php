<?php 
  echo "
    <section id='contact-section'>
      <div id='contact-icon-wrapper'><i class='fa fa-envelope'></i></div>
      <h2>Get in Touch</h2>
      <form action='../includes/contact.php' method='POST'>
        <div id='contact-grid'>";
          if(isset($_GET['fullname'])){
            echo "
              <div class='input-container'>
                <span class='input-heading'>FULL NAME <span class='asterik'>*</span></span>
                <input type='text' name='fullname' value='" . $_GET['fullname'] . "' maxlength='30' required='required'/>
              </div>
            ";
          } else {
            echo "
              <div class='input-container'>
                <span class='input-heading'>FULL NAME <span class='asterik'>*</span></span>
                <input type='text' name='fullname' maxlength='30' required='required'/>
              </div>
            ";
          }
          if(isset($_GET['email'])){
            echo "
              <div class='input-container'>
                <span class='input-heading'>E-MAIL <span class='asterik'>*</span></span>
                <input type='text' name='email' maxlength='50' value='" . $_GET['email'] . "' required='required'/>
              </div>
            ";
          } else {
            echo "
              <div class='input-container'>
                <span class='input-heading'>E-MAIL <span class='asterik'>*</span></span>
                <input type='text' name='email' maxlength='50' required='required'/>
              </div>
            ";
          }
          if(isset($_GET['subject'])){
            echo "
              <div class='input-container'>
                <span class='input-heading'>SUBJECT</span>
                <input type='text' name='subject' maxlength='30' value='" . $_GET['subject'] . "'/>
              </div>
            ";
          } else {
            echo "
              <div class='input-container'>
                <span class='input-heading'>SUBJECT</span>
                <input type='text' name='subject' maxlength='30'/>
              </div>
            ";
          }
          echo "</div>";
          if(isset($_GET['message'])){
            echo "
            <div class='input-container'>
              <span class='input-heading'>WHAT IS YOUR MESSAGE? <span class='asterik'>*</span></span>
              <textarea name='message' rows='8' cols='80' maxlength='500' required='required'>" . $_GET['message'] . "</textarea>
            </div>";
          } else {
            echo "
              <div class='input-container'>
                <span class='input-heading'>WHAT IS YOUR MESSAGE? <span class='asterik'>*</span></span>
                <textarea name='message' rows='8' cols='8' maxlength='500' required='required'></textarea>
              </div>
            ";
          } 
        echo "<input type='submit' name='submit' value='Send' id='contact-submit-btn'/>
      </form>
    </section>
  ";
?>
    