function birb(xi, yi, vxi, vyi){
	this.x = xi;
	this.y = yi;
	this.vel = new vector(vxi, vyi);

	this.getDistance = function(birb){
		return Math.sqrt((this.x-birb.x)*(this.x-birb.x) + (this.y-birb.y)*(this.y-birb.y));
	}
}