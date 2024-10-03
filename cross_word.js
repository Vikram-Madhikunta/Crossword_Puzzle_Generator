class Word {
    constructor(word, clue) {
        this.word = word;
        this.clue = clue;
    }

    getLength() {
        return this.word.length;
    }
}


class Coordinate {
    constructor(x, y) {
        this.row = x;
        this.col = y;
    }

    toString() {
        return `(${this.row}, ${this.col})`;
    }
}

function init(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            matrix[i][j] = '-';
        }
    }
}

function checkhorizontalafter(wordList, oldword, placed, row, col, matrix, nontracklist,tracklist) {
    for (let i = 0; i < oldword.length; i++) {
        const c = oldword.charAt(i);
        for (let j = 0; j < wordList.length; j++) {
            const word = wordList[j].word;
            if (placed.includes(word)) {
                continue;
            }
            for (let k = 0; k < word.length; k++) {
                if (c === word.charAt(k)) {
                    const newCol = col - k;
                    if (newCol >= 0 && newCol + word.length <= matrix[0].length) {
                        if (checkhorizontal(word, row + i, newCol, matrix, nontracklist)) {
                            placehorizontal(word, placed, row + i, newCol, matrix, nontracklist,tracklist);
                            break;
                        }
                    }
                }
            }
        }
    }
}

function checkafter(wordList, oldword, placed, row, col, matrix, nontracklist,tracklist) {
    for (let i = 0; i < oldword.length; i++) {
        const c = oldword.charAt(i);
        for (let j = 0; j < wordList.length; j++) {
            const word = wordList[j].word;
            if (placed.includes(word)) {
                continue;
            }
            for (let k = 0; k < word.length; k++) {
                if (c === word.charAt(k)) {
                    const newRow = row - k;
                    if (newRow >= 0 && newRow + word.length <= matrix.length) {
                        if (checkvertical(word, newRow, col + i, matrix, nontracklist)) {
                            placevertical(word, placed, newRow, col + i, matrix, nontracklist,tracklist);
                            break;
                        }
                    }
                }
            }
        }
    }
}

function checkvertical(word, row, col, matrix, nontracklist) {
    if (row + word.length > matrix.length) {
        return false;
    }
    for (let i = row; i < row + word.length; i++) {
        for (const coord of nontracklist) {
            if (i === coord.row && col === coord.col) {
                return false;
            }
        }
    }
    for (let i = 0; i < word.length; i++) {
        if (matrix[row + i][col] !== '-' && matrix[row + i][col] !== word.charAt(i)) {
            return false;
        }
    }
    for (let i = 0; i < word.length; i++) {
        if (col > 0) {
            if (matrix[row + i][col - 1] !== '-') {
                if ((i > 0 && matrix[row + i - 1][col - 1] !== '-') || (i < word.length - 1 && matrix[row + i + 1][col - 1] !== '-')) {
                    return false;
                }
            }
        }
        if (col < matrix[0].length - 1) {
            if (matrix[row + i][col + 1] !== '-') {
                if ((i > 0 && matrix[row + i - 1][col + 1] !== '-') || (i < word.length - 1 && matrix[row + i + 1][col + 1] !== '-')) {
                    return false;
                }
            }
        }
    }
    if (row > 0 && matrix[row - 1][col] !== '-') {
        return false;
    }
    if (row + word.length < matrix.length && matrix[row + word.length][col] !== '-') {
        return false;
    }
    return true;
}

function checkhorizontal(word, row, col, matrix, nontracklist) {
    if (col + word.length > matrix[0].length) {
        return false;
    }
    for (let i = col; i < col + word.length; i++) {
        for (const coord of nontracklist) {
            if (row === coord.row && i === coord.col) {
                return false;
            }
        }
    }
    for (let i = 0; i < word.length; i++) {
        if (matrix[row][col + i] !== '-' && matrix[row][col + i] !== word.charAt(i)) {
            return false;
        }
    }
    for (let i = 0; i < word.length; i++) {
        if (row > 0) {
            if (matrix[row - 1][col + i] !== '-') {
                if ((i > 0 && matrix[row - 1][col + i - 1] !== '-') || (i < word.length - 1 && matrix[row - 1][col + i + 1] !== '-')) {
                    return false;
                }
            }
        }
        if (row < matrix.length - 1) {
            if (matrix[row + 1][col + i] !== '-') {
                if ((i > 0 && matrix[row + 1][col + i - 1] !== '-') || (i < word.length - 1 && matrix[row + 1][col + i + 1] !== '-')) {
                    return false;
                }
            }
        }
    }
    if (col > 0 && matrix[row][col - 1] !== '-') {
        return false;
    }
    if (col + word.length < matrix[0].length && matrix[row][col + word.length] !== '-') {
        return false;
    }
    return true;
}



