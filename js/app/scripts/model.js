/*
	model.js
	Daiane Andrade
	July 2015

	This code implements a sample of ShapeModel
	and ShapeView and how it works

	This code has the models of the shape and the view

*/

function ShapeModel(){
	this.shapeChoose();
}

//	Function to choose the shape for the canvas
ShapeModel.prototype.shapeChoose = function(){
	//	Take a random number
	var randNum = Math.random();
	/*
		Since we have 2 types of shape, below 0.5 is one of them
		and above is the other one
	*/
	if (randNum > 0.5) {
		this.shapeName = "rect";
	}
	else{
		this.shapeName = "circle";
	}
}

//	Function to reset the shape
ShapeModel.prototype.shapeReset = function(){
	this.shapeName = null;
	this.shapeChoose();
}

//	Returns the shape name
ShapeModel.prototype.getShape = function(){
	return this.shapeName;
}

/*
	Model for create the view.
	Recieve the name from the Shape Model and set
	It from there
*/
function View(shapeName){
	this.setupView(shapeName);
}

/*
	Create the Shapeview. The shape is drawn on a canvas
	The shape given by the ShapeModel defines the shape
	that will be drawn in the canvas
*/
View.prototype.setupView = function(shapeName){
	//	Handle for the canvas
	this.shapeCanvas = document.getElementById('shapeCanvas');	
	//	Handle or the canvas context
	this.shapeContext = this.shapeCanvas.getContext('2d');
	//	Erase the canvas
	this.shapeContext.clearRect(0, 0, this.shapeCanvas.width, this.shapeCanvas.height);
	//	Set the canvas width
	this.shapeContext.canvas.width  = 400;
	//	Set the name of the shape
	this.shapeName = shapeName;
}

//	Function to reset the shape
View.prototype.resetView = function(shapeName){
	this.shapeName = shapeName;
	this.shapeContext.clearRect(0, 0, this.shapeCanvas.width, this.shapeCanvas.height);
}

//	Function to select the shape that wil be drawn
View.prototype.drawShape = function(){
	//	Erase the canvas
	this.shapeContext.clearRect(0, 0, this.shapeCanvas.width, this.shapeCanvas.height);
	//	Set the size
	this.shapeContext.canvas.width  = 400;
	this.shapeContext.canvas.height  = 225;
	//	Which shape should be drawn?
	if (this.shapeName == "rect") {
		//	A rectangle
		this.drawRect();
	}
	else{
		//	A circle
		this.drawCircle();
	}
}

//	Function to draw rectangle
View.prototype.drawRect = function(){
	//	Start the drawing path
	this.shapeContext.beginPath();
	//	Set the fill for the rectangle
	this.shapeContext.fillStyle = "black";
	//	fill the rectangle with (x,y, height, width)
	this.shapeContext.fillRect(100,25,200,200);
}

//	Function to draw circle
View.prototype.drawCircle = function(){
	//	Start the drawing path
	this.shapeContext.beginPath();
	//	Create a path for the circle with (x,y,radius, start angle, and angle)
	this.shapeContext.arc(200,115,100,0,2*Math.PI);
	//	Create the arc
	this.shapeContext.stroke();
}