var canvas = document.getElementById('canvasA');
var ctx = canvas.getContext("2d");
canvas.width = Math.floor(.90*window.innerHeight); //scales canvas to avoid stretching
canvas.height = Math.floor(.90*window.innerHeight);
var birbSize = 3;
var thisWorld = new world(canvas.width, canvas.height);
var verbose = true;

function drawBirbs(){
	ctx.fillStyle = "rgba(253,249,243, 0.35)";
	ctx.fillRect(0,0,canvas.width, canvas.height);
	ctx.fillStyle = "#161515";
	for(let birb of thisWorld.birbsList){
		ctx.beginPath();
		ctx.arc(birb.pos.x,birb.pos.y,birbSize,0,2*Math.PI);
		ctx.closePath();
		ctx.fill();
		if(verbose){
			ctx.strokeStyle = "rgba(0,0,0,0.5)";
			ctx.beginPath();
			ctx.arc(birb.pos.x,birb.pos.y,thisWorld.bubbleSize,0,2*Math.PI);
			ctx.closePath();
			ctx.stroke();
			ctx.strokeStyle = "rgba(255,0,0,0.5)";
			ctx.beginPath();
			ctx.arc(birb.pos.x,birb.pos.y,thisWorld.repelDist,0,2*Math.PI);
			ctx.closePath();
			ctx.stroke();
		}
	}
}

function createBirbs(number){
	for(var i=0;i<number;i++){
		var xi= thisWorld.h/2;//Math.random()*thisWorld.w; //temporary, will be moved to offscreen
		var yi= thisWorld.h/2;//Math.random()*thisWorld.h;
		var vxi = 0;//Math.random()*2+1;
		var vyi = 0;//Math.random()*2+1;
		var thisBirb = new birb(xi, yi, vxi, vyi);
		thisWorld.birbsList.push(thisBirb);
	}
}

function update(){
	thisWorld.moveBirbs();
	drawBirbs();
	requestAnimationFrame(update);
}
createBirbs(1);
update();
