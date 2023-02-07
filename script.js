function playTicTacToe() {
    const startCont = document.querySelector('.startCont');
    const container = document.querySelector('.gridCont');
    const submitButt = document.querySelector('.submit');
    const pOne = document.querySelector('.pOne');
    const pTwo = document.querySelector('.pTwo');
    const nameRequest = document.querySelector('.nameRequest');

    
    const playButt = document.querySelector('.play');
    const grid = document.querySelector('.grid');
    const winOrLose = document.querySelector('.winOrLose');
    const turn = document.querySelector('.turn');
    const restartButt = document.querySelector('.restart');

    pOne.focus();

    //give names to player one and player two.
    //only show the board if they have both entered diff names

    function boardAppear() {
        nameRequest.textContent = 'Please enter your names!'
        if(!pOne.value || !pTwo.value){
            nameRequest.style.display = 'block'
            pOne.focus();
            
        } else if (pOne.value === pTwo.value) {
            nameRequest.style.display = 'block';
            nameRequest.textContent = 'Enter different names please!'
            pOne.focus();

        } else {
            container.style.display = 'flex';
            startCont.style.display = 'none';
            document.querySelector('.gridCont h3').textContent = `${pOne.value} plays X, ${pTwo.value} plays O`;
            turn.textContent = `${pOne.value}'s turn.`

        }

    }

    submitButt.addEventListener('click', boardAppear)

    let inputs = new Array(9);
    let guesses = [...Array(9)].map(x => '');


    //create cells for tic tac toe grid
    for (let i = 0; i < inputs.length; i++){
        let cell = document.createElement('input');
        grid.appendChild(cell);
        cell.classList.add(`cell`);
        cell.setAttribute('id', `${i+1}`)
        cell.setAttribute('rowNum', `row${Math.floor(i/3+1)}`);
        cell.setAttribute(`colNum`, `col${i%3+1}`);
        cell.setAttribute('pattern', '/ox/i');
        cell.setAttribute('maxlength', '1');

    }


    /*//disable cells that aren't selected
    function disable(index) {
        for (const cell of document.querySelectorAll('.grid input')){
            cell.disabled = true
        }
        document.getElementById(`${index}`).disabled = false;
    }

    const inputFields = document.querySelectorAll('.grid input');
    inputFields.forEach(input => {
        input.addEventListener('click', function() {
            let index = this.getAttribute('id')
            console.log(index)
            disable(index)
        })
    })*/

    let turns = 0;

    function submit () {
        if(turns % 2 == 0){
            turn.textContent = `${pTwo.value}'s turn.`
        } else {
            turn.textContent = `${pOne.value}'s turn.`
        }
        for (let i = 0; i < inputs.length; i++) {
            let input = document.getElementById(`${i+1}`).value;
            input = input.toLowerCase();
            if(input === 'o' || input === 'x' || input === ''){
                guesses[i] = input.toLowerCase();
                winOrLose.textContent = '';
                turns++;
                if (input != ''){
                    input.disabled= true;
                }
            } else {
                winOrLose.textContent = 'Please enter X or O';
                input.value = '';
                console.log(typeof(input))
                break;
            }
        }
        checkCells();
    }

    
    
    playButt.addEventListener('click', submit)

    function checkCells() {
        let firstRow = guesses.slice(0, 3);
        let secondRow = guesses.slice(3, 6);
        let thirdRow = guesses.slice(6, 9);
        let firstCol = [guesses[0], guesses[3], guesses[6]];
        let secondCol = [guesses[1], guesses[4], guesses[7]];
        let thirdCol = [guesses[2], guesses[5], guesses[8]];
        let diagOne = [guesses[0], guesses[4], guesses[8]];
        let diagTwo = [guesses[2], guesses[4], guesses[6]];

        let diffGroups = [firstRow, secondRow, thirdRow, firstCol, secondCol, thirdCol, diagOne, diagTwo];

        for(let group of diffGroups){
            if (group[0] === group[1] && group[0] === group[2] && group[1] === group[2] && group[1] != ''){
                if(group[0] === group[1] && group[0] === group[2] && group[1] === group[2]){
                    if(group[0] === 'x') {
                        turn.textContent = ``;
                        winOrLose.innerHTML = `Well done ${pOne.value}, you win!`;
                    } else {
                        turn.textContent = ``;
                        winOrLose.innerHTML = `Well done ${pTwo.value}, you win!`;
                    }
                    restartGame();
                }
            }
                
        }
    }

    function restartGame () {
        playButt.style.display = 'none';
        restartButt.style.display = 'block';
    }

    let games = 0;

    function clearAll() {
        for (let i = 0; i < inputs.length; i++){
            document.getElementById(`${i+1}`).value = '';
            guesses = [];
        }
        restartButt.style.display = 'none';
        playButt.style.display = 'block';
        winOrLose.innerHTML = ``;
        turns = 0;
        games++;
        if (games % 2 == 0){
            turn.textContent = `${pOne.value}'s turn.`
        } else {
            turn.textContent = `${pTwo.value}'s turn.`
        }


    }
    restartButt.addEventListener('click', clearAll)


}