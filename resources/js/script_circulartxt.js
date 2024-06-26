const angleToRadian = (angle) => {
 return angle * (Math.PI / 180);
};
const radius = 56;
const diameter = radius * 2;

const circle = document.querySelector('#circulartxt');

circle.style.width = `${diameter}px`;
circle.style.height = `${diameter}px`;

const text = circle.innerText;

const characters = text.split('');

circle.innerText = null;

let angle = -90;
const deltaAngle = 360 / characters.length;

characters.forEach((char, index) => {
    const charElement = document.createElement('span');
    charElement.innerText = char;
    const xPos = radius * ( 1 + Math.cos(angleToRadian(angle)));
    const yPos = radius * ( 1 + Math.sin(angleToRadian(angle)));

    const transform = `translate(${xPos}px, ${yPos}px)`;
    const rotate = `rotate(${index * deltaAngle}deg)`;
    charElement.style.transform = `${transform} ${rotate}`;

    angle += deltaAngle;
    circle.appendChild(charElement);
});

let rotationAngle = 0;
let baseSpeed = 0.2; // Base rotation speed
let scrollSpeed = 1.5; // Additional speed while scrolling
let lastScrollY = window.scrollY;
let isScrolling = false;

const rotateText = () => {
    rotationAngle += baseSpeed + scrollSpeed;
    circle.style.transform = `rotate(${rotationAngle}deg)`;
    
    // Gradually decrease the scroll speed to return to base speed
    if (scrollSpeed > 0) {
        scrollSpeed -= 0.01;
    } else {
        scrollSpeed = 0;
    }

    requestAnimationFrame(rotateText);
};

const updateSpeedOnScroll = () => {
    const currentScrollY = window.scrollY;
    const scrollDirection = currentScrollY - lastScrollY;
    if (scrollDirection !== 0) {
        scrollSpeed = 1; // Set a higher speed while scrolling
        isScrolling = true;
    }
    lastScrollY = currentScrollY;
};

window.addEventListener('scroll', updateSpeedOnScroll);
rotateText();



