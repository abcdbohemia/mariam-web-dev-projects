const quizData = [
    {
        question: "What is the capital of France?",
        choices: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswer: "Paris"
    },
    {
        question: "Which planet is known as the 'Red Planet'?",
        choices: ["Mars", "Jupiter", "Venus", "Saturn"],
        correctAnswer: "Mars"
    },
    {
        question: "What is the chemical symbol for water?",
        choices: ["wo", "Wa", "H20", "H02"],
        correctAnswer: "H20"
    },
    {
        question: "Who painted the Mona Lisa?",
        choices: ["Vincent can Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
        correctAnswer: "Leonardo da Vinci"
    },
];

// References to DOM Elemets 
const quizContainer = document.getElementById('quiz-container');
const questionEl = document.getElementById('question');
const answerButtonsEl = document.getElementById('answer-buttons');
const submitButton = document.getElementById('submit-btn');

// State Management
let currentQuestionIndex = 0;
let score = 0;

//Quiz Display Function           
function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    answerButtonsEl.innerHTML = '';
                              // add new DOM  button elements
    currentQuestion.choices.forEach(choice => {
        const button = document.createElement('button'); 
        button.textContent = choice;
        button.classList.add('answer-btn'); //adding css
        button.addEventListener('click', () => { 
            document.querySelectorAll('.answer-btn').forEach(btn => // each indiv button element with this class
            btn.classList.remove('selected')); 
            button.classList.add('selected');
        });
        answerButtonsEl.appendChild(button); 
    });
}

function checkAnswer() {
    const selectedButton = document.querySelector('.answer-btn.selected');
    if(!selectedButton) {
        alert('Please select an answer!')
        return; //return is necessary to stop the rest of the function from executing 
    }

    if (selectedButton.textContent === quizData[currentQuestionIndex].correctAnswer)
    {
    score ++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) { //length of 0-3 is 4
        loadQuestion();
    } else {
        quizContainer.style.backgroundColor = ' #f4f4f4'
        quizContainer.innerHTML = `
        <h2 style="color:  #66a1df;">Quiz Completed!</h2>
        <p style= "color:  #66a1df;" >You scored ${score} out of ${quizData.length}!</p>
        <button style="background-color:  #f4827e; color:  #f4f4f4; padding: 20px 40px; 
        border-color:transparent !important; cursor: pointer;" onclick="location.reload()">Play Again</button> 
        `;   
    }
}


// Initialization and event listeners
loadQuestion();
submitButton.addEventListener('click', checkAnswer);

