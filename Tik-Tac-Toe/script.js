//First we want to access all the elements.
let boxes = Array.from(document.getElementsByClassName("box"))//. or # comes on querselectors 
let resetBtn = document.getElementById("reset")
let msgcon = document.querySelector(".msgcon")
let msg = document.querySelector("#msg");  //no Array.from as it is single element.
let msg2 = document.querySelector("#msg2")

// document.getElementsByClassName("box") returns an HTMLCollection, not an array. An HTMLCollection does not have the forEach method directly.
// You need to convert it to an array(multiple elements in the class) before using forEach.

// alternate X or O

let turnO = true

// we have to store winning patterns so that's why we made 2D array.

const winPatterns = [ // indexes of array for winning pattern
    [0, 1, 2], [0, 3, 6], [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6], [2, 5, 8],
    [3, 4, 5], [6, 7, 8]
]
let clickCount = 0;
let winnerFound = false;
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("Box was clicked!");
        clickCount++
        console.log(clickCount);

        // box.innerText= "abcd";
        if (turnO) { //Player O
            box.innerText = "O"
            turnO = false
        }
        else { //Player X
            box.innerText = "X"
            turnO = true
        }
        box.disabled = true; //to fix the X/O in box as it changes on it clicking again..
        checkWinner();

        if (winnerFound) {
            return; // stop further processing if there's winner 
        }
        if (clickCount === 9 && !winnerFound) {
            // const draw=() =>{
            msg2.innerText = `Match Draw`
            msg2.classList.remove("hide")
            disableBoxes();
        }

    })
});
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const showWinner = ((Winner) => {
    msg.innerText = `Congratulations, Winner is ${Winner}`
    msgcon.classList.remove("hide")
    disableBoxes();
})

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }

}

const replay = () => {
    enableBoxes();
    msgcon.classList.add("hide")
    msg2.classList.add("hide")
    clickCount = 0
    turnO = true;
    winnerFound = false //it's necessary otherwise it'll keep executing if(true) block of code.
}

resetBtn.addEventListener("click", () => {
    alert("New Game Buddies!")
    replay();
})



//New function defined as to win,which will check for all positions by a fn pattern.
const checkWinner = () => {
    for (pattern of winPatterns) {
        // console.log(pattern);
        console.log(pattern[0], pattern[1], pattern[2])

        let pos1Val = boxes[pattern[0]].innerText  //to print the X/O in box.
        let pos2Va2 = boxes[pattern[1]].innerText
        let pos3Va3 = boxes[pattern[2]].innerText

        if (pos1Val != "" && pos2Va2 != "" && pos3Va3 != "") {
            if (pos1Val == pos2Va2 && pos2Va2 == pos3Va3) {
                console.log('Winner', pos1Val);
                showWinner(pos1Val)
                winnerFound = true;
                return; // exit the fun. once winner is found
            }
        }

    }
};
