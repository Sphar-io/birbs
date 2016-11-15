function world(xSize, ySize){
	this.w = xSize;
	this.h = ySize;
	this.birbsList = [];

	this.bubbleSize = 100;
	this.repelDist = 20;
	this.attractWeight = 1;
	this.repelWeight = 1;
	this.matchWeight = 1;
	this.attractSpeed = 100;

	this.moveBirbs = function(){
		//calculate new velocity
		for (let birb of this.birbsList) {
			var resultant = new vector(0,0);
			resultant.add(this.attract(birb));
			resultant.add(this.repel(birb));
			resultant.add(this.match(birb));
			birb.vel.add(resultant);
		}

		//apply velocity
		for (let birb of this.birbsList) {
			birb.pos.add(birb.vel);
			if(birb.pos.x > this.w){
				birb.pos.x = 0;
			}
			if(birb.pos.x < 0){
				birb.pos.x = this.w;
			}
			if(birb.pos.y > this.h){
				birb.pos.y = 0;
			}
			if(birb.pos.y < 0){
				birb.pos.y = this.h;
			}
		}
	}

	this.attract = function(birb){
		var numNeighbors = 0;
		var com = new vector(0,0);
		for (let otherBirb of this.birbsList) {
			if (birb.pos.getDistance(otherBirb.pos) < this.bubbleSize){
				numNeighbors++;
				com.add(otherBirb.pos);
			}
		}
		com.divide(numNeighbors);
		com.subtract(birb.pos);
		com.divide(100000);
		return com;
	}

	this.repel = function(birb){
		var numNeighbors = 0;
		var vel = new vector(0,0);
		for (let otherBirb of this.birbsList) {
			if (birb.pos.getDistance(otherBirb.pos) < this.repelDist && otherBirb != birb){
				numNeighbors++;
				var force = 1/(birb.pos.getDistance(otherBirb.pos));
				vel.x += (birb.pos.x - otherBirb.pos.x)*force;
				vel.y += (birb.pos.y - otherBirb.pos.y)*force;
			}
		}
		if(numNeighbors === 0){
			return vel;
		}
		return vel;	
	}

	this.match = function(birb){
		var numNeighbors = 0;
		var vel = new vector(0,0);
		for (let otherBirb of this.birbsList) {
			if (birb.pos.getDistance(otherBirb.pos) < this.bubbleSize && otherBirb != birb){
				numNeighbors++;
				vel.x += otherBirb.vel.x;
				vel.y += otherBirb.vel.y;
			}
		}
		if(numNeighbors === 0){
			return vel;
		}
		vel.divide(numNeighbors);
		vel.subtract(birb.vel);
		vel.divide(8);
		return vel;	
	}


}
