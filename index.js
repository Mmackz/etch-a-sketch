const drawingArea = document.getElementById("draw");

function setHeight() {
   const width = drawingArea.getBoundingClientRect().width;
   const height = width;
   drawingArea.style.height = height + "px";
}

function appendSquares(size) {
   const sqWidth = 100 / size + "%";
   const sqHeight = sqWidth;
   for (let i = 0; i < size**2; i++) {
      const square = document.createElement("div");
      square.style.width = sqWidth;
      square.style.height = sqHeight;
      square.style.background = "blue";
      drawingArea.appendChild(square);
   }
}

// set initial height for mobiles on load
setHeight()


appendSquares(32)

// set height for drawing area
window.addEventListener("resize", (event) => {
   setHeight()
   
});
