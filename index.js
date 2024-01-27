const lines = document.querySelectorAll(".svg-line");
const factor = 250;
// Store initial positions
const initialPositions = {
    'line--1': {x: 0, y: 0},
    'line--2': {x: 1091, y: -91},
    'line--3': {x: 0, y: 500},
    'line--4': {x: 500, y: 0},
    'line--5': {x: 1550, y: 10},
    'line--6': {x: 900, y: 550}
};
let cursor = document.querySelector(".cursor");
const moreLink = document.getElementById("more");
const circleTexts = document.querySelectorAll(".svg-text");

function parallax(e) {
    // Get the cursor's current position
    const x = e.clientX;
    const y = e.clientY;

    // Calculate the center of the viewport
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Adjust x and y positions relative to the center of the viewport
    const relativeX = x - centerX;
    const relativeY = y - centerY;

    lines.forEach(line => {
        const moving_value = line.getAttribute("data-value");
        const lineId = line.getAttribute("id");
        const initialX = initialPositions[lineId].x;
        const initialY = initialPositions[lineId].y;
        line.style.transform = `translate(
            ${initialX + (relativeX * moving_value) / factor}px, 
            ${initialY + (relativeY * moving_value) / factor}px
        )`;
    });
}

// Parallax effect on mouse move
document.addEventListener("mousemove", parallax);

function moveCursor(e) { // Custom cursor
    let x = e.clientX;
    let y = e.clientY;

    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
}

document.addEventListener("mousemove", moveCursor);

document.addEventListener("DOMContentLoaded", () => {
    const circles = document.querySelectorAll('.path-point');

    circles.forEach(circle => {
        // circle.style.cursor = "pointer";
        // Original radius
        const originalRadius = circle.getAttribute('r');
        const circleId = Number(circle.id.charAt(circle.id.length - 1));

        // Mouse enter event
        circle.addEventListener('mouseenter', () => {
            circle.setAttribute('r', parseFloat(originalRadius) * 6); // Increase the radius by 6x, adjust as needed
        });

        // Mouse leave event
        circle.addEventListener('mouseleave', () => {
            circle.setAttribute('r', originalRadius); // Reset the radius to original
            cursor.classList.toggle("grow");
            circleTexts.item(circleId - 1).classList.toggle("hidden");
        });

        circle.addEventListener("mouseover", () => {
            cursor.classList.toggle("grow");
            circleTexts.item(circleId - 1).classList.toggle("hidden");
        });
    });


    lines.forEach(svg => {
        const path = svg.querySelector('path');
        const circle = svg.querySelector('.path-point');
        const pathLength = path.getTotalLength();
        const lineId = svg.getAttribute("id");

        // Get the middle point of the path
        let middlePoint = path.getPointAtLength(pathLength / 2);

        if (lineId === "line--4") {
            middlePoint = path.getPointAtLength(pathLength / 2.7);
        }

        if (lineId === "line--5") {
            middlePoint = path.getPointAtLength(pathLength / 1.75);
        }

        if (lineId === "line--3") {
            middlePoint = path.getPointAtLength(pathLength / 2.8);
        }

        if (lineId === "line--6") {
            middlePoint = path.getPointAtLength(pathLength / 2.3);
        }

        // Position the circle at the middle point
        circle.setAttribute('cx', middlePoint.x);
        circle.setAttribute('cy', middlePoint.y);
    });

    moreLink.addEventListener("mouseover", () => {
        cursor.classList.toggle("grow");
    });

    moreLink.addEventListener("mouseleave", () => {
        cursor.classList.toggle("grow");
    });
});