function placehorizontal(word, placed, row, col, matrix, nontracklist,tracklist) {
    if (!tracklist.includes(new Coordinate(row,col))) {
        tracklist.push(new Coordinate(row, col));
      }
    
    for (let i = 0; i < word.length; i++) {
        matrix[row][col + i] = word.charAt(i);
    }
    if (col > 0) {
        nontracklist.push(new Coordinate(row, col - 1));
        if (row > 0) {
            nontracklist.push(new Coordinate(row - 1, col - 1));
        }
        if (row < matrix.length - 1) {
            nontracklist.push(new Coordinate(row + 1, col - 1));
        }
    }
    if (col + word.length < matrix[0].length) {
        nontracklist.push(new Coordinate(row, col + word.length));
        if (row > 0) {
            nontracklist.push(new Coordinate(row - 1, col + word.length));
        }
        if (row < matrix.length - 1) {
            nontracklist.push(new Coordinate(row + 1, col + word.length));
        }
    }
    if (row > 0) {
        nontracklist.push(new Coordinate(row - 1, col));
        nontracklist.push(new Coordinate(row - 1, col + word.length - 1));
    }
    if (row < matrix.length - 1) {
        nontracklist.push(new Coordinate(row + 1, col));
        nontracklist.push(new Coordinate(row + 1, col + word.length - 1));
    }
    placed.push(word);
}

function placevertical(word, placed, row, col, matrix, nontracklist,tracklist) {
    if (!tracklist.includes(new Coordinate(row,col))) {
        tracklist.push(new Coordinate(row, col));
      }
    for (let i = 0; i < word.length; i++) {
        matrix[row + i][col] = word.charAt(i);
    }
    if (row > 0) {
        nontracklist.push(new Coordinate(row - 1, col));
        if (col > 0) {
            nontracklist.push(new Coordinate(row - 1, col - 1));
        }
        if (col < matrix[0].length - 1) {
            nontracklist.push(new Coordinate(row - 1, col + 1));
        }
    }
    if (row + word.length < matrix.length) {
        nontracklist.push(new Coordinate(row + word.length, col));
        if (col > 0) {
            nontracklist.push(new Coordinate(row + word.length, col - 1));
        }
        if (col < matrix[0].length - 1) {
            nontracklist.push(new Coordinate(row + word.length, col + 1));
        }
    }
    if (col > 0) {
        nontracklist.push(new Coordinate(row, col - 1));
    }
    if (col < matrix[0].length - 1) {
        nontracklist.push(new Coordinate(row, col + 1));
    }
    placed.push(word);
}

function print(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        console.log(matrix[i].join(" "));
    }
}


const wordList = [
    new Word("QUEUE", "A data structure that follows FIFO"),
    new Word("SORTING", "The process of arranging elements"),
    new Word("SETS", "A collection of unique elements"),
    new Word("DEQUE", "A double-ended queue"),
    new Word("CHAR", "A character data type"),
    new Word("STACK", "A data structure that follows LIFO"),
    new Word("TREE", "A hierarchical data structure"),
    new Word("GREEDY", "An algorithm that makes local optimal choices"),
    new Word("ARRAY", "A collection of elements identified by index"),
    new Word("RECURSION", "A function that calls itself")
];


