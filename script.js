const container = document.querySelector('.gridContainer');
let mouseClick = false;

// pen states
let isDefault = true;
let isPastel = false;
let isBlack = false;
let isEraser = false;

// pen buttons
const btnDefault = document.querySelector('.default')
const btnBlack = document.querySelector('.black');
const btnPastel = document.querySelector('.pastel');
const btnErase = document.querySelector('.erase');

// change pen state to default
btnDefault.addEventListener('click', () => {
    isBlack = false;
    isDefault = true;
    isPastel = false;
    isEraser = false;
});

// change pen state to black
btnBlack.addEventListener('click', () => {
    isBlack = true;
    isDefault = false;
    isPastel = false;
    isEraser = false;
});

// change pen state to rainbow
btnPastel.addEventListener('click', () => {
   isPastel = true;
   isDefault = false;
   isBlack = false;
   isEraser = false;
});

btnErase.addEventListener('click', () => {
    isPastel = false;
    isDefault = false;
    isBlack = false;
    isEraser = true;
});
// change color to random rgb colors
let setPastel = () => {
    const pastels = {
        1: '#89AEB2',
        2: '#97F2F3',
        3: '#F1E0B0',
        4: '#F1CDB0',
        5: '#E7CFC8'
    }

    return pastels[Math.floor(Math.random() * (5 - 1 + 1)) + 1]
}

// create grid on website load
let createGrid = (size) => {
    container.style.gridTemplateColumns = `repeat(${size}, auto)`;
    for (let i = 0; i < size * size; i++) {
        const gridDiv = document.createElement('div');
        gridDiv.classList.add(`gridBox`);
        gridDiv.draggable = false;
        gridDiv.style.border = '1px solid rgba(0, 0, 0, 0.1)';
        gridDiv.addEventListener('mousedown', changeColor);
        gridDiv.addEventListener('mouseover', changeColor);
        container.append(gridDiv);
    }
}

// set color and paint grid box
let changeColor = (e) => {
    let pen = 'blue'
    if (isDefault === true) pen = 'blue';
    if (isPastel === true) pen = setPastel();
    if (isBlack === true) pen = 'black';
    if (isEraser === true) pen = 'white';
    
    if (e.type === 'mousedown') {
        if (mouseClick === false) {
            mouseClick = true;
            console.log(e);
            console.log(pen);
            e.target.style.backgroundColor = pen;
            // a random test
        }
        else {
            mouseClick = false;
        }
    }
    else if (e.type === 'mouseover') {
        if (mouseClick === true) e.target.style.backgroundColor = pen;
    }
}
createGrid(32);

const btnSize = document.querySelector('.size'); // get size button
const btnClear = document.querySelector('.clearGrid'); // get clear button

const slider = document.querySelector('.slider'); // get slider
const sliderVal = document.querySelector('.sliderVal'); // get slider text
sliderVal.textContent = slider.value + ' x ' + slider.value; // initialise slider text

slider.oninput = () => {
    sliderVal.textContent = slider.value + ' x ' + slider.value; // set slider value text
}

let size = 32;

// used in changeSize and clearGrid
let removeGrid = () => {
    let boxes = container.querySelectorAll('div');
    boxes.forEach(box => container.removeChild(box));
}

// alter size value then create new grid
let changeSize = () => {
    if (size !== slider.value) {
        size = slider.value;
        removeGrid();
        createGrid(size);
    }
}

// clears colors from grid
let clearGrid = () => {
    removeGrid();
    createGrid(size);
}

btnClear.addEventListener('click', clearGrid);
btnSize.addEventListener('click', changeSize);