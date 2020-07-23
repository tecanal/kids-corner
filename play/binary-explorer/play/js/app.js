/**
 * Initialize the UI components on load.
 */
(function initUI() {
    addRow();
})();

/**
 * Add a binary string row that can be translated into an ASCII character.
 */
function addRow() {
    if (!document.getElementById("binary-container")) return;
    // create a letter div
    let div = document.createElement("div");
    div.className = "letter";
    document.getElementById("binary-container").appendChild(div);

    // create 7 bit toggle elements
    for (let i = 0; i < 7; i++) {
        // create bit element
        let span = document.createElement("span");
        span.className = "num";
        span.innerText = "0";
        span.onclick = translateBinaryString;

        // add bit element to row
        div.appendChild(span);
    }

    // add the result display element
    let resultSpan = document.createElement("span");
    resultSpan.className = "result";
    div.appendChild(resultSpan);
}

/**
 * Translate a binary string into its ASCII equivalent.
 */
function translateBinaryString() {
    // flip the cell contents
    this.innerHTML === "1" ? this.innerHTML = "0" : this.innerHTML = "1";

    // Get the cells in the line
    let cells = this.parentNode.querySelectorAll(".num");

    // create binary string by reading states from cells
    let binaryString = Array.from(cells).map(x => x.innerHTML).join("");

    // Show conversion from binary to ASCII character
    let resultEl = this.parentNode.querySelector(".result");

    // convert binary string to decimal number (ASCII code)
    let asciiCode = parseInt(binaryString, 2);

    // convert ASCII code to a character and show in result element
    resultEl.innerHTML = String.fromCharCode(asciiCode);
}

/**
 * Translate the binary story text into ASCII.
 */
function translateStory() {
    let story = document.getElementById("story");
    let storyText = story.innerHTML;
    storyText = storyText.split(' ')
        .map(bin => String.fromCharCode(parseInt(bin, 2)))
        .join('');
    story.innerHTML = storyText;
    document.getElementById("translateButton").disabled = true;
}

/**
 * Remove a binary string row.
 */
function deleteRow() {
    div = document.querySelector(".letter");
    document.querySelector("#binary-container").removeChild(div);
}

/**
 * Displays text using a typewriter effect.
 * @type {number}
 */
let stop = false;

function typeWriter(binary) {
    text = document.getElementById("hiddenText").innerHTML;
    i = 0;
    speed = 25;
    if (binary) {
        let binaryText = "";
        for (let i = 0; i < text.length; i++) {
            binaryText += text[i].charCodeAt(0).toString(2) + " ";
        }
        type(speed, i, binaryText);
    } else {
        type(speed, i, text);
    }

}

/**
 * Recursive function to type all letters for typewriter effect
 * @param speed
 * @param i index variable
 * @param binaryText
 */
function type(speed, i, text) {
    if (stop) return;
    if (i < text.length) {
        document.getElementById("story").innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed, speed, i, text);
    }
}

/**
 * Displays text and skips the typewriter effect.
 */
function skip(binary) {
    let text = document.getElementById("hiddenText").innerHTML;
    stop = true;
    if (binary) {
        let binaryText = "";
        for (let i = 0; i < text.length; i++) {
            binaryText += text[i].charCodeAt(0).toString(2) + " ";
        }
        document.getElementById("translateButton").disabled = false;
        text = binaryText;
    }
    clearTimeout(skip);
    document.getElementById("story").innerHTML = text;
    document.body.onclick = null;
}

/**
 * Compares message with desired answer.
 */
function check(string) {
    let message = "";
    let letters = document.querySelectorAll(".result");
    for (let i = 0; i < letters.length; i++) {
        message += letters[i].innerHTML;

    }
    if (message === string) {
        document.getElementById("binary-container").style.color = "green";
        alert("MESSAGE SENT")
    } else {
        document.getElementById("binary-container").style.color = "red";
        alert("I don't think this is the right message... Check for spelling and capitalization and try again.")
    }
}