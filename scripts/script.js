var setCanvasSizes = function() {
  var canvases = $("canvas");
  for (var i = 0; i < canvases.length; i++) {
    var $parent = $(canvases[i]).parent();
    var currCanvas = $(canvases[i])[0];
    currCanvas.width = $parent.width();
    currCanvas.height = $parent.height();
  }
} 
var drawHorizontalLine = function(ctx, startX, endX, yPos, callback) {
  var amt = 0;
  var increment = 3;
  var drawLine;
  if (endX - startX < 0) {
    increment = increment * -1;
  }
  drawLine = setInterval(function() {
    amt += increment;
    ctx.lineTo(startX + amt, yPos);
    ctx.stroke();
    if ((startX - endX >= 0 && startX + amt - 0.5 <= endX) || (startX - endX <= 0 && startX + amt + 0.5 >= endX)) {
      ctx.lineTo(endX, yPos);
      clearInterval(drawLine);
      if (callback) {
       callback();
    }
    }
  }, 6);
};
var drawVerticalLine = function(ctx, startY, endY, xPos, callback) {
  var amt = 0;
  var increment = 3;
  var drawLine;
  if (endY - startY < 0) {
    increment = increment * -1;
  }
  drawLine = setInterval(function() {
    amt += increment;
    ctx.lineTo(xPos, startY + amt);
    ctx.stroke();
    if ((startY - endY >= 0 && startY + amt - 0.5 <= endY) || (startY - endY <= 0 && startY + amt + 0.5 >= endY)) {
      ctx.lineTo(xPos, endY);
      clearInterval(drawLine);
      if (callback) {
        callback();
      }
    }
  }, 6);
};


var drawLine1Static = function() {
  var canvas1 = $('#canvas1')[0];
  var line1 = canvas1.getContext('2d');
  var startX = Math.floor($('#stage1 p').width()/2) + 0.5;
  var startY = 0;
  var endY = Math.floor(canvas1.height/2) + 0.5;
  var endX = canvas1.width;
  line1.moveTo(startX, 0);
  line1.lineTo(startX, endY);
  line1.lineTo(endX, endY);
  line1.stroke();
}
var drawLine1Animated = function(callback) {
  var canvas1 = $('#canvas1')[0];
  var line1 = canvas1.getContext('2d');
  var startX = Math.floor($('#stage1 p').width()/2) + 0.5;
  var startY = 0;
  var endY = Math.floor(canvas1.height/2) + 0.5;
  line1.moveTo(startX,0);
  var endX = Math.floor(canvas1.width);
  var nextLine = function() {
    drawHorizontalLine(line1, startX, endX, endY, callback);
  }
  drawVerticalLine(line1, startY, endY, startX, nextLine);
}



var drawLine2Static = function() {
  var canvas2 = $('#canvas2')[0];
  var line2 = canvas2.getContext('2d');
  var startX = Math.floor(canvas2.width - $('#stage2 p').width()/2) + 0.5;
  var startY = 0;
  var endY = Math.floor(canvas2.height/2) + 0.5;
  var endX = 0;
  line2.moveTo(startX, 0);
  line2.lineTo(startX, endY);
  line2.lineTo(endX, endY);
  line2.stroke();
}

var drawLine2Animated = function(callback) {
  var canvas2 = $('#canvas2')[0];
  var line2 = canvas2.getContext('2d');
  var startX = Math.floor(canvas2.width - $('#stage2 p').width()/2) + 0.5;
  var startY = 0;
  var endY = Math.floor(canvas2.height/2) + 0.5;
  var endX = 0;
  line2.moveTo(startX, 0);
  var nextLine = function() {
    drawHorizontalLine(line2, startX, endX, endY, callback);
  }
  drawVerticalLine(line2, startY, endY, startX, nextLine);
}


var drawLine3Static = function() {
  var canvas3 = $('#canvas3')[0];
  var line3 = canvas3.getContext('2d');
  var startX = Math.floor($('#stage3 p').width()/2) + 0.5;
  var startY = 0;
  var midY = Math.floor(canvas3.height/2) + 0.5;
  var midX = Math.floor( $('#stage4 h2').offset().left) + 0.5;
  var endY = canvas3.height;
  line3.moveTo(startX, startY);
  line3.lineTo(startX, midY);
  line3.lineTo(midX, midY);
  line3.lineTo(midX, endY);
  line3.stroke();
}

