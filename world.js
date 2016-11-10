function world(width, height){
	//world variables here
	this.w = width;
	this.h = height;
	this.numBirbs = 10;
	this.birbsArray = [];
	this.bubbleSize = 100;
	this.movePercentage = 200;
	this.comfortableDistance = 10;
	this.accelerationModifier = 10;

	this.moveBirbs= function(){
		//for loop to calculate shit

		for (var i=0; i < this.birbsArray.length; i++) {
			var birb = this.birbsArray[i];
			//get flocking
			var r1 = flock(birb);
			//get avoiding
			var r2 = avoid(birb);

			//get matching velocity
			var r3 = match(birb);
			//{x:0, y:0};//
			//get obstacles
			//apply speeds
			birb.vx = r1.x + r2.x + r3.vx;
			birb.vy = r1.y + r2.y + r3.vy;
		}
		//mooooov
		for (var i=0; i < this.birbsArray.length; i++) {
			var birb = this.birbsArray[i];
			birb.x += birb.vx;
			birb.y += birb.vy;
			if(birb.x > this.w){
				birb.x = 0;
			}
			if(birb.y > this.h){
				birb.y = 0;
			}
			if(birb.x < 0){
				birb.x = this.w;
			}
			if(birb.y < 0){
				birb.y = this.h;
			}
		}
}}

function flock(birb){ //flocking
	//find center of mass for neighborhood
	com = {x:0, y:0};
	var numNeighbors = 0;
	for(var i=0; i<thisWorld.birbsArray.length; i++){
		var otherBirb = thisWorld.birbsArray[i];
		if(getDistance(birb, otherBirb) < thisWorld.bubbleSize && birb != otherBirb){ //if they are two different birbs within a certain distance
			numNeighbors ++;
			com.x += otherBirb.x;
			com.y += otherBirb.y;
		}
	}
	if(numNeighbors == 0){ //no other birbs. don't move
		return com;
	}
	//calculate how to move bird towards percieved center
	com.x /= numNeighbors;
	com.y /= numNeighbors;
	com.x = com.x - birb.x;
	com.y = com.y - birb.y;
	com.x /= thisWorld.movePercentage;
	com.y /= thisWorld.movePercentage;
	return com;

}

function avoid(birb){
	var vel = {x:0, y:0};
	for(var i=0; i <thisWorld.birbsArray.length; i++){
		var otherBirb = thisWorld.birbsArray[i];
		var dist = getDistance(birb, otherBirb);
		if(dist < thisWorld.comfortableDistance && otherBirb != birb){
			var force = 1/(10+dist);
			vel.x += force * (birb.x-otherBirb.x);
			vel.y += force * (birb.y-otherBirb.y);
		}
	}
	return vel;
}

function match(birb){
	var vel = {vx : 0, vy : 0}; //holds avg vel for a birb's neighbors
	var numNeighbors = 0;
	for(var i=0; i<thisWorld.birbsArray.length;i++){
		var otherBirb = thisWorld.birbsArray[i];
		if(getDistance(birb, otherBirb) < thisWorld.bubbleSize && otherBirb != birb){
			vel.vx += otherBirb.vx;
			vel.vy += otherBirb.vy;
			numNeighbors++;
		}
	}
	if(numNeighbors == 0){ //no other birbs. don't move
		return {vx:birb.vx/2, vy: birb.vy/2};
	}
	vel.vx /= numNeighbors;
	vel.vy /= numNeighbors;
	vel.vx = (vel.vx - birb.vx)/2;
	vel.vy = (vel.vy - birb.vy)/2;
	return vel;
}

function getDistance(birb, otherBirb){
	return Math.abs(Math.sqrt((birb.x-otherBirb.x)*(birb.x-otherBirb.x) + (birb.y-otherBirb.y)*(birb.y-otherBirb.y)));
}
//etc.