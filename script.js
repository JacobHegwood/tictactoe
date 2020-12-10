// score variables

let computer_score = 0;
let user_score = 0;

// current turn

let computer_turn = false;

// gamepad

let game_pad = ["","","",
                "","","",
                "","",""];

// set notification

const setNotification = (text) => {
    document.getElementById("notification_box").innerHTML = text;
}

// loop through and update gamepad function

const updateGamepad = () => {
    game_pad.forEach((val, i) => {
        // get value from the DOM and save to the state
        const j = i + 1;
        document.getElementById("gamepad_button_" + j).innerHTML = game_pad[i];
    });
}

const updateScore = () => {
    document.getElementById("computer").lastElementChild.innerHTML = computer_score;
    document.getElementById("player").lastElementChild.innerHTML = user_score;
}

// update game state with the pressed button

const buttonPress = (id) => {
    if (game_pad[id-1] === "") {
        computer_turn ? game_pad[id-1] = "O" : game_pad[id-1] = "X";
        updateGamepad();
        checkWin();
        nextTurn();
    }
}

// Button listeners

const setListeners = () => {
    game_pad.forEach((val, i) => {
        const j = i + 1;
        document.getElementById("gamepad_button_" + j).addEventListener("click", () => buttonPress(j));
    });

    // set up hard reset
    document.getElementById("hardreset").addEventListener("click", () => {
        resetScore();
        resetGamepad();
        setNotification("Press any button to begin.");
    });
}

// Start game

const startGame = () => {
    setListeners();
}

// Determine next turn and take appropriate action

const nextTurn = () => {
    if (computer_turn === true) {
        computer_turn = false;
    } else {
        computer_turn = true;
        computerMove();
    }
}

// computer move
// I plan to use more sophisticated logic in the future, but for now let's just choose a random free button

const computerMove = () => {
    let next_move;
    let available_buttons = [];

    for (i = 0; i < game_pad.length; i++) {
        if (game_pad[i] === "") {
            available_buttons.push(i);
        }
    }

    let calculation = Math.floor(Math.random() * available_buttons.length);
    next_move = available_buttons[calculation];

    buttonPress(next_move+1);
}

// check win conditions

const checkWin = () => {
    let letter;
    computer_turn ? letter = "O" : letter = "X";

    const winConditions = [
        [0,1,2],
        [0,4,8],
        [0,3,6],
        [1,4,7],
        [2,4,6],
        [2,5,8],
        [3,4,5],
        [6,7,8]
    ]

    for (i = 0; i < winConditions.length; i++) {
        if (game_pad[winConditions[i][0]] === letter && game_pad[winConditions[i][1]] === letter && game_pad[winConditions[i][2]] === letter) {
            if (computer_turn) {
                computer_score++;
                setNotification("Computer Won.")
            } else {
                user_score++;
                setNotification("User Won.")
            }
            resetGamepad();
        }
    }

    // check for draw
    if (!game_pad.includes("")) {
        resetGamepad();
        setNotification("Draw. Try Again.");
    }
}

// reset score

const resetScore = () => {
    computer_score = 0;
    user_score = 0;
}

// reset the game and add to score when someone wins

const resetGamepad = () => {
    game_pad = ["","","",
                "","","",
                "","",""];
    updateGamepad();
    updateScore();
    computer_turn = false;
}

startGame();