let size = 11;
let tracklist = [];
let QuestionNum = [];
const matrix = Array.from({ length: size }, () => Array(size).fill('-'));
function main() {
    const random = Math.random;
    const nontracklist = [];
    const placed = [];
    wordList.sort((w1, w2) => w2.getLength() - w1.getLength());

    init(matrix);

    let row, col;
    let placedWord = false;

    for (let attempts = 0; attempts < 100; attempts++) {
        for (let i = 0; i < wordList.length; i++) {
            row = Math.floor(random() * matrix.length);
            col = Math.floor(random() * matrix[0].length);
            const vertical = random() < 0.5;

            if (placed.includes(wordList[i].word)) {
                continue;
            }

            if (vertical) {
                if (checkvertical(wordList[i].word, row, col, matrix, nontracklist)) {
                    placevertical(wordList[i].word, placed, row, col, matrix, nontracklist,tracklist);
                    checkhorizontalafter(wordList, wordList[i].word, placed, row, col, matrix, nontracklist,tracklist);
                    placedWord = true;
                    break;
                }
            } else {
                if (checkhorizontal(wordList[i].word, row, col, matrix, nontracklist)) {
                    placehorizontal(wordList[i].word, placed, row, col, matrix, nontracklist,tracklist);
                    checkafter(wordList, wordList[i].word, placed, row, col, matrix, nontracklist,tracklist);
                    placedWord = true;
                    break;
                }
            }
        }
    }

    if (!placedWord) {
        console.log("Failed to place the longest word.");
    }
    
    print(matrix);
    printTracklist(tracklist);

    console.log();
    console.log();
    console.log();
    const booleanMatrix = convertToBooleanMatrix(matrix);
    document.getElementById('clearButton').addEventListener('click', clearCrossword);
    
    createCrossword(matrix, booleanMatrix,wordList,tracklist);
    document.getElementById('Submit').addEventListener('click', submitCrossword);
    const generateButton = document.getElementById('Generate');
    generateButton.onclick = function() {
      location.reload();
    };

}

function convertToBooleanMatrix(matrix) {
    return matrix.map(row => row.map(cell => cell !== '-'));
}

class Coordinate1 {
    constructor(row, col, clueNumber) {
        this.row = row;
        this.col = col;
        this.clueNumber = clueNumber;
    }

    toString() {
        return `(${this.row}, ${this.col}, ${this.clueNumber})`;
    }
}

function createCrossword(matrix, booleanMatrix, wordList, tracklist) {
    const crosswordContainer = document.getElementById('crossword');
    const rows = matrix.length;
    const cols = matrix[0].length;

    crosswordContainer.style.display = 'grid';
    crosswordContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    crosswordContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

    crosswordContainer.innerHTML = '';

    let clueNumber = 1;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('div');
            cell.className = 'crossword-cell-wrapper';

            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1;
            input.className = 'crossword-cell';
            input.dataset.row = i;
            input.dataset.col = j;

            const trackItem = tracklist.find(item => item.row === i && item.col === j);
            if (trackItem) {
                const clueSpan = document.createElement('span');
                clueSpan.className = 'clue-number';
                clueSpan.textContent = clueNumber;

                QuestionNum.push(new Coordinate1(i, j, clueNumber));

                clueNumber++;
                cell.appendChild(clueSpan);
            }

            if (!booleanMatrix[i][j]) {
                input.classList.add('black-box');
                input.disabled = true;
            } else {
                input.value = '';
                input.addEventListener('keydown', (event) => handleArrowNavigation(event, i, j, booleanMatrix));
            }

            cell.appendChild(input);
            crosswordContainer.appendChild(cell);
        }
    }

    generateClues(wordList, matrix, QuestionNum);
}

