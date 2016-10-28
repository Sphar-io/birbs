function world(width, height){
	//world variables here
	this.w = width;
	this.h = height;
	this.numBirbs = 10;
	this.birbsArray = [];
	this.movePercentage = 200;
	this.comfortableDistance = 50;
	this.accelerationModifier = 10;

	this.moveBirbs= function(){
		//for loop to calculate shit
		var com = calculateCOM();
		var avgVel = calculateVel();

		for (var i=0; i < this.birbsArray.length; i++) {
			var birb = this.birbsArray[i];
			//get flocking
			var r1 = flock(birb, com);
			//get avoiding
			var r2 = avoid(birb);
			//get matching velocity
			var r3 = match(birb, avgVel);
			//get obstacles
			//apply speeds
			birb.vx = r1.x + r2.x + r3.x+2;
			birb.vy = r1.y + r2.y + r3.y;
			birb.x += birb.vx;
			birb.y += birb.vy;
			if(birb.x > this.w){
				birb.x = 0;
			}
			if(birb.y > this.h){
				birb.y = 0;
			}
		}
	}
}

function calculateCOM(){
	var com = {x:0, y:0}; //holds center of mass
	for(var i=0; i<thisWorld.birbsArray.length;i++){
		com.x += thisWorld.birbsArray[i].x;
		com.y += thisWorld.birbsArray[i].y;
	}

	com.x /= thisWorld.birbsArray.length;
	com.y /= thisWorld.birbsArray.length;

	return com;
}

function calculateVel(){
	var vel = {x:0, y:0}; //vel
	for(var i=0; i<thisWorld.birbsArray.length;i++){
		vel.x += thisWorld.birbsArray[i].vx;
		vel.y += thisWorld.birbsArray[i].vy;
	}

	vel.x /= thisWorld.birbsArray.length;
	vel.y /= thisWorld.birbsArray.length;
	return vel;
}

function flock(birb, com){ //flocking
	var vx = (com.x-birb.x)/thisWorld.movePercentage;
	var vy = (com.y-birb.y)/thisWorld.movePercentage;
	return {x: vx, y:vy};
}

function avoid(birb){
	var vx=0;
	var vy=0;
	for(var i=0; i < thisWorld.birbsArray.length; i++) {
		otherBirb = thisWorld.birbsArray[i];
		if(birb != otherBirb){
			if(Math.abs(otherBirb.x-birb.x) < thisWorld.comfortableDistance){
				vx += (birb.x - otherBirb.x);
			}
			if(Math.abs(otherBirb.y-birb.y) < thisWorld.comfortableDistance){
				vy += (birb.y - otherBirb.y);
			}
		}
	}
	return {x: vx/50, y:vy/50};
}

function match(birb, avgVel){
	return {x: (avgVel.x-birb.vx)/10, y: (avgVel.y-birb.vy)/10};
}

//etc.