(function(){
    let playerChoice = '';
    let playerHealth = 5;
    let playerScore = 0;
    let milkChoice = '';
    const milkOptions = ['lactose', 'lactose-free'];
    let gameState = 'still playing';
    // Change the text in the dialog box
    const dialogBox = document.querySelector('#dialogBox');
    const btns = document.querySelector('.btns');

    // ------------------------------Sounds----------------------------
    let bgmusic = new Audio('sounds/battle.wav');
    bgmusic.volume = 0.1;
    bgmusic.loop = true;

    let click = new Audio('sounds/eat.wav');
    // let sipmilk = new Audio('sounds/sip.wav');
    let score = new Audio('sounds/score.wav');
    let hurt = new Audio('sounds/hurt.wav');
    let win = new Audio('sounds/win.wav');
    let lose = new Audio('sounds/lose.wav');

    const volume = document.querySelector ('.volume');

    volume.addEventListener('click', function (){
        if (bgmusic.muted == true) {
            bgmusic.play();
            bgmusic.muted = false;
            volume.classList.replace("fa-volume-xmark", "fa-volume");
        } else {
            bgmusic.muted = true;
            bgmusic.pause();
            volume.classList.replace("fa-volume", "fa-volume-xmark");
        }
    });


    // ------------------------------Player Chooses an Action----------------------------

    // randomized milk choice
    function randomizeMilk (){
        const randomMilk = Math.floor(Math.random() * milkOptions.length);
        milkChoice = milkOptions[randomMilk];
    };

    function setupButtons () {
        const lactaidAction = document.querySelector('.lactaidbtn');
        const drinkAction = document.querySelector('.drinkbtn');
        // if take lactaid, register that as player choice
        lactaidAction.addEventListener('click', function() {
            playerChoice = 'took a lactaid';
            click.play();
            randomizeMilk(); // milk choice
            playerChoices();// register choices and score
            updateScore();
            checkGameState();
        });

        // if drink milk, register that as player choice
        drinkAction.addEventListener('click', function() {
            playerChoice = 'drank milk';
            click.play();
            randomizeMilk(); // milk choice
            playerChoices(); // register choices and score
            updateScore();
            checkGameState();
        });
    }

    setupButtons();
    

    // ------------------------------Choices and Outcomes----------------------------
    function logHealthScore() {
        console.log(`player's health: ${playerHealth}`);
        console.log(`player's score: ${playerScore}`);
    }

    function playerChoices () {
        if (milkChoice == "lactose-free" && playerChoice =="took a lactaid" && gameState == 'still playing') {
            playerHealth = playerHealth - 1;
            setTimeout(() => {
                hurt.play();
            }, 200);
            logHealthScore();
            dialogBox.innerHTML = `<p> The milk is <span class="milkSpan">lactose-free</span></p>
                <p> Because you <span class="playerSpan">took a lactaid</span>, you wasted your lactaid.</p>
                <p> You lose <span class="scoreSpan">-1 health</span></p>
                <p> Keep trying!</p>`;
        } else if (milkChoice == "lactose" && playerChoice == "took a lactaid" && gameState == 'still playing') {
            playerScore = playerScore + 1;
            setTimeout(() => {
                score.play();
            }, 200);
            logHealthScore();
            dialogBox.innerHTML = `<p> The milk is <span class="milkSpan">lactose</span></p>
                <p> Because you <span class="playerSpan">took a lactaid</span>, you negate the effects of the milk!</p>
                <p> You gain <span class="scoreSpan">+1 calcium</span></p>
                <p>Keep going!</p>`;
        } else if (milkChoice == "lactose-free" && playerChoice == "drank milk" && gameState == 'still playing') {
            playerScore = playerScore + 2;
            logHealthScore();
            setTimeout(() => {
                score.cloneNode().play();
            }, 200);
            setTimeout(() => {
                score.cloneNode().play();
            }, 400);
            dialogBox.innerHTML = `<p> The milk is <span class="milkSpan">lactose-free</span></p>
                <p> Because you <span class="playerSpan">drank the mik</span>, you survived drinking the milk!</p>
                <p> You gain <span class="scoreSpan">+2 calcium</span></p>
                <p>Keep going!</p>`;
        } else if (milkChoice == "lactose" && playerChoice == "drank milk" && gameState == 'still playing') {
            playerHealth = playerHealth - 2;
            setTimeout(() => {
                hurt.cloneNode().play();
            }, 200);
            setTimeout(() => {
                hurt.cloneNode().play();
            }, 400);
            logHealthScore();
            dialogBox.innerHTML = `<p> The milk is <span class="milkSpan">lactose</span>.</p>
                <p> Because you <span class="playerSpan">drank the milk</span>, you feel the full effects of the milk.</p>
                <p> You lose <span class="scoreSpan">-2 health</span></p>
                <p>Keep trying!</p>`;
        }
    }

    // Update Scoring
   function updateScore() {
        currentScore  = document.querySelector('.currentScore');
        currentScore.innerHTML = `${playerScore}`;
        currentHealth = document.querySelector('.currentHealth');
        currentHealth.innerHTML = `${playerHealth}`;

        const barFill = document.querySelector('#barFill');
        barFill.style.width = `${(playerHealth / 5) * 100}%`;
   }

    // ------------------------------Endgames----------------------------
    //reset game states
   function resetGame () {
        const lactaidAction = document.querySelector('.lactaidbtn');
        const drinkAction = document.querySelector('.drinkbtn');
        dialogBox.innerHTML += "<p id='restartbtn'>Play Again </p>";
        lactaidAction.classList.replace("btnshow", "btnhide");
        drinkAction.classList.replace("btnshow", "btnhide");
        // if player reset game
        const restart = document.querySelector('#restartbtn');
        restart.addEventListener('click', function() {
            click.play();
            console.log('restart');
            playerScore = 0;
            playerHealth = 5;
            dialogBox.innerHTML = "<p>Choose an action to start</p>"
            btns.innerHTML = "<div class='lactaidbtn button btnshow'><h2>Lactaid</h2></div><div class='drinkbtn button btnshow'><h2>Drink</h2></div>";
            gameState='still playing';
            updateScore();
            setupButtons();
            if (bgmusic.muted == true) {
                bgmusic.pause();
            } else {
                bgmusic.play();
            }
            // location.reload();
            // document.querySelector('#overlay').className = "hidden";
        });
   }

    function checkGameState() {
        if (playerScore >= 5) {
            gameState = 'win';
            bgmusic.pause();
            setTimeout(() => {
            win.play();
            }, 400);
            dialogBox.innerHTML = "<p class='ending'>You win!</p><p>You drank enough calcium.";
            resetGame();
        } else if (playerHealth <= 0) {
            gameState = 'lose';
            bgmusic.pause();
            setTimeout(() => {
            lose.play();
            }, 400);
            dialogBox.innerHTML = "<p class='ending'>You lose!</p><p>You died from lactose overdose.";
            resetGame();
        } else {
            gameState = 'still playing';
        }
        console.log(gameState);
    }

    // ------------------------------Overlay Content Starts Here----------------------------

    // How to play button
    const howtoplaybtn = document.querySelector('.howtoplay');
    howtoplaybtn.addEventListener('click', function(){
        document.querySelector('#overlay').className = "showing";
    });

    // Overlay Close Button 
    document.querySelector('.closebtn').addEventListener('click', function() {
        document.querySelector('#overlay').className = "hidden";
        bgmusic.play();
    });
})();