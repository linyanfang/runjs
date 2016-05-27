function circleMove(obj, heat, cx, cy, r){
	this.obj = obj;
	this.heat = heat;
	this.cx = cx ? cx : 200;
	this.cy = cy ? cy : 200;
	this.r = r ? r : 200;
	this.i = 1;
	this.obj.timer = null;
	this.heat.style.left = this.cx + "px";
	this.heat.style.top = this.cy + "px";
}

circleMove.prototype.move = function(){
	var _this = this;
	_this.cancle();
	_this.obj.timer = setInterval(function(){
		var newX = _this.cx + _this.r*(Math.sin(Math.PI/180*_this.i)),
			newY = _this.cy + _this.r*(Math.cos(Math.PI/180*_this.i));
		_this.obj.style.left = Math.round(newX) + "px";
		_this.obj.style.top = Math.round(newY) + "px";
		_this.i++;
	}, 60);
}

circleMove.prototype.cancle = function(){
	clearInterval(this.obj.timer);
}

window.onload = function(){
	var PI = document.getElementById("pi"),
		heat = document.getElementById("heat"),
		obj = PI.getElementsByTagName("span")[0],
		circle = new circleMove(PI, heat, 400, 300, 200);
	circle.move();
	obj.onmouseover = function(){
		circle.cancle();
	}
	obj.onmouseout = function(){
		circle.move();
	}
}