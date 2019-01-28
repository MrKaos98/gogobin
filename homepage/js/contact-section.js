const contactSection = {
  init(){
    this.cacheDOM();
    this.bindEvents();
  },
  cacheDOM(){
    this.contactBtn = document.getElementById("contact-btn");
    this.vertContactBtn = document.getElementById("vert-contact-btn");
    this.contactForm = document.querySelector("#contact-section form");
    this.contactSubmitBtn = document.getElementById("contact-submit-btn");
    this.sectionOffset = document.getElementById("contact-section").offsetTop - 70;
  },
  bindEvents(){
    this.contactBtn.addEventListener("click", this.scrollToSection.bind(this));
    this.contactSubmitBtn.addEventListener("click", this.contactSubmitHandler.bind(this));
    if(this.vertContactBtn){
      this.vertContactBtn.addEventListener("click", this.scrollToSection.bind(this)); 
    }
  },
  scrollToSection() {
    window.scroll({
      top: this.sectionOffset,
      left: 0,
      behavior: 'smooth'
    });
  },
  contactSubmitHandler() {
    if(headerObj.userLoggedIn.textContent != "yes"){
      e.preventDefault();
      alert("Sign in to send us a message");
    } else {
      this.contactForm.submit();
      this.contactForm.reset();
    }
  }
};

module.exports = contactSection;