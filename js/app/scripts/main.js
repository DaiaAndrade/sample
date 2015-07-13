function ViewController(){
	this.shapeModel = new ShapeModel();
	this.shapeView = new ViewModel(this.shapeModel.getShape());
}

ViewController.prototype.drawCanvas = function(){
	this.shapeView.drawShape();
}

function Queue(size){
	this.queue = [];
	for (var i = 0; i < size ; i++){
		this.queue.push(null);
	}
}

Queue.prototype.queueCheck = function(){
	var trueCounter = this.trueCounter();
	if (trueCounter >= 4) {
		return true;
	}
	else{
		return false;
	}
}

Queue.prototype.queueAdd = function(value){
	this.queue.splice(0,1);
	this.queue.push(value);
}

Queue.prototype.trueCounter = function(){
	var trueCounter = 0;
	for (var count in this.queue){
		if (this.queue[count] == true) {
			trueCounter += 1;
		}
	}
	return trueCounter;
}

var simModel = new pipit.CapiAdapter.CapiModel({
	done: false
});

pipit.CapiAdapter.expose('done', simModel);
pipit.Controller.notifyOnReady();

var viewController = new ViewController();
var queue = new Queue(5);

main = function(){
	viewController.drawCanvas();
}

questions = function() {
	var answer1 = $('input[name="optionsRadios"]:checked').val();;
	if(answer1 == viewController.shapeModel.getShape()){
		queue.queueAdd(true);
	}
	else{
		queue.queueAdd(false);
	}
	document.getElementById('correct1').innerHTML = "Number of right Answers: " + queue.trueCounter();
	if (queue.queueCheck() == true) {
		document.getElementById('correct1').innerHTML = "You got it right!";
		simModel.set('done', true);
		pipit.CapiAdapter.expose('done', simModel);
		pipit.Controller.notifyOnReady();
	}

	else{
		viewController = new ViewController();
		main();

	}
}

$('#send1').click(function(){
	if (queue.queueCheck() == true) {
		$("#form1").css({"display": "none"});
	}
	else{
		viewController = new ViewController();
		main();
	}
})

var show = function(){
	$("#form1").css({"display": "block"});
}

$(document).ready(main,show());