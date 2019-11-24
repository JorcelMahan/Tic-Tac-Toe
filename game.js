const Player = (name, marca, dom, turno, mark, color) => {
    const getName = () => name;
    const getMarca = () => marca;
    const getColor = () => color;
    const getDom = () => dom;
    const isTurn = () => turno;
    const setTurno = () => turno = !turno;
    const getMark = () => mark;
    return {getName, getMarca, getDom, isTurn, setTurno, getMark, getColor};
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
            let col = colDiagonal(i);
            if (col.filter(e => e === 1).length === 3) return [true, player1];
            if (col.filter(e => e === 2).length === 3) return [true, player2];
            let play1 = grid[i].filter(e => e === 1);
            if (play1.length === 3) return [true, player1];
            let play2 = grid[i].filter(e => e === 2);
            if (play2.length === 3) return [true, player2];
            let md = mainDiagonal();
            if (md.filter(e => e === 1).length === 3) return [true, player1];
            if (md.filter(e => e === 2).length === 3) return [true, player2];
            let ad = auxDiagonal();
            if (ad.filter(e => e === 1).length === 3) return [true, player1];
            if (ad.filter(e => e === 2).length === 3) return [true, player2];
        }
        return [false, null];
    };
    const mainDiagonal = () => {
        let aux = [];
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid.length; j++) {
                if (i === j) aux.push(grid[i][j])
            }
        }
        return aux;
    };
    const colDiagonal = j => {
        let aux = [];
        for (let i = 0; i < grid.length; i++) {
            aux.push(grid[i][j])
        }
        return aux;
    };
    const auxDiagonal = () => {
        let aux = [];
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid.length; j++) {
                if (i + j === grid.length - 1) aux.push(grid[i][j])
            }
        }
        return aux;
    };
    const draw = () => {
        let c = 0;
        grid.forEach(e => {
            if (!e.includes(0)) c++;
        });
        return c === 3
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
let player1 = Player('player1', 'X', document.getElementById('player1'), true, 1, 'blue');
let player2 = Player('player2', 'O', document.getElementById('player2'), false, 2, 'rebeccapurple');
let game = Game(player1, player2);

const reset = document.querySelector('#reset');
const start = document.querySelector('#start');
let isStart = false;

start.onclick = () => {
    isStart = true;
    if (start.textContent === `Play again?`) {
        resetGrid();
        game.reset();
    }
    if (player1.isTurn()) {
        player1.getDom().style.border = `5px solid tomato`;
        player2.getDom().style.border = `none`;
    } else {
        player2.getDom().style.border = `5px solid tomato`;
        player1.getDom().style.border = `none`;
    }
};

function resetGrid() {
    start.textContent = `Start Game`;
    player1.getDom().style.border = `none`;
    player2.getDom().style.border = `none`;
    document.querySelectorAll('.board-box').forEach(el => el.textContent = '');
    document.querySelectorAll('.board-box').forEach(box => box.addEventListener('click', touch))
}

reset.onclick = () => {
    resetGrid();
    game.reset();
};
const render = () => {
    const board = document.querySelector('.board');
    createBox(board, 9);
};

function touch(e) {
    if (isStart) {
        let player = game.whoesPlay();
        if (e.target.textContent === '') {
            e.target.textContent = player.getMarca();
            e.target.style.color = player.getColor();
            let [i, j] = e.target.dataset.box.split('');
            game.grid[i][j] = player.getMark();
            if (player === player1) {
                player1.getDom().style.border = `none`;
                player2.getDom().style.border = `5px solid tomato`;
            } else {
                player2.getDom().style.border = `none`;
                player1.getDom().style.border = `5px solid tomato`;
            }
            if (game.endGame()[0]) {
                alert(`winner ${game.endGame()[1].getName()}`);
                start.textContent = `Play again?`;
                document.querySelectorAll('.board-box').forEach(box => box.removeEventListener('click', touch))
            }
            if (game.draw() && !game.endGame()[0]) {
                alert('DRAW');
                start.textContent = `Play again?`;
            }
        }
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
