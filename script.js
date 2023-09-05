
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim(){
  var tl = gsap.timeline();

  tl.from("#nav" ,{
    y: '-10',
    opacity:0,
    duration:1.5,
    ease:"expo.easeInOut"
  })
  .to(".boundingElem" ,{
    y:0,
    ease:Expo.easeInOut,
    duration:2,
    delay:-1,
    stagger:0.2
  })
  .from("#heroFooter",{
    y:-10,
    opacity:1,
    duration:1.5,
    delay:-1,
    ease:"exop.easeInOut"
  })
}

var timeOut;
function circleMoveSizeChange(){
  // define default scale value
  var xscale = 1;
  var yscale = 1;
  
  var xprev = 0;
  var yprev = 0;
  window.addEventListener("mousemove" , function(dets){
    this.clearTimeout(timeOut);
     var xdiff = dets.clientX - xprev;
     var ydiff = dets.clientY - yprev;

     xscale = gsap.utils.clamp(0.8 ,1.2 , xdiff);
     yscale = gsap.utils.clamp(0.8 ,1.2 , ydiff);

     xprev = dets.clientX;
     yprev = dets.clientY;
     circleMouseFollower(xscale , yscale);
     timeOut = setTimeout(function() {
      document.querySelector("#minicircle").style.transform  = `translate(${dets.x}px , ${dets.y}px) scale(1 ,1})`;
     }, 100);
  })
}

 

function circleMouseFollower (xscale , yscale){
    window.addEventListener("mousemove" , function(dets){
      document.querySelector("#minicircle").style.transform  = `translate(${dets.x}px , ${dets.y}px) scale(${xscale} ,${yscale})`;
        
    })
}
circleMoveSizeChange();
circleMouseFollower();
firstPageAnim();

/* moving a photo in the mouse with move */

document.querySelectorAll(".elem").forEach(function(elem){
  var rotate = 0;
  var diffRotate = 0;
  elem.addEventListener("mousemove" , function(details){
    var diff = details.clientY - elem.getBoundingClientRect().top;
    diffRotate = details.clientX - rotate;
    rotate = details.clientX;
    // gsap.utils.clamp(-20 ,20 ,diff)
    gsap.to(elem.querySelector("img"),{
      opacity:1,
      ease:Power3,
      top:diff,
      left:details.clientX,
      rotate:gsap.utils.clamp(-20 ,20 ,diffRotate*0.6),
    })
  })
})

document.querySelectorAll(".elem").forEach(function(elem){
  
  elem.addEventListener("mouseleave" , function(details){
    
    // gsap.utils.clamp(-20 ,20 ,diff)
    gsap.to(elem.querySelector("img"),{
      opacity:0,
      ease:Power3,
      duration:0.5,
    })
  })
})


function updateCurrentTime() {
  // Create a new Date object to get the current time
  var currentTime = new Date();

  // Get the current time in hours, minutes, and seconds
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  var seconds = currentTime.getSeconds();

  // Format the time with leading zeros if needed
  if (hours < 10) {
      hours = "0" + hours;
  }
  if (minutes < 10) {
      minutes = "0" + minutes;
  }
  if (seconds < 10) {
      seconds = "0" + seconds;
  }

  // Display the current time in the specified element
  var currentTimeElement = document.getElementById("current-time");
  currentTimeElement.textContent = hours + ":" + minutes + ":" + seconds +" AM EST";
}

// Call the updateCurrentTime function to initially display the current time
updateCurrentTime();

// Update the time every second (1000 milliseconds)
setInterval(updateCurrentTime, 1000);