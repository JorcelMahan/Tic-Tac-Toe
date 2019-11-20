const Player = (name) => {
    const getName = () => name;
};
const game = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];
const reset = document.querySelector('#reset');
const start = document.querySelector('#start');
let isStart = false;
start.onclick = () => {
    isStart = true;
};
reset.onclick = () => {
    document.querySelectorAll('.board-box').forEach(el => el.textContent = '');
};
const render = () => {
    const board = document.querySelector('.board');
    createBox(board, 9);
};

function touch(e) {
    if (isStart) {
        e.target.textContent = 'X';
        let [i, j] = e.target.dataset.box.split('');
        game[i][j] = 1;
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
