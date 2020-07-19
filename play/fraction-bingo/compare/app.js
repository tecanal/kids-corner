var diffLevel = "",
    fract1 = "",
    fract2 = "",
    problem = "",
    correctOp = "",
    boardType = "";

function startGame() {
    // Get selected difficulty level                                                                                             
    diffLevel = $("input[name='difficulty']:checked").val();

    // If no difficulty level is selected, do not advance                                                                        
    if (!diffLevel) {
        return;
    }

    // Get selected board size                                                                                                   
    if (document.getElementById("three").checked) {
        document.getElementsByName("board3")[0].style.display = "";
	boardType = "board3";
    } else if (document.getElementById("four").checked) {
        document.getElementsByName("board4")[0].style.display = "";
	boardType = "board4";
    } else if (document.getElementById("five").checked) {
        document.getElementsByName("board5")[0].style.display = "";
	boardType = "board5";
    } else {
        return;
    }

    generateProblem();
    fillBoard();

    document.getElementById("start").style.display = "none";
    document.getElementById("game").style.display = "";
}

function generateProblem() {
    fract1;
    fract2;
    if (diffLevel == "easy") {
	fract1 = getRandomFraction(0, 9);
	fract2 = getRandomFraction(0, 9); 
    } else if (diffLevel == "medium") {
	fract1 = getRandomFraction(0, 99);
	fract2 = getRandomFraction(10, 99); 
    } else {
	fract1 = getRandomFraction(10, 99);
	fract2 = getRandomFraction(100, 300);
    }
    problem = fract1 + " ? " + fract2;
    let n1 = 0, n2 = 0, d1 = 0, d2 = 0;
    let arr1 = fract1.split("/");
    n1 = parseInt(arr1[0]);
    d1 = parseInt(arr1[1]);
    let arr2 = fract2.split("/");
    n2 = parseInt(arr2[0]);
    d2 = parseInt(arr2[1]);
    let f1 = n1/d1;
    let f2 = n2/d2;
    if (f1 > f2) {
        correctOp = ">";
    } else if (f1 < f2) {
        correctOp = "<";
    } else {
        correctOp = "=";
    }
    document.getElementById("problem").innerHTML = problem;
}

function getRandomFraction(min, max) {
    let num;
    let numerator = Math.floor(Math.random() * (max - min + 1)) + min;
    if (min == 0) {
	min = 1;
    }
    let denominator = Math.floor(Math.random() * (max - min + 1)) + min;
    //num = `${numerator}&frasl;${denominator}`;
    num = numerator + "/" + denominator;
    return num;
}

function fillBoard() {
    // Randomly fill board with <, >, and = 
    let table = document.getElementsByName(boardType)[0];
    let operators = ["<", ">", "="];
    let op = "";
    for (var i = 0, row; row = table.rows[i]; i++) {
	for (var j = 0, col; col = row.cells[j]; j++) {
	    op = operators[Math.floor(Math.random() * 3)];                                                                        
            col.className = "white";
	    col.innerHTML = op;
            col.onclick = function () {
		checkAnswer(this);
            };
	}
    }
}

function checkAnswer(cell) {
    if (cell.className != "green") {
        if (correctOp == cell.innerText) {
	    cell.className = "green";
	    generateProblem();
        }
        else {
       	    cell.className = "red";
	    setTimeout(function() {
	        cell.className = "white";
	    }, 1000);
        }
    }
}

function solNotFound() {
    let table = document.getElementsByName(boardType)[0];
    let noSolBtn = document.getElementById("noSolution");
    for (var i = 0, row; row = table.rows[i]; i++) {
        for (var j = 0, col; col = row.cells[j]; j++) {
	    if (col.className == "white") { 
	        if (correctOp == col.innerText) {
                    noSolBtn.className = "red";
                    setTimeout(function() {
                        noSolBtn.className = "white";
                    }, 1000);
                    return;
                }
	    }
        }
    }
    noSolBtn.className = "green";
    setTimeout(function() {
        noSolBtn.className = "white";
    }, 500);
    generateProblem();
}