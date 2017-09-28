function Flower(x, y){
	this.x = x;
	this.y = y;
	this.r = 15;

	this.dx = 1;

	this.grow = function(){
		this.r += 2;
	}

	this.move = function(){
		this.x += this.dx;
	}

	this.shiftDown = function(){
		this.dx *= -1;
		this.y += this.r;
	}

	this.show = function(){
		noStroke();
		fill (255, 0, 200, 150);
		ellipse(this.x, this.y, this.r * 2, this.r * 2);
	}
}