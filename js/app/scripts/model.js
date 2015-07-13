function ShapeModel(){
	this.shapeChoose();
}

ShapeModel.prototype.shapeChoose = function(){
	var randNum = Math.random();
	if (randNum > 0.5) {
		this.shapeName = "rect";
	}
	else{
		this.shapeName = "circle";
	}
}

ShapeModel.prototype.shapeReset = function(){
	this.shapeName = null;
	this.shapeChoose();
}

ShapeModel.prototype.getShape = function(){
	return this.shapeName;
}


function ViewModel(shapeName){
	this.setupShapeView(shapeName);
}

ViewModel.prototype.setupShapeView = function(shapeName){
	this.shapeCanvas = document.getElementById('shapeCanvas');	
	this.shapeContext = this.shapeCanvas.getContext('2d');
	this.shapeContext.clearRect(0, 0, this.shapeCanvas.width, this.shapeCanvas.height);
	this.shapeContext.canvas.width  = 400;
	this.shapeName = shapeName;
}

ViewModel.prototype.drawShape = function(){
	this.shapeContext.clearRect(0, 0, this.shapeCanvas.width, this.shapeCanvas.height);
	this.shapeContext.canvas.width  = 400;
	this.shapeContext.canvas.height  = 225;
	if (this.shapeName == "rect") {
		this.drawRect();
	}
	else{
		this.drawCircle();
	}
}

ViewModel.prototype.drawRect = function(){
	this.shapeContext.beginPath();
	this.shapeContext.fillStyle = "black";
	this.shapeContext.fillRect(100,25,200,200);
}

ViewModel.prototype.drawCircle = function(){
	this.shapeContext.beginPath();
	this.shapeContext.arc(200,115,100,0,2*Math.PI);
	this.shapeContext.stroke();
}

ViewModel.prototype.clearCanvas = function(){
	if (this.shapeName == "rect") {
		this.shapeContext.clearRect(100,25,200,200);
	}
	else{
		this.shapeContext.strokeStyle = "white";
		this.shapeContext.beginPath();
		this.shapeContext.arc(200,115,100,0,2*Math.PI);
		this.shapeContext.stroke();
	}
}