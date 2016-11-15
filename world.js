function world(xSize, ySize){
	this.w = xSize;
	this.h = ySize;
	this.birbsList = [];

	this.bubbleSize = 75;
	this.repelDist = 10;
	this.attractWeight = 1;
	this.repelWeight = 1;
	this.matchWeight = 1;
	this.attractSpeed = 100;

	this.moveBirb = function(){
		//calculate new velocity
		for (birb : birbsList) {
			var resultant = this.attract(birb);
			resultant.add(this.repel(birb));
			resultant.add(this.match(birb));
			birb.vel.add(resultant);
		}

		//apply velocity
		for (birb : birbList) {
			if(birb.vel.x > w){

			}
			if(birb.vel){
				
			}
			birb.pos.add(birb.vel);
		}
	}

	this.attract = function(birb){
		var numNeighbors = 0;
		var com = new vector(0,0);
		for (otherBirb : birbsList) {
			if (birb.getDistance(otherBirb) < this.bubbleSize){
				numNeighbors++;
				com.add(birb.pos);
			}
		}
		if(numNeighbors === 0){
			return com;
		}
		com.divide(numNeighbors);
		com.subtract(birb.pos);
		return com.divide(this.attractSpeed);
	}

	this.repel = function(){
		var numNeighbors = 0;
		var vel = new vector(0,0);
		for (otherBirb : birbsList) {
			if (birb.getDistance(otherBirb) < this.repelDist){
				numNeighbors++;
				vel.x += otherBirb.x;
				vel.y += otherBirb.y;
			}
		}
		if(numNeighbors === 0){
			return vel;
		}
		com.divide(numNeighbors);
		com.subtract(birb.pos);
		return com.divide(this.attractSpeed);		
	}

	this.match = function(){
		return new vector(0,0);
	}


}
