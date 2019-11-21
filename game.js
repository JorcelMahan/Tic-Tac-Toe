const Player = (name, marca, dom, turno, mark) => {
    const getName = () => name;
    const getMarca = () => marca;
    const getDom = () => dom;
    const isTurn = () => turno;
    const setTurno = () => turno = !turno;
    const getMark = () => mark;
    return {getName, getMarca, getDom, isTurn, setTurno, getMark};
};
const Game = (player1, player2) => {
    const grid = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    const reset = () => {
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid.length; j++) {
                grid[i][j] = 0;
            }
        }
    };
    const endGame = () => {
        for (let i = 0; i < grid.length; i++) {
            let sumRow = 0;
            for (let j = 0; j < grid.length; j++) {
                sumRow += grid[i][j];
            }
            if (sumRow === 3) return [true, player1];
            if (sumRow === 6) return [true, player2];
        }
        return [false, null];
    };
    const draw = () => {
        let results = [];
        grid.forEach(e => {
            let sum = e.reduce((a, b) => a + b);
            results.push(sum !== 3 && sum !== 6 && !e.includes(0));
        });
        return !results.includes(false);
    };
    const whoesPlay = () => {
        if (player1.isTurn()) {
            player1.setTurno();
            player2.setTurno();
            return player1;
        }

        if (player2.isTurn()) {
            player2.setTurno();
            player1.setTurno();
            return player2;
        }
    };
    return {grid, whoesPlay, reset, draw, endGame};
};
let player1 = Player('player1', 'X', document.getElementById('player1'), true, 1);
let player2 = Player('player2', 'O', document.getElementById('player2'), false, 2);
let game = Game(player1, player2);

const reset = document.querySelector('#reset');
const start = document.querySelector('#start');
let isStart = false;

start.onclick = () => {
    isStart = true;
    player1.getDom().style.border = `5px solid red`;
};
reset.onclick = () => {
    document.querySelectorAll('.board-box').forEach(el => el.textContent = '');
    game.reset();
};
const render = () => {
    const board = document.querySelector('.board');
    createBox(board, 9);
};

function touch(e) {
    if (isStart) {
        let player = game.whoesPlay();
        e.target.textContent = player.getMarca();
        let [i, j] = e.target.dataset.box.split('');
        game.grid[i][j] = player.getMark();
        if (player === player1) {
            player1.getDom().style.border = `none`;
            player2.getDom().style.border = `5px solid tomato`;
        } else {
            player2.getDom().style.border = `none`;
            player1.getDom().style.border = `5px solid tomato`;
        }
        if (game.endGame()[0]) alert(`winner ${game.endGame()[1].getName()}`);
        if (game.draw()) alert('draw');
    }
}

const createBox = (parent, n) => {
    let dataSet = getDataSet();
    for (let i = 0; i < n; i++) {
        let div = document.createElement('div');
        div.classList.add('board-box');
        div.dataset.box = dataSet[i];
        div.addEventListener('click', touch);
        parent.append(div);
    }
};

function getDataSet() {
    let dataSet = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            dataSet.push(`${i}${j}`);
        }
    }
    return dataSet;
}

render();
