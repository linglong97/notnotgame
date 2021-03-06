
var started = false;
var finished = false;
var hitCorrect = true;
var timer = 300;
var game_over = false;
var score = -1;
var correct = ['red','blue', 'yellow', 'green', 'up', 'down', 'left', 'right'];
var restart = false;

var correctMusic = new Howl({
		src:['sounds/pinwheel.mp3'],
		volume: 0.5,
	});

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
	size:[200,50],
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
var upPress = new Path.RegularPolygon(new Point(370, 530), 3, 50)
upPress.strokeWidth = 5;

upPress.opacity = 0;
upPress.fillColor = 'red';

var downPress = new Path.RegularPolygon(new Point(370, 830), 3, 50)
downPress.strokeWidth = 5;

downPress.opacity = 0;
downPress.rotate(180);
downPress.fillColor = 'blue';

var leftPress= new Path.RegularPolygon(new Point(170, 680), 3, 50)
leftPress.strokeWidth = 5;

leftPress.opacity = 0; 
leftPress.rotate(270);
leftPress.fillColor = 'green'

var rightPress= new Path.RegularPolygon(new Point(570, 680), 3, 50)
rightPress.strokeWidth = 5;

rightPress.opacity = 0;
rightPress.rotate(90);
rightPress.fillColor = 'yellow';

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


//phrases
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
	point: [420, 350],
	content:'AND',
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



//max
function makeRandom(min, max){
	

	return Math.floor(Math.random()*(max-min+1))+min;
}

//creates the statement we need for the game
function generateNots(difficulty, Nots){
	indicesToBlur = [0,1,2,3,4,5,6,7]
	number = 0;
	if (difficulty < 5){
		number = 8;
	}
	else if (difficulty < 10){
		number = 6;
	}
	else if (difficulty < 15){
		number = 5;
	}
	else if (difficulty < 20){
		number = 4;
	}
	else if (difficulty < 25){
		number = 3;
	}
	else{
		number = 0;
	}
	notBlurred = Math.floor((Math.random()*(number+1)));
	notBlurred *= 2;
	if (notBlurred >= 8){
		notBlurred = 8;
}
	for (var i= 0; i < notBlurred; i++){
		maxBlur = indicesToBlur.length;
		index = Math.floor((Math.random()*(maxBlur)));
		indicesToBlur.splice(index, 1);
	}
	//indices to blur is index of 
	console.log(indicesToBlur);
	for(var i = 0; i < Nots.length; i++){
		if (indicesToBlur.indexOf(i) >=0 ){
			Nots[i].opacity = 1;
	}
		else{
		Nots[i].opacity = 0;
	}
	}
	return indicesToBlur;
}


function generateColors(difficulty, colors){
	correct = ['red','blue', 'yellow', 'green', 'up', 'down', 'left', 'right'];
	first = ['down', 'up', 'blue', 'green'];
	second = ['red', 'yellow', 'left', 'right'];
	firstCorr = ['blue', 'red', 'down','left'];
	secondCorr = ['up', 'right', 'green', 'yellow'];
	if (difficulty <= 1){
		number = Math.floor(Math.random()*4);
		which = Math.floor(Math.random()*2)+1;
		if (which == 1){
			for(var i = 0;i < 4; i++){
				if ( i != number){
					colors[i].opacity = 0;
				}
				else{
					colors[i].opacity = 1;
			}
		}
	}
		else{	
			for(var i = 0;i < 4; i++){
				if ( i != number){
					colors[i+4].opacity = 0;
				}
				else{
					colors[i+4].opacity = 1;
			}
		}

		}
		not = Math.floor(Math.random()*2+1)
		if (not == 1){
			index = Math.floor(Math.random()*3)
			for (var i = 0; i < 3; i++){
				if (i == index){
					Nots[i].opacity = 1;
			}
				else{
					Nots[i].opacity = 0;
			}
			}
		}
		//down up blue green for first
		//red yellow left right
		
		if (which == 1){
			if (not == 1){
				// not this color
				index = correct.indexOf(first[number]);
				correct.splice(index, 1);
				index2 = correct.indexOf(firstCorr[number]);
				correct.splice(index2, 1);
				return correct
		}
			else{
				// this color
				return [first[number], firstCorr[number]];
		}
		}
		else{
			if(not == 1){
				index = correct.indexOf(second[number]);
				correct.splice(index, 1);
				index2 = correct.indexOf(secondCorr[number]);
				correct.splice(index2, 1);
				return correct;
			}
			else{
				return [second[number], secondCorr[number]];
		}
	}
	}
	else{
		or.opacity = 1;
		arr1 = [0,1,2,3];
		arr2 = [0,1,2,3];
		nots1 = makeRandom(0,difficulty);
		nots2 = makeRandom(0,difficulty);		
		num1 = Math.floor(Math.random()*4);
		num2 = Math.floor(Math.random()*4);
		for(var i = 0;i < 4; i++){
				if (i != num1){
					colors[i].opacity = 0;
				}
				else{
					colors[i].opacity = 1;
			}
		}
		for(var i = 0;i < 4; i++){
				if (i != num2){
					colors[i+4].opacity = 0;
				}
				else{
					colors[i+4].opacity = 1;
			}
		}

		for (var i = 0; i < nots1; i++ ){
			len = arr1.length;
			index = makeRandom(len);
			arr1.splice(index,1);
		}
		for (var i = 0; i < nots2; i++ ){
			len = arr2.length;
			index = makeRandom(len);
			arr2.splice(index,1);
		}
		for (var i = 0; i < 3; i++){
			if (arr1.indexOf(i) >=0 ){
				Nots[i].opacity = 1;
		}
		else{
			Nots[i].opacity = 0;
		
		}
	}
		for (var i = 3; i < 6; i++){
			if (arr2.indexOf(i) >=0 ){
				Nots[i].opacity = 1;
		}
		else{
			Nots[i].opacity = 0;
		}
	}
	//color indexes and negations, num1, num2;
	//down up blue green for first
	//red yellow left right
	//r, u,y,r, b, d, g, l
	color1 = first[num1];
	color2 = second[num2];
	neg1 = nots1 % 2;
	neg2 = nots2 % 2;
	console.log(nots1, nots2)
	if (neg1 == 0){
		index = correct.indexOf(color1);
		correct.splice(index, 1);
		index2 = correct.indexOf(firstCorr[num1]);
		correct.splice(index2, 1);

	}
	if (neg2 == 0){
		index = correct.indexOf(color2);
		correct.splice(index, 1);
		index2 = correct.indexOf(secondCorr[num1]);
		correct.splice(index2, 1);
	}
	if ( neg1 == 1 & neg2 == 0){
		correct = [color1, color2];
	}
	
	return correct
	}

}


