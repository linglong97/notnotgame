//initialise text

var started = false;
var finished = false;
var hitCorrect = false;
var timer = 300;
var game_over = false;
var score = 0;


//start screen
var start = new PointText({
	fontFamily: 'Roboto Mono',
	fontSize: 100,
	point: [Math.floor(view.size.width/2)-660, Math.floor(view.size.height/2)-100],
	content: 'THE GAME OF CONFUSION',
	fillColor: 'white'
});

var begin = new PointText({

	point: [Math.floor(view.size.width/2)-100, Math.floor(view.size.height/2)+100],
	fillColor: 'white',
	content: 'START',
	fontSize: 50,
	opacity: 1
	//shadowColor: new Color(0, 0, 0),
    // Set the shadow blur radius to 12:
    //shadowBlur: 12,
    // Offset the shadow by { x: 5, y: 5 }
    //shadowOffset: new Point(5, 5)
});

//shapes
var timerRect = new Path.Rectangle({
	point:[1200,850],
	size:[400,50],
	fillColor:'white',
	opacity:0
})

var rect = new Path.Rectangle({
	point: [150,700],
	size: [300, 50],
	strokeColor: 'white',
	opacity:0,
	strokeWidth:0
});

var circle = new Path.Circle(new Point(700,770), 100);
circle.strokeColor = 'white';
circle.opacity = 0;
circle.strokeWidth = 12;

var triangle = new Path.RegularPolygon(new Point(1000, 770), 3, 100);
triangle.strokeWidth = 12;
triangle.strokeColor = 'white';
triangle.opacity = 0;


//keypresses
var upPress

var downPress

var leftPRess

//timer
var timerT = new PointText({
	point: [1500, 900],
	fillColor:'white',
	content: timer.toString(),
	fontSize: 25,
	opacity:0

})
var border = new Shape.Rectangle(new Point(Math.floor(50), Math.floor(50)), new Size(view.size.width-80,view.size.height-50));
border.strokeColor = 'white';
border.strokeWidth = '5';

begin.onHover = function(event){
	if (!started){
		started = true;
	}
}

var donut = new PointText({
	fillColor: 'white',
	point:[100, 200],
	opacity:0,
	content: 'NOT',
	fontSize: 75
})



var not1 = new PointText({
	fillColor: 'white',
	point:[295, 200],
	opacity:0,
	content: 'NOT',
	fontSize: 75
})


var click = new PointText({
	fillColor: 'white',
	point:[4*25+385, 200],
	opacity:0,
	content: 'NOT',
	fontSize: 75
})

var up= new PointText({
	fillColor: 'white',
	point:[4*50+750, 200],
	opacity:0,
	content: 'UP',
	fontSize: 75
})

var down = new PointText({
	fillColor: 'white',
	point:[4*50+475, 200],
	opacity:0,
	content: 'DOWN',
	fontSize: 75
})

var blue = new PointText({
	fillColor: 'white',
	point:[4*50+895, 200],
	opacity:0,
	content: 'BLUE',
	fontSize: 75
})

var green = new PointText({
	fillColor:'white',
	point: [4*50+1135, 200],
	opacity:0,
	content:'GREEN',
	fontSize:75
})

var or = new PointText({
	fillColor: 'white',
	point: [480, 350],
	content:'OR',
	fontSize: 75,
	opacity:0
})

var nothing = new PointText({
	fillColor: 'white',
	point:[640, 350],
	opacity:0,
	content: 'NOTHING',
	fontSize: 75
})

var not2 = new PointText({
	fillColor: 'white',
	point:[1040, 350],
	opacity:0,
	content: 'NOT',
	fontSize: 75
})
var not6 = new PointText({
	fillColor: 'white',
	point:[1240, 350],
	opacity:0,
	content: 'NOT',
	fontSize: 75
})
var not5 = new PointText({
	fillColor: 'white',
	point:[1440, 350],
	opacity:0,
	content: 'NOT',
	fontSize: 75
})

var red = new PointText({
	fillColor:'white',
	opacity:0,
	content:'RED',
	fontSize:75,
	point:[680, 500]
})

var yellow = new PointText({
	fillColor:'white',
	opacity:0,
	content:'YELLOW',
	fontSize:75,
	point:[880, 500]
})

var not4 = new PointText({
	fillColor:'white',
	opacity:0,
	content:'NOT',
	fontSize:75,
	point:[1240, 500]
})
var not7 = new PointText({
	fillColor:'white',
	opacity:0,
	content:'NOT',
	fontSize:75,
	point:[1440, 500]
})

var left = new PointText({
	fillColor:'white',
	opacity:0,
	content:'LEFT',
	fontSize:75,
	point:[4*50+895, 650]

})

var right = new PointText({
	fillColor:'white',
	opacity:0,
	content:'RIGHT',
	fontSize:75,
	point:[4*50+1145, 650]

})



function onKeyDown(event){
	console.log(begin.opacity);
	console.log(timer.opacity);
	if (!started & begin.opacity == 1){
		started = true;

	}
}	

// main block for game
var words = [left,right,rect,timerRect, up,down, donut, not1, not2,nothing,not4,not5, not6,not7,click, or, red, blue, green, yellow];

function onFrame(){
	if (!game_over){
		if (started){
		// fade out beginning text

			if (start.opacity >= 0.01){
				start.opacity -= 0.01;
			}
			if (begin.opacity >= 0.01){
				begin.opacity -= 0.01;
				for (var i = 0; i < words.length; i++){
					words[i].opacity += 0.01;
					if (words[i].opacity >= 0.99){
						finished = true;
						started = false;
						console.log('finished true and started false')
						console.log(hitCorrect)
						break;

					}
				}
		}
	}
		else{
			
			if (finished & !hitCorrect){
				timerT.content = timer.toString();
				if (timer == 0){
					game_over = true;
				}
				else{
					timer -= 1;
					timerRect.width= 400*(timer/300);
					console.log(timerRect.width)
				}

			}
			
		}
	
	}
	else{


	}
}

