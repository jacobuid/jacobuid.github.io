
/*-------------------------------------------------------
Name: Countdown
Plugin: jquery.countdown.js
-------------------------------------------------------*/
function getExpiration() {
      var expiration = new Date();
            expiration.setDate(expiration.getDate() + 1);
            expiration.setHours(3, 0, 0, 0);
      return expiration;
}

function getInitialization() {
      var initialization = new Date();
            initialization.setDate(initialization.getDate());
            initialization.setHours(6, 18, 0, 0);
      return initialization;
}

function restartCountdown() {
      $('#countdown').countdown('change', {until: getExpiration()});
}


function addCountdown() {
	$('#count').countdown({until: getExpiration(), onExpiry: restartCountdown});
}


/*-------------------------------------------------------
Name: Pulse Background color
Plugin: jquery.js
-------------------------------------------------------*/

function pulsate(element) {
    $(element || this).animate({ 
		opacity: 0 
	}, 1000, function() {
        $(this).animate({
			opacity: .5 
		}, 1000,  pulsate);
    });
}


/*-------------------------------------------------------
Name: Flip Card
Plugin: jquery.flippy.js
-------------------------------------------------------*/

function flip(){
	$('#card').flippy({
		color_target: '#ebe8e4',
		duration: '400',
		verso: '<div class="pad-wrap"><hr class="top" /><aside><div id="ticket" class="left"><strong>Ticket ID:</strong><br>7FHOW6E</div></aside><aside><div id="phone" class="right"><strong>Phone no:</strong><br>1-213-454-0587</div></aside><hr/><p id="price">PRICE $ 5.00</p><p id="local">LOCAL DAY PASS</p><p id="adult">ADULT</p><img class="qrcode" src="images/qrcode.png"><a id="disclaim">Disclaimer</a></div>',
		noCSS: true,
		onStart: function(){
			$('#card').removeClass("front").addClass("back");
			$('.forward,#logo').hide();
			$('#page').removeClass('cdbg');
		},
		onFinish: function(){
			$('.reverse,#logo').show();
			$('#page').addClass('cdbg');
		},
		onReverseStart :function(){
			$('#card').removeClass("back").addClass("front");
			$('.reverse,#logo').hide();
			$('#page').removeClass('cdbg');
		},
		onReverseFinish: function(){
			$('.forward,#logo').show();
			$('#page').addClass('cdbg')
			$('#card').css('overflow','hidden');
		}
		
	});
}

function back(){
	$('#card').flippyReverse();
}




