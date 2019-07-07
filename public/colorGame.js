//Selectors for required color blocks, buttons, text, jumbotron
const colorBlockAll = document.getElementsByClassName("colorBlock");
const colorBlockEasy = document.getElementsByClassName("easy");
const colorBlockMedium = document.getElementsByClassName("medium");
const colorBlockHard = document.getElementsByClassName("hard");
const newColorBtn = document.getElementById("newColors");
const jumbotron = document.getElementsByClassName("jumbotron");
const jumbotronR = document.getElementById("jumboR");
const jumbotronG = document.getElementById("jumboG");
const jumbotronB = document.getElementById("jumboB");
var selectedBlock = 0;
var answerR = 0;
var answerG = 0;
var answerB = 0;
var difficulty = 2;

//Generates random RGB value
function generateRandomRGB() {
    return (Math.floor(Math.random() * 250) + 1);
}

//Generates random block as the answer block. Takes parameter to select random of 9 blocks,
//random of 6 blocks, random of 3 blocks.
function generateRandomColorBlock(option) {
    var answerBlock = 0;
    if (option === 1) {
        answerBlock = Math.floor((Math.random() * 9)) + 1;
    }
    else if (option === 2) {
        answerBlock = Math.floor((Math.random() * 6)) + 1;
    }
    else if (option === 3) {
        answerBlock = Math.floor((Math.random() * 3)) + 1;
    }
    return answerBlock;
}

function setAnswerBlock(option) {
  //Selects block as the answer block based on difficulty range
  if (option === 1){
    selectedBlock = generateRandomColorBlock(3) - 1;
  }
  else if (option === 2){
    selectedBlock = generateRandomColorBlock(2) - 1;
  }
  else if (option === 3){
    selectedBlock = generateRandomColorBlock(1) - 1;
  }
}

//Sets the RGB background colors. Takes an element and integers as arguments.
//Element's background color is changed, integer determines option used.
//Second integer determines difficulty and where the answer block is located.
function setRGB(element, option) {
    var rVal;
    var gVal;
    var bVal;

    if (option === 1) {
        for (var i = 0; i < element.length; i++) {
            rVal = generateRandomRGB();
            gVal = generateRandomRGB();
            bVal = generateRandomRGB();
            //If selected block RGB is set, also set title values for user to guess
            if (selectedBlock === i) {
                jumbotronR.textContent = rVal;
                jumbotronG.textContent = gVal;
                jumbotronB.textContent = bVal;
                answerR = rVal;
                answerG = gVal;
                answerB = bVal;
            }
            //Sets element's background color to randomly generated RGB values
            element[i].style.backgroundColor = "rgb(" + rVal + "," + gVal + "," + bVal + ")";
        }
    }
    //Sets random colors for the element selected without changing jumbotron text
    else if (option === 2) {
        rVal = generateRandomRGB();
        gVal = generateRandomRGB();
        bVal = generateRandomRGB();
        element.style.backgroundColor = "rgb(" + rVal + "," + gVal + "," + bVal + ")";
    }
}

//Adjusts block when clicked, fades block out
function adjustBlock() {
    //If answer block is not selected, fade block out
    if (this.style.getPropertyValue("background-color") !== "rgb(" + answerR + ", " + answerG + ", " + answerB + ")") {
        $(this).fadeOut(500);
    }
    else {
        //Fades out all blocks if answer block is selected
        for (var i = 0; i < colorBlockAll.length; i++) {
            $(colorBlockAll[i]).fadeOut(500);
        }
        //Fades answer block in and animates vertical motion
        $(this).fadeIn(500);
        $(this).animate({ margin: "20%" }, 600);
        $(this).animate({ margin: "1.1%" }, 600);

        setTimeout(function () {
          setRGB(colorBlockAll, 1);
          setAnswerBlock(difficulty);
        }, 3000);

        //Resets colors to new random colors
        if (difficulty === 3){
          setTimeout(function () {
              for (var i = 0; i < colorBlockAll.length; i++) {
                  $(colorBlockAll[i]).fadeIn(600);
              }
          }, 3000);
        }
        else if (difficulty === 2){
          setTimeout(function () {
              for (var i = 0; i < colorBlockAll.length; i++) {
                  $(colorBlockEasy[i]).fadeIn(600);
                  $(colorBlockMedium[i]).fadeIn(600);
              }
          }, 3000);
        }
        else if (difficulty === 1){
          setTimeout(function () {
              for (var i = 0; i < colorBlockAll.length; i++) {
                  $(colorBlockEasy[i]).fadeIn(600);
              }
          }, 3000);
        }
    }
}