var drawLine3Animated = function(callback) {
  var canvas3 = $('#canvas3')[0];
  var line3 = canvas3.getContext('2d');
  var startX = Math.floor($('#stage3 p').width()/2) + 0.5;
  var startY = 0;
  var midY = Math.floor(canvas3.height/2) + 0.5;
  var midX = Math.floor( $('#stage4 h2').offset().left) + 0.5;
  var endY = canvas3.height;
  var drawLastLine = function() {
    drawVerticalLine(line3, midY, endY, midX, callback);
  }
  var drawSecondLine = function() {
    drawHorizontalLine(line3, startX, midX, midY, drawLastLine);
  }
  drawVerticalLine(line3, startY, midY, startX, drawSecondLine);
}

var animateStage2 = function() {
  drawLine1Animated(function() {});
  $('#stage2').velocity({opacity:1}, {delay:100, duration: 300});
  
}

var animateStage3 = function() {
  drawLine2Animated(function() { $('#stage3').velocity({opacity:1}, {delay:100, duration: 300});});
  
}

var animateStage4 = function() {
  drawLine3Animated(function() { $('#stage4').velocity({opacity:1}, {delay:100, duration: 300});});
  
}

var showBubble = function(element) {
  element.removeClass('hidden');
  $.Velocity.hook(element, "scaleX", "0");
  $.Velocity.hook(element, "scaleY", "0");
  element.velocity({scaleX: 1, scaleY: 1}, {easing: [0.175, 0.885, 0.32, 1.275], duration: 250});
}
var cameIntoView = function(element, amount) {
  return element.css('opacity') == 0 && $(window).innerHeight() - element.height()*amount >= element[0].getBoundingClientRect().top;
};
$(document).ready(function() {
  setCanvasSizes();
  $(window).resize(function() {
    setCanvasSizes();
    drawLine1Static();
    drawLine2Static();
    drawLine3Static();
  });
  $(window).scroll(function() {
    amount = $(document).scrollTop()/100;
    $("#blurb").css({"-webkit-filter": "blur("+amount+"px)","-moz-filter": "blur("+amount+"px)","filter": "blur("+amount+"px)" });
    $("#hero-background").css({"-webkit-filter": "blur("+amount+"px)","-moz-filter": "blur("+amount+"px)","filter": "blur("+amount+"px)" });
    if (cameIntoView($('.results'), 1/3)) {
      $('.results').velocity('fadeIn', {duration: 1400});
    } else if (cameIntoView($('.overview-section'), 1/3)) {
      $('.overview-section').velocity({opacity: 1});
      
      $.Velocity.hook($('.overview-section img'), "translateY", '100%');
      $.Velocity.hook($('.description'), "translateY", '100%');
      $('.overview-section img').velocity({translateY: 0}, {duration: 1100, easing: 'EaseInOutQuart'});
      $('.description').velocity({translateY:0}, {duration: 800, easing: 'EaseInOutQuart'});
    } else if (cameIntoView($('.how-it-works'), 1/8)) {
      $('.how-it-works').velocity({opacity: 1});
    } else if (cameIntoView($('#line1'),1/3)) {
        $('#line1').css({opacity:1});
        $('#line1').velocity("scroll", {offset: -1 * $('#stage1').height(), complete: function() {animateStage2()}});
    } else if (cameIntoView($('#line2'), 1/2)) {
        $('#line2').removeClass('hidden');
        $('#line2').velocity("scroll", {offset: -1 * $('#stage2').height(), complete: function() {animateStage3()}});
    } else if (cameIntoView($('#line3'), 1/2)) {
       $('#line3').removeClass('hidden');
       $('#line3').velocity("scroll", {offset: -1 * $('#stage3 p').height(), complete: function() {animateStage4()}});
    }

    for (var i = 0; i < $('.bubble').length; i++) {
      if (cameIntoView($($('.bubble')[i]), 1/2)) {
        showBubble($($('.bubble')[i]));
      }
    }      
  });

});