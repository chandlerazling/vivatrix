var setCanvasSizes = function() {
  var canvases = $("canvas");
  for (var i = 0; i < canvases.length; i++) {
    var $parent = $(canvases[i]).parent();
    var currCanvas = $(canvases[i])[0];
    currCanvas.width = $parent.width();
    currCanvas.height = $parent.height();
  }
} 


$(document).ready(function() {
  setCanvasSizes();
  $(window).scroll(function() {
    amount = $(document).scrollTop()/100;
    $(".hero").css({"-webkit-filter": "blur("+amount+"px)","-moz-filter": "blur("+amount+"px)","filter": "blur("+amount+"px)" })
    console.log($('.results').css('opacity')==0);
    if ($('.results').css('opacity') == 0 && $(window).scrollTop() + $(window).height() > $(".results").position().top + $('.results').outerHeight()) {
      console.log("uh?");
      $('.results').velocity('fadeIn');

  }
  });
    var canvas1 = $('#canvas1')[0];
    var line1 = canvas1.getContext('2d');
    var startX = $('#stage1 p').width()/2;
    var startY = 0;
    var endY = canvas1.height/2;
    line1.moveTo(startX,0);
    var endX = startX;
    var amount = 0;
    var yPos = 0;
      setTimeout(function() {
        console.log(yPos);
        amount += 3; 
        line1.clearRect(0, 0, canvas1.width, canvas1.height);
        line1.strokeStyle = "black";
        line1.moveTo(startX, startY);
        yPos = startY + (endY - startY) * amount;
        line1.lineTo(startX + (endX - startX) * amount, yPos);
        line1.stroke();
    }, 500);
    //line1.lineTo(xPos,yPos);
    //line1.lineTo(canvas1.width, yPos);
    //line1.lineWidth = 1;
    //line1.strokeStyle = "#F32423";


});