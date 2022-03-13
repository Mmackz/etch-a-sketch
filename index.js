// DOM elements
const drawingArea = document.getElementById("draw");
const blackBtn = document.getElementById("black");
const eraserBtn = document.getElementById("eraser");
const clearBtn = document.getElementById("clear");

// color picker using iro.js package
const colorPicker = new iro.ColorPicker("#picker", {
   width: 100,
   layoutDirection: "horizontal",
   sliderSize: 20,
   handleRadius: 5,
   borderWidth: 2,
   borderColor: "black",
   margin: 30
});

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
   const squares = document.querySelectorAll(".square")
   squares.forEach((square) => {
      square.addEventListener("mousemove", (event) => {
         console.log("hi");
         if (drawing) {
            console.log("hi");
            event.target.style.background = colorPicker.color.hexString;
         }
      });
   });
}

// set initial height on load
setHeight();
appendSquares(48);

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

// event listeners for buttons
blackBtn.addEventListener("click", () => {
   colorPicker.color.set("#000");
});

eraserBtn.addEventListener("click", () => {
   colorPicker.color.set("#fff");
});

clearBtn.addEventListener("click", () => {
   appendSquares(48);
});
