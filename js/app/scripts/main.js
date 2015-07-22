/*
	main.js
	Daiane Andrade
	July 2015

	This code implements a sample of a simulation
	for integration with SmartSparrow

	This code has the controller, queue and funtions
	for integrate with HTML

*/

//	Controller for the model
function Controller(){
	//	Create the shape model
	this.shapeModel = new ShapeModel();
	//	Create the view model with the shape of the Shape Model
	this.shapeView = new View(this.shapeModel.getShape());
}

//	Function for draw the shape in the canvas
Controller.prototype.drawCanvas = function(){
	//	Tell de view to drap the shape
	this.shapeView.drawShape();
}

Controller.prototype.resetController = function(){
	this.shapeModel.shapeReset();
	this.shapeView.resetView(this.shapeModel.getShape());
}
/*	
	Queue data structure.
	A queue is a vector with no information inside of it
	It is used to control the Answers based in the size of the queue that
	you choose
*/

function Queue(size){
	//	Create the Queue as a vector
	this.queue = [];
	this.queueSize = size;
	for (var i = 0; i < this.queueSize ; i++){
		//	Put null informaton inside of it
		this.queue.push(null);
	}
}

/*	
	function to add the value at the end of the queue
	and remove the first element of the queue	
*/

Queue.prototype.queueAdd = function(value){
	this.queue.splice(0,1);
	this.queue.push(value);
}

/*	
	function that counts the amount of true values
	inside the queue
*/
Queue.prototype.correctAnswerCounter = function(){
	var counter = 0;
	for (var count in this.queue){
		if (this.queue[count] == true) {
			counter += 1;
		}
	}
	return counter;
}

/*
	function to check if the queue has the correct
	amount of true inside of it. Used to 
	finish the questions
*/

Queue.prototype.queueCheck = function(){
	return this.correctAnswerCounter() >= (this.queueSize - 1);
}

/*	
	serie of code to create and expose variables
	to SmartSparrow	
*/
var simModel = new pipit.CapiAdapter.CapiModel({
	done: false
});

pipit.CapiAdapter.expose('done', simModel);
pipit.Controller.notifyOnReady();

/*	Global variables to be used during the execution	*/
var viewController = new Controller();
var queue = new Queue(5);

/*	main function where the graph should be drawn	*/
main = function(){
	viewController.drawCanvas();
}

//	Function for the question
questions = function() {
	//	Take the element from the HTML
	//	There's different ways to make this, but for radio structure
	//	this one was the most effective one, using jquery
	//	compares the element to the actual shape

	//	Is the element from the HTML equal to the actual shape?
	if(($('input[name="optionsRadios"]:checked').val()) == (viewController.shapeModel.getShape())){
		//	add true in the queue
		queue.queueAdd(true);
	}
	else{
		//	add false in the queue
		queue.queueAdd(false);
	}

	//	viewers tracking of answers
	document.getElementById('correct1').innerHTML = "Number of right answers: " + queue.correctAnswerCounter() + " out of " + (queue.queueSize - 1);

	//	Do we have the right queue answers?
	if (queue.queueCheck() == true) {
		document.getElementById('correct1').innerHTML = "You got it right!";
		/*	change the status of the SmartSparrow variable for true to show that
			the student is able to continue the lesson	*/
		simModel.set('done', true);
		pipit.Controller.notifyOnReady();
	}
	// The amount is not right
	else{
		//	Reset the Controller
		viewController.resetController();
		//	Draw in the canvas
		main();

	}
}

//	Send button for the questions
$('#send1').click(function(){
	//	Do we have the right queue answers?
	if (queue.queueCheck() == true) {
		//	Hide the question
		$("#form1").css({"display": "none"});
	}
	else{
		//	Reset the Controller
		viewController.resetController();
		//	Draw in the canvas
		main();
	}
	//	reset the radio button to uncheck
	$('input[name="optionsRadios"]').prop('checked', false);
	//	disable the submit button
	document.getElementById("send1").disabled = true;
})

//	While the user do not choose any shape, the button is disabled
$('input[type="radio"]').change(function(){
	//	check the value of the radio
	var checked = $('input[name="optionsRadios"]:checked').val();
	//	Is the radio choosen?
	if (($('input[name="optionsRadios"]:checked').val()) != "") {
		//	Enable the button
		document.getElementById("send1").disabled = false;
	}
	else{
		//	Disable the button
		document.getElementById("send1").disabled = true;
	}
})

/*	when you load the page, in the CSS,
	the question is hidden, and you just want to show
	it when the page is fully loaded,
	so we made this function	*/
var show = function(){
	$("#form1").css({"display": "block"});
}

$(document).ready(main,show());