// Calculator in plain JS
// adamkaczmarek.pl

var calcPlainJS = (function(targetElement){
	
	var calcElement;
	var currentValue = 0;
	var previousValue = 0;
	var awaitingOperation = '';
	
	var init = function() {
		calcElement = document.getElementById(targetElement);
		c(calcElement);
		generateView();
		assignEvenets();
		refreshView();		
	}
	
	
	var generateView = function() {
		
		calcElement.innerHTML+='<div id="cpjsDisplay"></div>';
		html = '';

		for(btn in buttons) {
			html+= '<button class="cpjsBtn" data-cpjsType="'+buttons[btn]+'">'+buttons[btn]+'</button>';
			
		}
		calcElement.innerHTML+=html;		
		display = document.getElementById('cpjsDisplay');
		
	}
	
	var assignEvenets = function() {
		var calcBtn = document.getElementsByClassName('cpjsBtn');
		
		for(i=0; i<calcBtn.length;i++) {		
			calcBtn[i].addEventListener("click", _doAction, false);
		}
	}
	
	var refreshView = function() {
		c(currentValue);
		display.innerHTML = '<span style="opacity:0.4; font-size:10px; line-height:10px; text-aligh:left ">'+previousValue+'</span><br>'+awaitingOperation+' '+currentValue;
	}
	
	var _doAction = function(element) {
		eval(actions[this.getAttribute("data-cpjsType")].action);
		c(actions[this.getAttribute("data-cpjsType")].action);
		
		refreshView();
	}
	
	var appendDigit = function(value){		
		if(awaitingOperation!='') {
			doOperation(awaitingOperation,value);
		} else {
			if(currentValue==0) {
				currentValue = value;
			}  else {
				currentValue+=''+value;
			}
		}
	}
	
	var doOperation = function(operation,value){
		c('Operation: '+operation);
		switch(operation) {
			case '+':
				previousValue+=currentValue+value;
				currentValue=0;
				awaitingOperation = '';
				c('+');
			break;
			case '-':
				previousValue+=currentValue-value;
				currentValue=0;
				awaitingOperation = '';
				c('-');
			break;
		}
	}
	
	

	
	var buttons = ['C','CE','<<','7','8','9','+','4','5','6','-','1','2','3','/','0',',','=','x'];
			
	
	var actions = {
			'9':{'action':"{appendDigit(9);}"},
			'8':{'action':"{appendDigit(8);}"},
			'7':{'action':"{appendDigit(7);}"},
			'6':{'action':"{appendDigit(6);}"},
			'5':{'action':"{appendDigit(5);}"},
			'4':{'action':"{appendDigit(4);}"},
			'3':{'action':"{appendDigit(3);}"},
			'2':{'action':"{appendDigit(2);}"},
			'1':{'action':"{appendDigit(1);}"},
			'0':{'action':"{appendDigit(0);}"},
			',':{'action':"{if(currentValue.toString().indexOf('.')<0) currentValue=currentValue+'.'}"},
			'<<':{'action':"{if(currentValue.length>1) {currentValue=currentValue.substring(0,currentValue.length-1)} else currentValue=0;}"},
			'CE':{'action':"{currentValue=0;awaitingOperation=''}"},
			'C':{'action':"{currentValue=0;previousValue=0;awaitingOperation=''}"},
			'+':{'action':"{awaitingOperation = '+'}"},
			'-':{'action':"{awaitingOperation = '-'}"},
			'=':{'action':"{doOperation();}"}
	};
	
	
	init();
	
	
	
});


function c(l) {
	console.log(l);
}