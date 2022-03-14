// DOM elements
const drawingArea = document.getElementById("draw");
const gridSizeInput = document.getElementById("grid-size");
const gridSizeText = document.getElementById("size-text");
const clearBtn = document.getElementById("clear");
const colorEls = document.querySelectorAll(".color");


// set height of drawing area based off calulated width to keep 1:1 ratio.
function setHeight() {
   const width = drawingArea.getBoundingClientRect().width;
   const height = width;
   drawingArea.style.height = height + "px";
}

// append squares inside the drawing area
// percents are used to make the drawing area responsive
function appendSquares(size) {
   drawingArea.innerText = "";
   const sqWidth = 100 / size + "%";
   const sqHeight = sqWidth;
   for (let i = 0; i < size ** 2; i++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.style.width = sqWidth;
      square.style.height = sqHeight;
      square.style.background = "white";
      drawingArea.appendChild(square);
   }
   attachListeners();
}

function attachListeners() {
   // event listeners for individual cells
   const squares = document.querySelectorAll(".square");
   squares.forEach((square) => {
      square.addEventListener("mousemove", (event) => {
         if (drawing) {
            event.target.style.background = activeColor;
         }
      });
      square.addEventListener("click", (event) => {
         event.target.style.background = activeColor;
      });
   });
}

// set initial height and grid size on load
let gridSize = gridSizeInput.value;
setHeight();
appendSquares(gridSize);
colorEls[0].classList.add("current-color");

// set height for drawing area on resize
window.addEventListener("resize", (event) => {
   setHeight();
});

// set drawing variable to true when mouse button is down and false when up.
let drawing = false;
window.addEventListener("mousedown", () => {
   drawing = true;
});
window.addEventListener("mouseup", () => {
   drawing = false;
});

// listener for grid-size changes
gridSizeInput.oninput = (event) => {
   gridSize = event.target.value;
   gridSizeText.textContent = `${gridSize} x ${gridSize}`;
   appendSquares(gridSize);
};

// listeners for color changes 
let activeColor = "#000";
let prevNode = colorEls[0];

colorEls.forEach((colorEl) => {
   colorEl.onclick = function () {
      activeColor = this.getAttribute("data-color");
      colorEl.classList.add("current-color");
      prevNode.classList.remove("current-color");
      prevNode = colorEl;
   }
})

// event listeners for buttons
clearBtn.addEventListener("click", () => {
   appendSquares(gridSize);
});
