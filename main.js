const showScore = document.querySelector(".score");
const road = document.querySelector(".road");

const myCar = document.querySelector(".myCar");
const leftBtn = document.querySelector(".leftBtn");
const rightBtn = document.querySelector(".rightBtn");

const startGamePopup = document.getElementById("startGamePopupContainer");
const startBtn = document.getElementById("startBtn");

const endGamePopup = document.getElementById("endGamePopupContainer");
const exitBtn = document.getElementById("exitBtn");
const replayBtn = document.getElementById("replayBtn");
const showScorePopup = document.getElementById("showScorePopup");

let score = 0;

let topPx = 0;
let newCar;
let remain = 10;
let myCarTransform = 60;

/* Car Controller Start */

const myCarHandler = (value) => {
   myCarTransform = myCarTransform + value;
   myCar.style.transform = `translateX(${myCarTransform}px)`;

   if (myCarTransform < 5) {
      leftBtn.setAttribute("disabled", true);
   } else if (myCarTransform > 115) {
      rightBtn.setAttribute("disabled", true);
   } else {
      leftBtn.removeAttribute("disabled", false);
      rightBtn.removeAttribute("disabled", false);
   }

};

leftBtn.addEventListener("click", () => {
   myCarHandler(-8);
});

rightBtn.addEventListener("click", () => {
   myCarHandler(8);
});

/* Main Function Start */

const mainFunc = () => {

   newCar = document.createElement("div");
   newCar.setAttribute("class", "newCar");
   newCar.style.backgroundImage = `url(cars/c${Math.floor(Math.random() * 6) + 1}.png)`;
   const newCarTransform = Math.floor(Math.random() * 120);
   newCar.style.transform = `translateX(${newCarTransform}px)`;
   road.appendChild(newCar);

   const newCarMov = setInterval(() => {
      newCar.style.top = `${topPx}px`;
      topPx++;
      
      checkCollision();

      if (topPx == 550) {
         score++;
         const scoreWith0 = score < 10 ? "0" + score : score;
         showScore.innerHTML = "Score : <br>" + scoreWith0;
      }

      if (topPx == 720) {
         road.removeChild(newCar);
         topPx = 0;
         remain += 10;
         mainFunc();
      }
   }, remain);

};

/* Check Collision */

const checkCollision = () => {
  const myCarRect = myCar.getBoundingClientRect();
  const newCarRect = newCar.getBoundingClientRect();

  if (
    myCarRect.left < newCarRect.right &&
    myCarRect.right > newCarRect.left &&
    myCarRect.top < newCarRect.bottom &&
    myCarRect.bottom > newCarRect.top
  ) {
    showEndGamePopup();
  }
}

/* Hide start Game Popup */

startBtn.addEventListener('click', () => {
   startGamePopup.style.display = "none";
   mainFunc();
});

/* Show end Game Popup */

const showEndGamePopup = () => {
   endGamePopup.style.display = "block";
   road.removeChild(newCar);
   topPx = 0;
   
   const scoreWith0 = score < 10 ? "0" + score : score;
   showScorePopup.textContent = "Your score is : " + scoreWith0;
   
   exitBtn.addEventListener('click', () => {
      location.reload();
      window.history.back();
   });
   
   replayBtn.addEventListener('click', () => {
      location.reload();
   });

};