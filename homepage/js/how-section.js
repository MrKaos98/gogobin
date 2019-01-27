// const howSectionObj = {
//   state: {
//     imageOneStyle: { status: 0 },
//     captionOneStyle: { status: 0 },
//     imageTwoStyle: { status: 0 },
//     captionTwoStyle: { status: 0 },
//     imageThreeStyle: { status: 0 },
//     captionThreeStyle: { status: 0 }
//   },
//   init: function(){
//     this.cacheDom();
//     window.addEventListener("scroll", this.getScrolledValues.bind(this));
//   },
//   cacheDom: function(){
//     this.imageOne = document.getElementById("image-one");
//     this.captionOne = document.getElementById("caption-one");
//     this.imageTwo = document.getElementById("image-two");
//     this.captionTwo= document.getElementById("caption-two");
//     this.imageThree = document.getElementById("image-three");
//     this.captionThree = document.getElementById("caption-three");
//   },
//   getScrolledValues: function(){
//     console.log("getting scrolled");
//     var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
//     if(scrollTop > 200 && this.state.imageOneStyle.status === 0){
//       this.transformImageOneHandler();
//     }
//     if(scrollTop > 275 && this.state.captionOneStyle.status === 0){
//       this.transformCaptionOneHandler();
//     }
//     if(scrollTop > 595 && this.state.imageTwoStyle.status === 0){
//       this.transformImageTwoHandler();
//     }
//     if(scrollTop > 640 && this.state.captionTwoStyle.status === 0){
//       this.transformCaptionTwoHandler();
//     }
//     if(scrollTop > 980 && this.state.imageThreeStyle.status === 0){
//       this.transformImageThreeHandler();
//     }
//     if(scrollTop > 1025 && this.state.captionThreeStyle.status === 0){
//       this.transformCaptionThreeHandler();
//       window.removeEventListener("scroll", this.getScrolledValues);
//     }
//   },
//   transformImageOneHandler: function(){
//     this.state.imageOneStyle.status = 0;
//     this.imageOne.style.transform = "translateX(0)";
//     this.imageOne.style.opacity = "1";
//   },
//   transformCaptionOneHandler: function(){
//     this.state.captionOneStyle.status = 0;
//     this.captionOne.style.transform = "translate(-50%, -50%)";
//     this.captionOne.style.opacity = "1";
//   },
//   transformImageTwoHandler: function(){
//     this.state.imageTwoStyle.status = 0;
//     this.imageTwo.style.transform = "translateX(0)";
//     this.imageTwo.style.opacity = "1";
//   },
//   transformCaptionTwoHandler: function(){
//     this.state.captionTwoStyle.status = 0;
//     this.captionTwo.style.transform = "translate(-50%, -50%)";
//     this.captionTwo.style.opacity = "1";
//   },
//   transformImageThreeHandler: function(){
//     this.state.imageThreeStyle.status = 0;
//     this.imageThree.style.transform = "translateX(0)";
//     this.imageThree.style.opacity = "1";
//   },
//   transformCaptionThreeHandler: function(){
//     this.state.captionThreeStyle.status = 0;
//     this.captionThree.style.transform = "translate(-50%, -50%)";
//     this.captionThree.style.opacity = "1";
//   }
// };
// howSectionObj.init();