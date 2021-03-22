const startBox = document.querySelector(".start-box");
const startBtn = document.querySelector(".start-btn .start");
const infoBox = document.querySelector(".info-box");
const quitBtn = infoBox.querySelector(".btns .quit");
const continueBtn = infoBox.querySelector(".btns .restart");
const contactBox = document.querySelector('.contact-box');
const contactBtn = document.querySelector("#contact")
const quizBox = document.querySelector('.quiz-box');
const nextBtn = document.querySelector(".quiz-box .next-btn");
const queCounter = quizBox.querySelector(".total-que");
const queText = document.querySelector(".que-text");
const optionList = document.querySelector(".option-list");
const timeCount = quizBox.querySelector(".timer .timer-sec");
const hint = document.querySelector(".hint");
//const timeLine = quizBox.querySelector("header .time-line");
const timeOff = quizBox.querySelector("header .timer-text");
const resultBox = document.querySelector(".result-box");
const restartQuiz = resultBox.querySelector(".btns .restart");
const quitQuiz = resultBox.querySelector(".btns .quit");


//if start Quiz is clicked

startBtn.onclick = ()=> {
   infoBox.classList.add("activeInfo"); //show the info box
   startBox.classList.remove("activeStart")
}

quitBtn.onclick = ()=> {
   infoBox.classList.remove("activeInfo"); //hide the info box
}

//if contactBtn is clicked
contactBtn.onclick = ()=> {
    infoBox.classList.remove('activeInfo');
    contactBox.classList.add("activeContact"); 
}

// if continue btn is clicked
continueBtn.onclick = () => {
    infoBox.classList.remove('activeInfo');
    startBox.classList.remove("activeStart")
    quizBox.classList.add("activeQuiz");
    showQuestions(0);
    totalQueCount(1);
    startTimer(10);
    //startTimerLine(0);
   
}

let queCount = 0; //questions from the Questions array in question.js
let queNum = 1;
let counter;
let counterLine;
let timeValue = 10;
let widthValue = 0;
let userScore = 0;

restartQuiz.onclick = () => {
    quizBox.classList.add("activeQuiz");
    resultBox.classList.remove("activeResult");
    let queCount = 0; //questions from the Questions array in question.js
    let queNum = 1;
    let timeValue = 10;
    let widthValue = 0;
    let userScore = 0;
    showQuestions(queCount);
    totalQueCount(queNum);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    //startTimerLine(widthValue);
    hint.innerHTML = ""; 
    nextBtn.style.display = "none" 
     timeOff.textContent = "Time Left:"
}

quitQuiz.onclick = () => {
    window.location.reload();
}

//If Next btn is clicked
nextBtn.onclick = () => {
  if(queCount < questions.length -1) {
        queCount++;
        queNum++;
        showQuestions(queCount);
        totalQueCount(queNum);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        //startTimerLine(widthValue);
        hint.innerHTML = ""; 
         nextBtn.style.display = "none" 
          timeOff.textContent = "Time Left:"
    } else {
        clearInterval(counter);
        clearInterval(counterLine)
        alert("Questions completed!")
        showResultBox();
    }
}

function totalQueCount(index) {
    let questionCountTag = '<span><p>'+ queNum + '</p> of <p>' + questions.length + '</p> Questions </span>'
    queCounter.innerHTML = questionCountTag;
}


function showQuestions(index){
   
    let queTag = '<span>' + questions[index].num + ". " + questions[index].question + '</span>';
    let optionTag = '<div class="option"> <span> '+ questions[index].options[0] + '</span></div>'
                    + '<div class="option"> <span> '+ questions[index].options[1] + '</span></div>'
                    + '<div class="option"> <span> '+ questions[index].options[2] + '</span></div>'
                    + '<div class="option"> <span> '+ questions[index].options[3] + '</span></div>';

    queText.innerHTML = queTag; 
    optionList.innerHTML = optionTag; 
    const option = optionList.querySelectorAll(".option");
  
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)")
        }
 
}  

