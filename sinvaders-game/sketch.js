var ship;
var flowers = [];
var num_flowers = 6;
var drops = [];

function setup(){
	createCanvas(600, 400);
	ship = new Ship();
	
	for (var i = 0; i < num_flowers; i++){
		flowers[i] = new Flower((i + 1) * 80, 60);
	}
}

function draw(){
	background(51);
	ship.show();

	for (var i = 0; i < drops.length; i++){
		drops[i].show();
		drops[i].move();

		for (var j = 0; j < flowers.length; j++){
			if (drops[i].hits(flowers[j])){
				flowers[j].grow();
				drops[i].evaporate();
			}
		}
	}

	var edge = false;

	for (var i = 0; i < num_flowers; i++){
		flowers[i].show();
		flowers[i].move();
		if (flowers[i].x > width || flowers[i].x < 0){
			edge = true;
		}
	}


	if (edge){
		for (var i = 0; i < flowers.length; i++){
			flowers[i].shiftDown();
		}
		edge = false;
	}

	for (var i = drops.length - 1; i >= 0; i--){
		if (drops[i].toDelete){
			drops.splice(i, 1);
		}
	}
}

function keyPressed(){
	if (keyCode === RIGHT_ARROW){
		ship.move(1);
	}
	else if (keyCode === LEFT_ARROW){
		ship.move(-1);
	}

	if (key === ' '){
		var drop = new Drop(ship.x + 10, height);
		drops.push(drop);
	}
}