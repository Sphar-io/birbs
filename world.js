function world(width, height){
	//world variables here
	this.w = width;
	this.h = height;
	this.numBirbs = 10;
	this.birbsArray = [];

	this.moveBirbs= function(){
		//calculate things
		//for(){
			//rule 1
			//rule 2
			//rule 3
		for(var i=0; i<this.birbsArray.length;i++){
			var thisBirb = this.birbsArray[i];
			thisBirb.x += thisBirb.vel.x;
			thisBirb.y += thisBirb.vel.y;
		}
	}
}

function ruleOne(){

}

//etc.