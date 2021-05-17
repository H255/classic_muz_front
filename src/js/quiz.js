const startBtn = document.getElementById("start_btn");
console.log(startBtn, 'startBtn')
const nextBtn = document.getElementById("next_btn");
console.log(nextBtn, 'nextBtn')
const questionContainerElement = document.getElementById("question_container");
console.log(questionContainerElement, 'questionContainerElement')
const questionElement = document.getElementById("question");
console.log(questionElement, 'questionElement')
const answerButtonsElement = document.getElementById("answer_btns");
console.log(answerButtonsElement, 'answerButtonsElement')
const pointsContainer = document.getElementsByClassName("points");
console.log(pointsContainer, 'pointsContainer')
const finishTxt = document.getElementById("finish_txt");
console.log(finishTxt, 'finishTxt')
const readyContainer = document.getElementById("readyContainer");
console.log('ready', readyContainer);
let shuffledQuestions, currentQuestionIndex, points = 0;

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestions();
});

function startQuiz() {
    console.log('started');
    startBtn.classList.add('hide');
    shuffledQuestions = questions.sort();
    currentQuestionIndex = 0;
    points = 0;
    console.log(points,'points')
    pointsContainer.innerText = `Միավորներ: ${points}`;
    answerButtonsElement.classList.remove('hide');
    console.log(`points ${points}`);
    readyContainer.classList.add('hide');
    finishTxt.classList.add('hide');
    questionContainerElement.classList.remove('hide');
    setNextQuestions();
}

function setNextQuestions() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextBtn.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    if (correct) {
        console.log(correct);
        pointsContainer.innerText = `Միավորներ: ${++points}`;
        if (points === questions.length) {
            finishTxt.classList.remove('hide');
            finishTxt.innerHTML = `
            <p>Շնորհավորում եմ դուք պատասխանել եք բոլոր հարցերին ճիշտ &#128150;: Վայելեք Արամ Խաչատրյանի «Գայանե»-ն</p>
            <iframe width="320" height="240" src="https://www.youtube.com/embed/VLlXaxgeiXY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>    
            `
        }
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextBtn.classList.remove('hide');
    } else {
        startBtn.innerText = 'Սկսել նորից';
        startBtn.classList.add('restart');
        startBtn.classList.remove('hide');
        answerButtonsElement.classList.add('hide');
        questionContainerElement.classList.add('hide');
        document.querySelector('iframe').remove();
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [{
        question: 'Հարց 1․ Ավստրիացի կոմպոզիտոր, ով ապրել է ընդամենը 32 տարի: Նա գրել է ինը սիմֆոնիա, շուրջ 600 վոկալ կոմպոզիցիաներ, ինչպես նաև մեծ թվով կամերային և մենակատար դաշնամուրային երաժշտություն: Ո՞ւմ մասին է խոսքը:',
        answers: [{
                text: 'Անտոնիո Վիվալդի',
                correct: false
            },
            {
                text: 'Յոհաննես Բրամս',
                correct: false
            },
            {
                text: 'Վոլֆգանգ Ամադեուս Մոցարտ',
                correct: false
            },
            {
                text: 'Ֆրանց Շուբերտ',
                correct: true
            }
        ]
    },
    {
        question: 'Հարց 2․ Ո՞վ է գրել «Լուսնի» սոնատը։',
        answers: [{
                text: 'Պյոտր Չայկովսկի',
                correct: false
            },
            {
                text: 'Լյուդվիգ վան Բեթհովեն',
                correct: true
            },
            {
                text: 'Վոլֆգանգ Ամադեուս Մոցարտ',
                correct: false
            },
            {
                text: 'Յոհան Սեբաստիան Բախ',
                correct: false
            }
        ]
    },
    {
        question: 'Հարց 3․ Այս կտորն այժմ հայտնի է որպես «Ave Maria!», Չնայած այն ի սկզբանե կոչվում էր «Էլենի երրորդ երգ»: Ո՞վ է դրա հեղինակը:',
        answers: [{
                text: 'Ֆրանց Շուբերտ',
                correct: true
            },
            {
                text: 'Ֆրեդրիխ Շոպեն',
                correct: false
            },
            {
                text: 'Յոհաննես Շտրաուս',
                correct: false
            },
            {
                text: 'Անտոնիո  Վիվալդի',
                correct: false
            }
        ]
    },
    {
        question: 'Հարց 4․ Բեթհովենի երրորդ սիմֆոնիան կոչվում է նաև.',
        answers: [{
                text: '«Լուսնի սոնատ»',
                correct: false
            },
            {
                text: '«Աթենքի ավերակներ»',
                correct: false
            },
            {
                text: '«Էրոիկա»',
                correct: true
            },
            {
                text: '«Սուսերապար»',
                correct: false
            }
        ]
    },
    {
        question: 'Հարց 5․ Չայկովսկու ինչ կոմպոզիցիա է հնչում «Շելկունչիկը» բալետում?',
        answers: [{
                text: 'Կախարդիչ',
                correct: false
            },
            {
                text: 'Սլավոնական երթ',
                correct: false
            },
            {
                text: 'Ամառ',
                correct: false
            },
            {
                text: 'Ծաղիկների վալս',
                correct: true
            }
        ]
    },
    {
        question: 'Հարց 6․ Այս կոմպոզիտորներից ո՞վ էր խուլ:',
        answers: [{
                text: 'Բախ',
                correct: false
            },
            {
                text: 'Բեթհովեն',
                correct: true
            },
            {
                text: 'Շուբերտ',
                correct: false
            },
            {
                text: 'Դինար',
                correct: false
            }
        ]
    },
    {
        question: 'Հարց 7․ Երբ է մահացել Արամ Խաչատրյանը',
        answers: [{
                text: '1978թ․, Մայիսի 1',
                correct: true
            },
            {
                text: '1903թ․, Մայիսի 1',
                correct: false
            },
            {
                text: '1921թ․, Մայիսի 24',
                correct: false
            },
            {
                text: '1903թ․, Հունիսի 6',
                correct: false
            }
        ]
    },
    {
        question: 'Հարց 8․ Ո՞րն է Արամ Խաչատրյանի երկրորդ բալետը։',
        answers: [{
                text: '«Սպարտակը»',
                correct: false
            },
            {
                text: '«Երջանկություն»',
                correct: false
            },
            {
                text: '«Գայանեն»',
                correct: true
            },
            {
                text: '«Սուսերապար»',
                correct: false
            }
        ]
    },
    {
        question: 'Հարց 9․ Որ՞ն է Արամ Խաչատրյանի բնօրինակ անունը։',
        answers: [{
                text: 'Արամ Գագիկի Խաչատրյան',
                correct: false
            },
            {
                text: 'Արամ Եղիայի Խաչատրյան',
                correct: true
            },
            {
                text: 'Արամ Խաչիկի',
                correct: false
            },
            {
                text: 'Արամ Խաչատրյանց',
                correct: false
            }
        ]
    }
]