let tickIcon = '<div class="icon tick"> <i class="fa fa-check"></i></div>';
let crossIcon = '<div class="icon cross"> <i class="fa fa-times"></i></div>';


function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[queCount].answer;
    let allOptions = optionList.children.length;
       
    if(userAns.trim() == correctAns.trim()){
        answer.classList.add("correct")
         userScore +=1;
        console.log(userScore)
        console.log(" answer is correct");
        answer.insertAdjacentHTML("beforeend", tickIcon);
        nextBtn.style.display = "block"

    hint.innerHTML = '<span>' + 'You are correct! \n' + questions[queCount].hint + '</span>'
    }else {
        answer.classList.add("correct")
        answer.classList.add("incorrect")
        console.log("wrong");
        hint.innerHTML = '<span>' + 'You are wrong! \n' + questions[queCount].hint + '</span>'
        answer.insertAdjacentHTML("beforeend", crossIcon);
        

    // Automatically select correct answer if answer is incorrect

    
     for (let i = 0; i < allOptions; i++) {
       if(optionList.children[i].textContent.trim() == correctAns.trim()){
         optionList.children[i].setAttribute("class", "option correct");
         optionList.children[i].insertAdjacentHTML("beforeend", tickIcon);
        
       } 
}  



// for (let i = 0; i < option.length; i++) {
//         option[i].setAttribute("onclick", "optionSelected(this)") THIS IS WHAT IS CAUSING THE PROBLEM!!! LINE 122
//         }
   // To disable all options
        // for (let i = 0; i < allOptions.length; i++) {
        //     optionList.children[i].classList.add("disabled");
        // };  


    // optionList.addEventListener("onClick", function () {
    //    // optionList.removeEventListener("onClick", optionSelected, true)
    //    alert("clicked")
    // })

     nextBtn.style.display = "block"
}

}
 

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
         timeCount.textContent = time;
         time--;
         //To add an extra zero to the count down number
         if(time < 9){
             let addZero = timeCount.textContent;
             timeCount.textContent = "0" + addZero;
         }
         // To make the timer stop counting as soon as it gets to 0,
         if(time < 0){
             clearInterval(counter);
             timeCount.textContent = "00";
             timeOff.textContent = "Time Up!"

        let correctAns = questions[queCount].answer;
        let allOptions = optionList.children.length;
         
         for (let i = 0; i < allOptions; i++) {
       if(optionList.children[i].textContent.trim() == correctAns.trim()){
         optionList.children[i].setAttribute("class", "option correct");
         optionList.children[i].insertAdjacentHTML("beforeend", tickIcon);
         hint.innerHTML = '<span>' + 'Your time is up. \n' + questions[queCount].hint + '</span>'
            } 
       }
        for (let i = 0; i < allOptions.length; i++) {
         optionList.children[i].classList.add("disabled");
    };  

     nextBtn.style.display = "block"
            }
         }  
    }


// function startTimerLine(time){
//     counterLine = setInterval(timer, 17);
//     function timer(){
//          time+=1;
//          timeLine.style.width = time + "px";
//          if(time > 649){
//              clearInterval(counterLine);
//          }
//     }  
// }

function showResultBox(){
    infoBox.classList.remove('activeInfo');
    startBox.classList.remove("activeStart")
    quizBox.classList.remove("activeQuiz");
    resultBox.classList.add("activeResult");
    const scoreText = resultBox.querySelector(".score-text");
    if(userScore <= 5){
        let scoreTag = '<span> Sorry, you got only <p>' + userScore + '</p>  out of <p>' + questions.length + " questions. Study your Bible. " + '</p></span>';
        
        scoreText.innerHTML = scoreTag;
    } else if(userScore <= 10){
        let scoreTag = '<span> Well done, you got <p>' + userScore +'</p> out of <p>' + questions.length + " questions. Study your Bible. " + '</p></span>';
        scoreText.innerHTML = scoreTag;
    } else{
        let scoreTag = '<span> Bravo, you got <p>' + userScore +'</p> out of <p>' + questions.length + " questions.  Keep studying your Bible " + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

