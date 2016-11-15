function vector(xi, yi){
	this.x = xi;
	this.y = yi;

	this.add = function(vector){
			this.x += vector.x;
			this.y += vector.y;
	}
	this.subtract = function(vector){
			this.x -= vector.x;
			this.y -= vector.y;
	}
	this.divide = function(num){
			this.x *= num;
			this.y *= num;
	}
	this.divide = function(num){
			this.x /= num;
			this.y /= num;
	}

	this.getLength = function(){
		return Math.sqrt(this.x*this.x+this.y*this.y);
	}
	this.normalize = function(){
		var mag = this.getLength;
		if(mag > 0){
			this.divide(mag);
		}
	}
	this.getDistance = function(vector){
		return Math.sqrt((this.x-vector.x)*(this.x-vector.x) + (this.y-vector.y)*(this.y-vector.y));
	}
}