function onKeyDown(event){
//	 r 
//g		y
//	 b

	if (!started & begin.opacity == 1){
		started = true;
	}
	if (event.key == 'up'){
		console.log('up', 'red')
		upPress.strokeColor = 'white';
		if (correct.indexOf('up')>= 0 | correct.indexOf('red')>= 0){
			if ((correct.indexOf('up') == 0 | correct[correct.indexOf('up')-1] != 'not')& (correct.indexOf('red') == 0 | correct[correct.indexOf('red')-1] != 'not')){
				hitCorrect = true;
			}
			else{
				game_over = true;
			}
		}
		else{
			game_over = true;
		}
		
		
	}
	if (event.key == 'left'){
		leftPress.strokeColor = 'white';
		if (correct.indexOf('left')>= 0 | correct.indexOf('green')>= 0){
			if ((correct.indexOf('left') == 0 | correct[correct.indexOf('left')-1] != 'not')& (correct.indexOf('green') == 0 | correct[correct.indexOf('green')-1] != 'not')){
				hitCorrect = true;
			}
			else{
				game_over = true;
			}
		}
		else{
			game_over = true;
		}
	}
	if (event.key == 'down'){
		downPress.strokeColor = 'white';
		if (correct.indexOf('down')>= 0 | correct.indexOf('blue')>= 0){
			if ((correct.indexOf('down') == 0 | correct[correct.indexOf('down')-1] != 'not')& (correct.indexOf('blue') == 0 | correct[correct.indexOf('blue')-1] != 'not')){
				hitCorrect = true;
			}
			else{
				game_over = true;
			}
		}
		else{
			game_over = true;
		}
	}
	if (event.key == 'right'){
		rightPress.strokeColor = 'white';
		if (correct.indexOf('right')>= 0 | correct.indexOf('yellow')>= 0){
			if ((correct.indexOf('right') == 0 | correct[correct.indexOf('right')-1] != 'not')& (correct.indexOf('yellow') == 0 | correct[correct.indexOf('yellow')-1] != 'not')){
				hitCorrect = true;
			}
			else{
				game_over = true;
			}
		}
		else{
			game_over = true;
		}
	}

}	

// main block for game
var words = [upPress,leftPress,rightPress,downPress,left,right,rect,timerRect, up,down, donut, not1, not2,nothing,not4,not5, not6,not7,click, or, red, blue, green, yellow];
var Nots = [donut, not1, click, not2, not6, not5,not4, not7]
var colors = [down,up, blue, green,red, yellow, left, right, nothing]
var words2 = [left,right,rect,up,down, donut, not1, not2,nothing,not4,not5, not6,not7,click, or, red, blue, green, yellow]

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
						for (var i = 0; i < words2.length; i++){
							words2[i].opacity = 0;
					}
						break;

					}
				}
		}
	}
		else{
			
			if (finished & !hitCorrect){
				timerT.content = timer.toString();
				timer -= 1;
				timerRect.size= [400*(timer/300), 50];
				timerRect.opacity = 1;
				
				if (timer == 0){
					if (correct.indexOf('nothing') >= 0){
						hitCorrect = true;
					}
					if (!hitCorrect){
						game_over = true;
					}
				}
				
				else if(timer != 290){
					console.log(timerRect.width);
				}
				else{
					upPress.strokeColor = 'black';
					leftPress.strokeColor = 'black';
					rightPress.strokeColor = 'black';
					downPress.strokeColor = 'black';	
				}
			}
			else if (finished & hitCorrect){
				correctMusic.play();
				timer = 300;
				timerRect.width = 400
				score += 1;
				for(var i = 4; i < words.length; i++){
					if (i != 7){
						words[i].opacity = 0;
					}
				}
				
				correct = generateColors(Math.floor(score/5), colors);
				hitCorrect = false;
							
			}
			
		}
	
	}
	else{
		gameOver.content = 'GAME OVER, YOUR SCORE WAS: ' +score;
		if (gameOver.opacity < 0.99){
			gameOver.opacity += 0.01;
			playAgain.opacity += 0.01;
		}
		else{
		gameOver.opacity = 1;
		playAgain.opacity = 1;
	}
		for (var i = 0; i < words.length; i++){
			if (words[i].opacity > 0.01){
				words[i].opacity -= 0.01;
			}	
			else{
			words[i].opacity = 0;
		}
		}
	}
}
var gameOver = new PointText({
	fillColor:'white',
	opacity:0,
	content:'GAME OVER, YOUR SCORE WAS: '+ score,
	fontSize: 75,
	point:[200,300]
})


var playAgain = new PointText({
	fillColor:'white',
	opacity:0,
	content:'PRESS ANYTHING TO PLAY AGAIN',
	fontSize: 75,
	point:[200,500]
})