//Set initial jumbotron color and all color blocks
setRGB(jumbotron, 1);
setRGB(colorBlockAll, 1);
setAnswerBlock(difficulty);
$(".hard").fadeOut();

//Adds event listener for click for all color blocks
for (var i = 0; i < colorBlockAll.length; i++) {
    colorBlockAll[i].addEventListener("click", adjustBlock);
}

//Adds click functionality to the new color button, setting a new background color
//for the button and generates new colors for all color blocks
$(newColorBtn).click(function () {
    setRGB(colorBlockAll, 1);
    setRGB(newColorBtn, 2);
    setRGB(jumbotron, 1);
    setAnswerBlock(difficulty);

    if (difficulty === 3){
      for (var i = 0; i < colorBlockAll.length; i++) {
          $(colorBlockAll[i]).fadeIn(1000);
      }
    }
    else if (difficulty === 2){
      for (var i = 0; i < colorBlockAll.length; i++) {
          $(colorBlockEasy[i]).fadeIn(1000);
          $(colorBlockMedium[i]).fadeIn(1000);
      }
    }
    else if (difficulty === 1){
      for (var i = 0; i < colorBlockAll.length; i++) {
          $(colorBlockEasy[i]).fadeIn(1000);
      }
    }
});

//Difficulty selectors for Hard, Medium, Easy
$("#hardOption").on("click", function() {
  //Set difficulty and fade in medium/hard rows
  difficulty = 3;
  $(colorBlockHard).fadeIn(1000);
  $(colorBlockMedium).fadeIn(1000);
  $(colorBlockEasy).fadeIn(1000);

  //Set new colors for all with answer block in range
  setRGB(colorBlockAll, 1);
  setAnswerBlock(difficulty);

  //Change classes for dropdown menu
  $("#hardOption").addClass("active");
  $("#mediumOption").removeClass("active");
  $("#easyOption").removeClass("active");
});

$("#mediumOption").on("click", function() {
  //Set difficulty and fade in medium rows
  difficulty = 2;
  $(colorBlockEasy).fadeIn(1000);
  $(colorBlockMedium).fadeIn(1000);

  //Set new colors for all with answer block in range
  setRGB(colorBlockAll, 1);
  setAnswerBlock(difficulty);

  //Change classes for dropdown menu
  $("#hardOption").removeClass("active");
  $("#mediumOption").addClass("active");
  $("#easyOption").removeClass("active");

  //Fade out hard row
  $(".hard").fadeOut(500);
});

$("#easyOption").on("click", function() {
  //Set difficulty
  difficulty = 1;
  $(colorBlockEasy).fadeIn(1000);

  //Set new colors for all with answer block in range
  setRGB(colorBlockEasy, 1);
  setAnswerBlock(difficulty);

  //Change classes for dropdown menu
  $("#hardOption").removeClass("active");
  $("#mediumOption").removeClass("active");
  $("#easyOption").addClass("active");

  //Fade out hard and medium rows
  $(".hard").fadeOut(500);
  $(".medium").fadeOut(500);
});

//Option to cheat and reveal the answer block
$("#cheatOption").on("click", function(){
  for (let i = 0; i < colorBlockAll.length; i++)
  {
    if (colorBlockAll[i].style.getPropertyValue("background-color") !== "rgb(" + answerR + ", " + answerG + ", " + answerB + ")") {
        $(colorBlockAll[i]).fadeOut(500);
    }
  }
});
