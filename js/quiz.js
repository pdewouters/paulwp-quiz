var quiz = {
	allQuestions: [
		{
			question     : "Who is Prime Minister of the United Kingdom?",
			choices      : ["David Cameron", "Gordon Brown", "Winston Churchill", "Tony Blair"],
			correctAnswer: 0
		},
		{
			question     : "Who starred in Terminator 2?",
			choices      : ["Tim Robbins", "Arnold Schwarzenegger", "Bruce Willis"],
			correctAnswer: 1
		},
		{
			question     : "What is the capital of Mongolia?",
			choices      : ["Konakry", "Timbuctu", "Ulan Bator", "Sofia"],
			correctAnswer: 2
		},
		{
			question     : "Who is the strongest superhero?",
			choices      : ["Spiderman", "Batman", "Superman" ],
			correctAnswer: 2
		},
		{
			question     : "What is a tomato?",
			choices      : ["A fruit", "A vegetable", "A person", "Your mother"],
			correctAnswer: 0
		}
	],

	currentPosition: 0,
	score          : 0,

	userChoices: [],

	userMadeSelection: function () {
		// get choices
		var quizForm = document.getElementById('quiz-form');
		var choices = quizForm.elements['choice'];

		for (var i = 0; i < choices.length; i++) {
			if (choices[i].checked) {
				return true;
			}
		}

		return false;
	},

	saveChoice: function () {
		// get choices
		var quizForm = document.getElementById('quiz-form');
		var choices = quizForm.elements['choice'];
		var userChoice;

		for (var i = 0; i < choices.length; i++) {
			if (choices[i].checked) {
				userChoice = parseInt(choices[i].value);
			}
		}

		this.userChoices[this.currentPosition] = userChoice;
	},

	displayQuestion: function (position) {
		// get the form element
		var quizForm = document.getElementById('quiz-form');

		// get the legend element, where we display the question
		var legend = quizForm.getElementsByTagName('legend');

		// insert the question text
		legend[0].innerHTML = this.allQuestions[position].question;

		// get the choices div
		var choicesContainer = document.getElementById('choices');

		// clear choices
		choicesContainer.innerHTML = "";

		// display choices
		for (var i = 0; i < this.allQuestions[position].choices.length; i++) {

			// create a new element
			var choice = document.createElement('input');

			// set element attributes
			choice.type = 'radio';
			choice.value = i.toString();
			choice.name = 'choice';
			choice.id = i.toString();

			// create radio label
			var label = document.createElement('label');

			// set the label attributes and text
			label.innerHTML = this.allQuestions[position].choices[i] + '<br>';
			label.setAttribute('for', i.toString());

			// add the choice to the container
			choicesContainer.appendChild(choice);
			choicesContainer.appendChild(label);


			// if theres a user choice for this, check it
			if(i == this.userChoices[position]){
				choice.checked = true;
			}
		}

	},

	calculateScore : function(){
		for(var i=0;i< this.allQuestions.length;i++){
			if(this.userChoices[i] == this.allQuestions[i].correctAnswer){
				this.score++;
			}
		}
	},

	prevHandler: function () {

		// check if user selected something
		if (this.userMadeSelection()) {
			// save answer
			this.saveChoice();

			// if there is a previous question, display it
			if (this.currentPosition > 0) {
				this.displayQuestion(--this.currentPosition);
				this.setNavButtonsState();
			}
		} else {
			alert("Please make a choice");
		}


	},

	nextHandler: function () {

		// check if user selected something
		if (this.userMadeSelection()) {
			// save answer
			this.saveChoice();

			// display next question
			if (this.currentPosition < this.allQuestions.length - 1) {
				this.displayQuestion(++this.currentPosition);
				this.setNavButtonsState();
			}

			// on last question, enable submit
			if(this.currentPosition == this.allQuestions.length -1){

				var btnSubmit = document.getElementById('btnSubmit');

				btnSubmit.disabled = false;
			}
		} else {
			alert("Please make a choice");
		}
	},

	submitHandler: function (e) {
		e.preventDefault();
		if (this.userMadeSelection()) {
			this.saveChoice();
			this.calculateScore();
			alert("Your final score: " + this.score);

		} else {
			alert("Please select a choice");
		}

	},

	setNavButtonsState: function () {

		var btnPrev = document.getElementById('btnPrev');
		var btnNext = document.getElementById('btnNext');

		if (this.currentPosition == 0) {
			btnPrev.disabled = true;
		}

		if (this.currentPosition == this.allQuestions.length - 1) {
			btnNext.disabled = true;
		}
	},

	init: function () {

		// show the first question

		this.displayQuestion(this.currentPosition);


		var btnSubmit = document.getElementById('btnSubmit');

		btnSubmit.disabled = true;

		this.setNavButtonsState();

	}


};

// start the quiz
(function ($) {
	"use strict";
	$(function () {

		// attach event handlers
		$('a#btnPrev').on('click', function () {
			quiz.prevHandler();
		});

		$('a#btnNext').on('click', function () {
			quiz.nextHandler();
		});

		$('input#btnSubmit').on('click', function (e) {
			quiz.submitHandler(e);
		});

		quiz.init();
	});
}(jQuery));


