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


    //give names to player one and player two.
    //only show the board if they have both entered diff names

    function boardAppear() {
        console.log(pOne.value)
        nameRequest.textContent = 'Please enter your names!'
        if(!pOne.value || !pTwo.value){
            nameRequest.style.display = 'block'
        } else if (pOne.value === pTwo.value) {
            nameRequest.style.display = 'block';
            nameRequest.textContent = 'Enter different names please!'
        } else {
            container.style.display = 'block';
            startCont.style.display = 'none';
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

    document.querySelector('.gridCont h3').textContent = `${pOne.value} plays X, ${pTwo.value} plays O`

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


    function submit () {
        for (let i = 0; i < inputs.length; i++) {
            let input = document.getElementById(`${i+1}`).value;
            input = input.toLowerCase();
            if(input == 'o' || input == 'x'){
                guesses[i] = input;
            } else {
                winOrLose.textContent = 'Please enter X or O';
            }
        }
        checkCells();
    }
    
    playButt.addEventListener('click', submit)

    function checkCells() {
        let firstRow = [document.getElementById('1').value, document.getElementById('2').value, document.getElementById('3').value];
        let secondRow = [document.getElementById('4').value, document.getElementById('5').value, document.getElementById('6').value];
        let thirdRow = [document.getElementById('7').value, document.getElementById('8').value, document.getElementById('9').value];
        let firstCol = [document.getElementById('1').value, document.getElementById('4').value, document.getElementById('7').value];
        let secondCol = [document.getElementById('2').value, document.getElementById('5').value, document.getElementById('8').value];
        let thirdCol = [document.getElementById('3').value, document.getElementById('6').value, document.getElementById('9').value];
        let diagOne = [document.getElementById('1').value, document.getElementById('5').value, document.getElementById('9').value];
        let diagTwo = [document.getElementById('3').value, document.getElementById('5').value, document.getElementById('7').value];

        let diffGroups = [firstRow, secondRow, thirdRow, firstCol, secondCol, thirdCol, diagOne, diagTwo];

        for(let group of diffGroups){
            if (group[0] === group[1] && group[0] === group[2] && group[1] === group[2] && group[1] != ''){
                if(group[0] === group[1] && group[0] === group[2] && group[1] === group[2]){
                    if(group[0] === 'X') {
                        winOrLose.innerHTML = `Well done ${pOne.value}, you win!`;
                    } else {
                        winOrLose.innerHTML = `Well done ${pTwo.value}, you win!`;
                    }
                }
            }
                
        }
        

        /*for (const cell of document.querySelectorAll('.grid input')){
            cell.value = 'x';
            console.log(cell.value);
            if (document.querySelectorAll('[rowNum = row1]')){
                firstRow.push(cell.value)
            } else if (document.querySelector('[rowNum = row2]')){
                secondRow.push(cell.value)

            } else {
                thirdRow.push(cell.value)
            };

            if (document.querySelectorAll('[colNum = col1]')){
                firstCol.push(cell.value)
            } else if (document.querySelectorAll('[colNum = col2]')){
                secondCol.push(cell.value)
            } else {
                thirdCol.push(cell.value)
            };

            

        }*/

        
    }

    


    for (let i = 0; i < guesses.length; i++) {
    }

}