const contactObj = {
  init: function(){
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function(){
    this.contactHeaderBtn = document.getElementById("contact-btn");
    this.vertContactBtn = document.getElementById("vert-contact-btn");
    this.contactForm = document.querySelector("#contact-section form");
    this.contactSubmitBtn = document.getElementById("contact-submit-btn");
  },
  bindEvents: function(){
    this.contactHeaderBtn.addEventListener("click", this.scrollToSection.bind(this));
    if(this.vertContactBtn) this.vertContactBtn.addEventListener("click", this.scrollToSection.bind(this));
    this.contactSubmitBtn.addEventListener("click", this.contactSubmitHandler.bind(this));
  },
  scrollToSection: function() {
    var sectionOffset = document.getElementById("contact-section").offsetTop - 70;
    window.scroll({
      top: sectionOffset,
      left: 0,
      behavior: 'smooth'
    });
  },
  contactSubmitHandler: function(){
    if(headerObj.userLoggedIn.textContent != "yes"){
      e.preventDefault();
      alert("Sign in to send us a message");
    } else {
      this.contactForm.submit();
      this.contactForm.reset();
    }
  }
}
contactObj.init();