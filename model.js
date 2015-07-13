function ShapeModel(){
	this.shapeChoose();
	this.viewModel = new ViewModel(this.shapeName);
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

function ViewModel(shapeName){
	this.setupShapeView(shapeName);
}

ViewModel.prototype.setupShapeView = function(shapeName){
	this.shapeCanvas = document.getElementById('shapeCanvas');	
	this.shapeContext = this.shapeCanvas.getContext('2d');
	this.shapeContext.clearRect(0, 0, this.shapeCanvas.width, this.shapeCanvas.height);
	this.shapeContext.canvas.width  = 400;
	this.graphNodeRadius = 20;
}