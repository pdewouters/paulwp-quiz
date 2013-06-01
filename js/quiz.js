var quiz = {
	allQuestions: [
		{
			question     : "Who is Prime Minister of the United Kingdom?",
			choices      : ["David Cameron", "Gordon Brown", "Winston Churchill", "Tony Blair"],
			correctAnswer: 0
		},
		{
			question     : "Who starred in Terminator 2?",
			choices      : ["Tim Robbins", "Arnold Schwarzenegger", "Bruce Willis", "Jim Carrey"],
			correctAnswer: 1
		},
		{
			question     : "What is the capital of Mongolia?",
			choices      : ["Konakry", "Timbuctu", "Ulan Bator", "Sofia"],
			correctAnswer: 2
		},
		{
			question     : "Who is the strongest superhero?",
			choices      : ["Spiderman", "Batman", "Superman", "Wonder Woman", "Thor" ],
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
		"use strict";
		// get choices
		var quizForm = document.getElementById('quiz-form');
		var choices = quizForm.elements.choice;

		for (var i = 0; i < choices.length; i++) {
			if (choices[i].checked) {
				return true;
			}
		}

		return false;
	},

	saveChoice: function (e) {
		"use strict";

		// get choices
		var quizForm = document.getElementById('quiz-form');
		var choices = quizForm.elements.choice;
		var userChoice;

		for (var i = 0; i < choices.length; i++) {
			choices[i].parentNode.className = "choice";
			if (choices[i].checked) {
				userChoice = parseInt(choices[i].value, 10);

				// add styles
				choices[i].parentNode.className = "currentChoice";
			}
		}

		this.userChoices[this.currentPosition] = userChoice;
	},

	displayQuestion: function (position) {
		"use strict";

		// get the form element
		var quizForm = document.getElementById('quiz-form');

		// get the legend element, where we display the question
		var legend = quizForm.getElementsByTagName('legend');

		// insert the question text
		legend[0].appendChild(document.createTextNode(this.allQuestions[position].question));

		// get the choices div
		var choicesContainer = document.getElementById('choices');

		// clear choices
		while(choicesContainer.hasChildNodes()) {
			choicesContainer.removeChild(choicesContainer.lastChild);
		}

		// display choices
		for (var i = 0; i < this.allQuestions[position].choices.length; i++) {

			// create the wrapper div
			var radioDiv = document.createElement('div');
			radioDiv.className = "choice";
			choicesContainer.appendChild(radioDiv);

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
			label.appendChild(document.createTextNode(this.allQuestions[position].choices[i]));
			label.setAttribute('for', i.toString());

			// add the choice to the container
			radioDiv.appendChild(choice);
			radioDiv.appendChild(label);

			// if there's a user choice for this, check it
			if (i === this.userChoices[position]) {
				choice.checked = true;
			}
		}

	},

	calculateScore: function () {
		"use strict";

		// first reset score to zero
		this.score = 0;
		for (var i = 0; i < this.allQuestions.length; i++) {
			if (this.userChoices[i] === this.allQuestions[i].correctAnswer) {
				this.score++;
			}
		}
	},

	prevHandler: function () {
		"use strict";

		// check if user selected something
		if (this.userMadeSelection()) {
			// if there is a previous question, display it
			if (this.currentPosition > 0) {
				this.displayQuestion(--this.currentPosition);
				this.setNavButtonsState();
			}
		} else {
			window.alert("Please make a choice");
		}


	},

	nextHandler: function () {
		"use strict";

		// check if user selected something
		if (this.userMadeSelection()) {
			// display next question
			if (this.currentPosition < this.allQuestions.length - 1) {
				this.displayQuestion(++this.currentPosition);
				this.setNavButtonsState();
			}

			// on last question, enable submit
			if (this.currentPosition === this.allQuestions.length - 1) {
				var btnSubmit = document.getElementById('btnSubmit');
				btnSubmit.disabled = false;
			}
		} else {
			window.alert("Please make a choice");
		}
	},

	submitHandler: function (e) {
		"use strict";

		e.preventDefault();

		if (this.userMadeSelection()) {
			this.calculateScore();
			window.alert("Your final score: " + this.score);
		} else {
			window.alert("Please select a choice");
		}

	},

	setNavButtonsState: function () {
		"use strict";

		var btnPrev = document.getElementById('btnPrev');
		var btnNext = document.getElementById('btnNext');

		if (this.currentPosition === 0) {
			btnPrev.disabled = true;
		}

		if (this.currentPosition === this.allQuestions.length - 1) {
			btnNext.disabled = true;
		}
	},

	init: function () {
		"use strict";

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

		$('#quiz-form').on('click', 'input[type=radio]', function (e) {
			quiz.saveChoice(e);
		});

		// show the first question
		this.displayQuestion(this.currentPosition);

		var btnSubmit = document.getElementById('btnSubmit');

		btnSubmit.disabled = true;

		this.setNavButtonsState();

	}


};

(function ($) {
	"use strict";
	$(function () {

		// start the quiz
		quiz.init();

	});
}(jQuery));