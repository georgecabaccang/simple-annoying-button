import { randomGenerator } from "./helpers/randomGenerator.js";

const buttonToClick = document.getElementById("button");
const position = buttonToClick?.getBoundingClientRect();

buttonToClick?.addEventListener("click", handleClick);

let isSetup = false;
let currentPositionX = position?.x;
let currentPositionY = position?.y;

let currentClientX: number;
let currentClientY: number;

let currentViewportWidth: number;
let currentViewportHeight: number;

let isClicked = false;

window.addEventListener("mouseover", (event: MouseEvent): void => {
    if (isSetup) return;
    getViewportDimensions();
    checkInitialCursorPosition(event);
    isSetup = true;
});

window.addEventListener("mousemove", (event: MouseEvent): void => {
    getViewportDimensions();
    if (isClicked) return;
    handleButtonMovement(event);
});

function getViewportDimensions(): void {
    currentViewportWidth = window.innerWidth;
    currentViewportHeight = window.innerHeight;
}

function checkInitialCursorPosition(event: MouseEvent): void {
    const initialCursorCoordX = event.clientX;
    const initialCursorCoordY = event.clientY;

    if (buttonToClick && currentPositionX && currentPositionY) {
        const isWithinButtonQuadrants =
            (initialCursorCoordX >= currentPositionX - 10 &&
                initialCursorCoordX <= currentPositionX + 110) ||
            (initialCursorCoordY >= currentPositionX - 10 &&
                initialCursorCoordY <= currentPositionX + 60);

        if (isWithinButtonQuadrants) {
            const randX = randomGenerator(1, 2);
            const randY = randomGenerator(1, 2);
            const adjustButtonX = randX === 1 ? -100 : 100;
            const adjustButtonY = randY === 1 ? -60 : 60;

            const newPositionX = currentPositionX - adjustButtonX;
            const newPositionY = currentPositionY - adjustButtonY;

            buttonToClick.style.marginLeft = `${newPositionX}px`;
            buttonToClick.style.marginTop = `${newPositionY}px`;

            currentPositionX = newPositionX;
            currentPositionY = newPositionY;
        }
    }
}

function handleClick() {
    const position = buttonToClick?.getBoundingClientRect();
    console.log(position?.x, position?.y);

    if (buttonToClick) {
        buttonToClick.style.backgroundColor = "orange";
        isClicked = true;
        buttonToClick.innerText = "Congratulations! Now refresh the page."
        buttonToClick.style.width = "auto";
    }
}

function handleButtonMovement(event: MouseEvent): void {
    if (buttonToClick && currentPositionX !== undefined && currentPositionY !== undefined) {
        const inFirstQuadrant =
            event.clientX >= currentPositionX + 51 &&
            event.clientX <= currentPositionX + 110 &&
            event.clientY >= currentPositionY - 10 &&
            event.clientY <= currentPositionY + 25;

        const inSecondQuadrant =
            event.clientX >= currentPositionX - 10 &&
            event.clientX <= currentPositionX + 50 &&
            event.clientY >= currentPositionY - 10 &&
            event.clientY <= currentPositionY + 25;

        const inThirdQuadrant =
            event.clientX >= currentPositionX - 10 &&
            event.clientX <= currentPositionX + 50 &&
            event.clientY >= currentPositionY + 26 &&
            event.clientY <= currentPositionY + 60;

        const inFourthQuadrant =
            event.clientX >= currentPositionX + 51 &&
            event.clientX <= currentPositionX + 110 &&
            event.clientY >= currentPositionY + 26 &&
            event.clientY <= currentPositionY + 60;

        if (inFirstQuadrant) {
            const newPositionX = currentPositionX - 10;
            const newPositionY = currentPositionY + 10;

            buttonToClick.style.marginLeft = `${newPositionX}px`;
            buttonToClick.style.marginTop = `${newPositionY}px`;

            currentPositionX = newPositionX;
            currentPositionY = newPositionY;
        }

        if (inSecondQuadrant) {
            const newPositionX = currentPositionX + 10;
            const newPositionY = currentPositionY + 10;

            buttonToClick.style.marginLeft = `${newPositionX}px`;
            buttonToClick.style.marginTop = `${newPositionY}px`;

            currentPositionX = newPositionX;
            currentPositionY = newPositionY;
        }

        if (inThirdQuadrant) {
            const newPositionX = currentPositionX + 10;
            const newPositionY = currentPositionY - 10;

            buttonToClick.style.marginLeft = `${newPositionX}px`;
            buttonToClick.style.marginTop = `${newPositionY}px`;

            currentPositionX = newPositionX;
            currentPositionY = newPositionY;
        }

        if (inFourthQuadrant) {
            const newPositionX = currentPositionX - 10;
            const newPositionY = currentPositionY - 10;

            buttonToClick.style.marginLeft = `${newPositionX}px`;
            buttonToClick.style.marginTop = `${newPositionY}px`;

            currentPositionX = newPositionX;
            currentPositionY = newPositionY;
        }

        currentClientX = event.clientX;
        currentClientY = event.clientY;

        /* FOR WHEN REACHING EDGES*/

        const atTheEdgeOfViewPort =
            // When button is going left
            currentPositionX <= -70 ||
            // When button is going right

            currentPositionX >= currentViewportWidth - 30 ||
            // When button is going down

            currentPositionY >= currentViewportHeight - 10 ||
            // when button is going up
            currentPositionY <= -30;

        if (atTheEdgeOfViewPort) {
            returnTimer(buttonToClick);
        }
    }
}

let buttonMoved = false;

function returnTimer(button: HTMLElement) {
    if (buttonMoved) return;

    let newPositionX: number = randomGenerator(250, currentViewportWidth - 250);
    let newPositionY: number = randomGenerator(250, currentViewportHeight - 250);

    button.style.transform = "scale(0.3)";
    button.style.opacity = "0.3";

    setTimeout(() => {
        button.style.transition = " 0.1s";
        button.style.marginLeft = `${newPositionX}px`;
        button.style.marginTop = `${newPositionY}px`;
        button.style.transform = "scale(1)";
        button.style.opacity = "1";

        currentPositionX = newPositionX;
        currentPositionY = newPositionY;
        buttonMoved = false;
    }, 2000);

    setTimeout(() => {
        button.style.transition = " 0.02s";

        const cursorIsOnButton =
            (currentClientX >= newPositionX - 10 && currentClientX <= newPositionX + 110) ||
            (currentClientY >= newPositionY - 10 && currentClientY <= newPositionY + 60);

        if (cursorIsOnButton) {
            const additionalMovementX = randomGenerator(110, 120);
            const additionalMovementY = randomGenerator(60, 70);

            button.style.marginLeft = `${newPositionX + additionalMovementX}px`;
            button.style.marginTop = `${newPositionY + additionalMovementY}px`;
        }
    }, 2510);

    buttonMoved = true;
}
