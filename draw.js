var canvas = document.getElementById('canvasA');
var ctx = canvas.getContext("2d");
canvas.width = Math.floor(.90*window.innerHeight); //scales canvas to avoid stretching
canvas.height = Math.floor(.90*window.innerHeight);
var birbSize = 3;
var thisWorld = new world(canvas.width, canvas.height);
var maxStartSpeed = 4;
var verbose = true;

function drawBirbs(){
	ctx.fillStyle = "rgba(253,249,243, 0.35)";
	ctx.fillRect(0,0,canvas.width, canvas.height);
	ctx.fillStyle = "#161515";
	for(var i=0; i<thisWorld.birbsArray.length; i++){
		var thisBirb = thisWorld.birbsArray[i];
		ctx.beginPath();
		ctx.arc(thisBirb.x,thisBirb.y,birbSize,0,2*Math.PI);
		ctx.closePath();
		ctx.fill();
		if(verbose){
			ctx.strokeStyle = "rgba(0,0,0,0.5)";
			ctx.beginPath();
			ctx.arc(thisBirb.x,thisBirb.y,thisWorld.bubbleSize,0,2*Math.PI);
			ctx.closePath();
			ctx.stroke();
			ctx.strokeStyle = "rgba(255,0,0,0.5)";
			ctx.beginPath();
			ctx.arc(thisBirb.x,thisBirb.y,thisWorld.comfortableDistance,0,2*Math.PI);
			ctx.closePath();
			ctx.stroke();
		}
	}
}

function createBirbs(number){
	for(var i=0;i<number;i++){
		var xRand = Math.random()*thisWorld.w; //temporary, will be moved to offscreen
		var yRand = Math.random()*thisWorld.h;
		var vxi = Math.random()*5+5;
		var vyi = Math.random()*5+5;
		var thisBirb = new birb(xRand, yRand, vxi, vyi);
		console.log(thisBirb);
		thisWorld.birbsArray.push(thisBirb);
	}
}

function update(){
	thisWorld.moveBirbs();
	drawBirbs();
	requestAnimationFrame(update);
}
createBirbs(80);
update();