function handleArrowNavigation(event, row, col, booleanMatrix) {
    const inputs = document.querySelectorAll('.crossword-cell');
    const cols = booleanMatrix[0].length;
    const rows = booleanMatrix.length;

    const currentIndex = row * cols + col;
    let nextIndex;

    switch (event.key) {
      case 'ArrowUp':
        if (row > 0) nextIndex = (row - 1) * cols + col;
        break;
      case 'ArrowDown':
        if (row < rows - 1) nextIndex = (row + 1) * cols + col;
        break;
      case 'ArrowLeft':
        if (col > 0) nextIndex = row * cols + (col - 1);
        break;
      case 'ArrowRight':
        if (col < cols - 1) nextIndex = row * cols + (col + 1);
        break;
    }
  
   
    if (nextIndex !== undefined && inputs[nextIndex] && !inputs[nextIndex].disabled) {
      inputs[nextIndex].focus();
      event.preventDefault(); 
    }
  }
  
  function submitCrossword() {
    const inputs = document.querySelectorAll('.crossword-cell');
    let isCorrect = true; 

    
    inputs.forEach((input) => {
        const row = parseInt(input.dataset.row);
        const col = parseInt(input.dataset.col);

        if (!input.disabled) { 
            if (input.value.toUpperCase() !== matrix[row][col]) { 
                isCorrect = false;
                input.classList.add('incorrect'); 
            } else {
                input.classList.remove('incorrect');
                input.classList.add('correct');
                
            }
        }
    });

    const messageElement = document.getElementById('message');
    if (isCorrect) {
        messageElement.textContent = "Correct! You've completed the crossword puzzle!";
        messageElement.style.color = "green";
    } else {
        messageElement.textContent = "Some answers are incorrect. Please try again.";
        messageElement.style.color = "red";
    }
}

  
  
  function generateClues(wordList, matrix, QuestionNum) {
    const cluesContainer = document.getElementById('clus');
    cluesContainer.innerHTML = ''; 
  
    
    const acrossTitle = document.createElement('h2');
    acrossTitle.textContent = "Across Clues:";
    cluesContainer.appendChild(acrossTitle);
  
    const acrossList = document.createElement('ul');
    cluesContainer.appendChild(acrossList);
  
    
    for (const wordObj of wordList) {
      if (isWordPlacedHorizontally(wordObj.word, matrix)) {
        const clueNumber = findClueNumberForWord(wordObj.word, matrix, QuestionNum, true); 
        if (clueNumber !== null) {
          const listItem = document.createElement('li');
          listItem.textContent = `${clueNumber}. ${wordObj.clue}`;
          acrossList.appendChild(listItem);
        }
      }
    }
  
    
    const downTitle = document.createElement('h2');
    downTitle.textContent = "Down Clues:";
    cluesContainer.appendChild(downTitle);
  
    const downList = document.createElement('ul');
    cluesContainer.appendChild(downList);
  
    
    for (const wordObj of wordList) {
      if (isWordPlacedVertically(wordObj.word, matrix)) {
        const clueNumber = findClueNumberForWord(wordObj.word, matrix, QuestionNum, false); 
        if (clueNumber !== null) {
          const listItem = document.createElement('li');
          listItem.textContent = `${clueNumber}. ${wordObj.clue}`; 
          downList.appendChild(listItem);
        }
      }
    }
  }
  
 
  function isWordPlacedHorizontally(word, matrix) {
    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[0].length - word.length + 1; col++) {
        let match = true;
        for (let i = 0; i < word.length; i++) {
          if (matrix[row][col + i] !== word.charAt(i)) {
            match = false;
            break;
          }
        }
        if (match) {
          return true;
        }
      }
    }
    return false;
  }
  
  function isWordPlacedVertically(word, matrix) {
    for (let row = 0; row < matrix.length - word.length + 1; row++) {
      for (let col = 0; col < matrix[0].length; col++) {
        let match = true;
        for (let i = 0; i < word.length; i++) {
          if (matrix[row + i][col] !== word.charAt(i)) {
            match = false;
            break;
          }
        }
        if (match) {
          return true;
        }
      }
    }
    return false;
  }

  
  function findClueNumberForWord(word, matrix, QuestionNum, isAcross) {
    
    for (const clue of QuestionNum) {
      const { row, col, clueNumber } = clue;

      
      if (isAcross) {
       
        if (col + word.length <= matrix[0].length) {
          let match = true;
          for (let i = 0; i < word.length; i++) {
            if (matrix[row][col + i] !== word.charAt(i)) {
              match = false;
              break;
            }
          }
          if (match) {
            return clueNumber; 
          }
        }
      } else {
        
        if (row + word.length <= matrix.length) {
          let match = true;
          for (let i = 0; i < word.length; i++) {
            if (matrix[row + i][col] !== word.charAt(i)) {
              match = false;
              break;
            }
          }
          if (match) {
            return clueNumber; 
          }
        }
      }
    }
    return null; 
  }

  function clearCrossword() {
    const inputs = document.querySelectorAll('.crossword-cell');
    inputs.forEach(input => {
      if (!input.disabled) {
        input.value = ''; 
        input.classList.remove('incorrect'); 
        input.classList.remove('correct'); 
      }
    });
    const messageElement = document.getElementById('message');
    if (messageElement) {
      messageElement.textContent = ''; 
    }
  }
  function printTracklist(tracklist) {
    if (tracklist.length === 0) {
      console.log("Tracklist is empty.");
      return;
    }
  
    console.log("Tracklist (coordinates of the first placed word):");
    for (const coord of tracklist) {
      console.log(coord.toString()); 
    }
  }

main();

