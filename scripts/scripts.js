function trySwap(currentPos) {

    // clicked on empty cell
    let currentCell = document.getElementById("pos" + currentPos);
    if(currentCell.alt === "") {
        return;
    }

    // rightNeighbor exists so check if empty
    if(currentPos % 4 != 0) {
        let rightNeighbor = document.getElementById("pos" + (currentPos + 1));
        let result = checkNeighbor(currentCell, rightNeighbor);
        if (result === "swapped") {
            return;
        }
    }

    // leftNeighbor exists so check if empty
    if(currentPos % 4 != 1) {
        let leftNeighbor = document.getElementById("pos" + (currentPos - 1));
        let result = checkNeighbor(currentCell, leftNeighbor);
        if (result != -1) {
            return;
        }
    }

    // topNeighbor exists so check if empty
    if(currentPos > 4) {
        let topNeighbor = document.getElementById("pos" + (currentPos - 4));
        let result = checkNeighbor(currentCell, topNeighbor);
        if (result != -1) {
            return;
        }
    }

    // bottomNeighbor exists so check if empty
    if(currentPos < 13) {
        let bottomNeighbor = document.getElementById("pos" + (currentPos + 4));
        let result = checkNeighbor(currentCell, bottomNeighbor);
        if (result != -1) {
            return;
        }
    }

    function checkNeighbor(c1, c2) {
        if(c2.alt === "") {
            let temp1 = c1.src;
            let temp2 = c1.alt;
            c1.src = c2.src;
            c1.alt = c2.alt;
            c2.src = temp1;
            c2.alt = temp2;
            checkWin();
            return 0;
        }
        return -1;
    }

    function checkWin() {
        for(let i = 1; i < 16; i++) {
            if(document.getElementById("pos" + i).alt != i) {
                document.getElementById("puzzle").style.backgroundColor = "#DB009B";
                return;
            }
        }
        if (document.getElementById("pos" + 16).alt != "") {
            document.getElementById("puzzle").style.backgroundColor = "#DB009B";
            return;
        }
        document.getElementById("puzzle").style.backgroundColor = "#00E666";
    }
}

function scramble() {
    for(let i = 0; i < 200; i++) {
        let randomPos = Math.floor(Math.random() * 16) + 1;
        trySwap(randomPos);
    }
}

function reset() {
    for(let i = 1; i < 16; i++) {
        document.getElementById("pos" + i).alt = i;
        document.getElementById("pos" + i).src = "img/image" + i + ".png";
    }
    document.getElementById("pos16").alt = "";
    document.getElementById("pos16").src = "img/image16.png";
    document.getElementById("puzzle").style.backgroundColor = "#DB009B";
}