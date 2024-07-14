
document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    let isAdmin = false;
    
    document.getElementById('switch-mode').addEventListener('click', () => {
        isAdmin = !isAdmin;
        renderInterface();
    });
    
    document.getElementById('generate-tickets').addEventListener('click', generateTickets);

    function renderInterface() {
        const userInterface = document.getElementById('user-interface');
        if (isAdmin) {
            userInterface.innerHTML = `<h2>Admin Mode</h2>`;
        } else {
            userInterface.innerHTML = `
                <h2>User Mode</h2>
                <button id="switch-mode">Switch to Admin</button>
                <div id="number-selection">${generateNumberBalls()}</div>
                <div id="board-selection">
                    <label for="boards">Number of Boards:</label>
                    <input type="number" id="boards" min="1" max="10" value="1">
                </div>
                <div id="ticket-cost">Ticket Cost: R0.00</div>
                <button id="generate-tickets">Generate Tickets</button>
            `;
        }
    }

    function generateNumberBalls() {
        let ballsHTML = '';
        for (let i = 1; i <= 52; i++) {
            let colorClass = '';
            if (i <= 13) colorClass = 'red';
            else if (i <= 25) colorClass = 'yellow';
            else if (i <= 37) colorClass = 'green';
            else colorClass = 'blue';
            ballsHTML += `<div class="lotto-ball ${colorClass}" data-number="${i}">${i}</div>`;
        }
        return ballsHTML;
    }

    function generateTickets() {
        const numberOfBoards = document.getElementById('boards').value;
    const totalCost = numberOfBoards * 5; 
    document.getElementById('ticket-cost').innerText = `Ticket Cost: R${totalCost.toFixed(2)}`;
    }

    renderInterface();
});

function simulateDraw() {
    const drawNumbers = generateRandomNumbers(6, 52);
    saveToLocalStorage('lastDraw', drawNumbers);
    alert(`Draw Numbers: ${drawNumbers.join(', ')}`);

}

function generateRandomNumbers(count, max) {
    const numbers = [];
    while (numbers.length < count) {
        const num = Math.floor(Math.random() * max) + 1;
        if (!numbers.includes(num)) numbers.push(num);
    }
    return numbers;
}
