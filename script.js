const container = document.querySelector('.gridContainer');
const btnSize = document.querySelector('.size');

const slider = document.querySelector('.slider');
const sliderVal = document.querySelector('.sliderVal');
sliderVal.textContent = slider.value + ' x ' + slider.value;

slider.oninput = () => {
    sliderVal.textContent = slider.value + ' x ' + slider.value;
}

let mouseClick = false;

let createGrid = (size) => {
    container.style.gridTemplateColumns = `repeat(${size}, auto)`;
    for (let i = 0; i < size * size; i++) {
        const gridDiv = document.createElement('div');
        gridDiv.classList.add(`gridBox`);
        gridDiv.draggable = false;
        gridDiv.addEventListener('mousedown', () => {
            if (mouseClick === false) {
                mouseClick = true;
                gridDiv.style.backgroundColor = 'blue';
            }
            else {
                mouseClick = false;
            }
        });
        gridDiv.addEventListener('mouseover', () => {
            if (mouseClick === true) gridDiv.style.backgroundColor = 'blue';
        });
        container.append(gridDiv);
    }
}

let removeGrid = () => {
    let boxes = container.querySelectorAll('div');
    boxes.forEach(box => container.removeChild(box));
}

let changeSize = () => {
    let size = slider.value;
    removeGrid();
    createGrid(size);
}

createGrid(32);
btnSize.addEventListener('click', changeSize);