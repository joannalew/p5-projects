function snake(){
	this.x = 0;
	this.y = 0;
	this.dx = 1;
	this.dy = 0;
	this.total = 0;
	this.tail = [];


	this.reset = function(){
		this.total = 0;
		this.tail = [];
		this.x = 0;
		this.y = 0;
		this.dx = 0;
		this.dy = 0;
	}

	this.eat = function(pos){
		var d = dist(this.x, this.y, pos.x, pos.y);
		if (d < 1){
			this.total++;
			return true;
		} else{
			return false;
		}
	}

	this.death = function(){
		for (var i = 0; i < this.tail.length; i++){
			var pos = this.tail[i];
			var d = dist(this.x, this.y, pos.x, pos.y);
			if (d < 1){
				this.reset();
			}
		}

		if (this.x < 0 || this.x >= width || this.y < 0 || this.y >= height){
			this.reset();
		}

	}

	this.update = function(){
		if (this.total === this.tail.length){
			for (var i = 0; i < this.tail.length - 1; i++){
				this.tail[i] = this.tail[i+1];
			}
		}	
		this.tail[this.total-1] = createVector(this.x, this.y);

		this.x = this.x + this.dx * scl;
		this.y = this.y + this.dy * scl;

		// this.x = constrain(this.x, 0, width-scl);
		// this.y = constrain(this.y, 0, height-scl);
	}

	this.show = function(){
		fill(255);
		for (var i = 0 ; i < this.tail.length; i++){
			rect(this.tail[i].x, this.tail[i].y, scl, scl);
		}

		fill(255);
		rect(this.x, this.y, scl, scl);
	}

	this.dir = function(x, y){
		this.dx = x;
		this.dy = y;
	}
	
}