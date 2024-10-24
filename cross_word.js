// const wordList = require('./data.js');
import { wordList } from './data.js';
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
class Track {
    constructor(x, y,direction,word) {
        this.row = x;
        this.col = y;
        this.direction = direction;
        this.word = word;
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



function checkhorizontalafter(wordList, oldword, placed, row, col, matrix, nontracklist, tracklist, horizontalCount) {
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
                            placehorizontal(word, placed, row + i, newCol, matrix, nontracklist, tracklist);
                            horizontalCount++; // Increment horizontal count when a word is placed horizontally
                            return { horizontalCount };
                        }
                    }
                }
            }
        }
    }
    return {horizontalCount} ; // Return the updated horizontalCount
}

function checkafter(wordList, oldword, placed, row, col, matrix, nontracklist, tracklist, verticalCount) {
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
                            placevertical(word, placed, newRow, col + i, matrix, nontracklist, tracklist);
                            verticalCount++; // Increment vertical count when a word is placed vertically
                            return { verticalCount };
                        }
                    }
                }
            }
        }
    }
    return  {verticalCount }; // Return the updated verticalCount
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
    if (!tracklist.includes(new Track(row,col,'horizontal',word))) {
        tracklist.push(new Track(row, col,'horizontal',word));
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
    if (!tracklist.includes(new Track(row,col,'vertical',word))) {
        tracklist.push(new Track(row, col,'vertical',word));
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

let size = 10;
let tracklist = [];
let QuestionNum = [];
let matrix = Array.from({ length: size }, () => Array(size).fill('-'));

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('sizeForm');
    const sizeInput = document.getElementById('size');
    const messageDiv = document.getElementById('message');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); 

        const sizeValue = parseInt(sizeInput.value); 

        // Check if the screen width is less than or equal to 500px
        const maxSize = window.innerWidth <= 500 ? 15 : 20;

        if (sizeValue < 5 || sizeValue > maxSize || isNaN(sizeValue)) {
            messageDiv.textContent = `Please enter a valid size between 5 and ${maxSize}.`;
            messageDiv.style.color = "red";
        } else {
            messageDiv.textContent = `Crossword size set to: ${sizeValue} x ${sizeValue}`;
            messageDiv.style.color = "green";
            
            size = sizeValue; 
            matrix = Array.from({ length: size }, () => Array(size).fill('-'));
            
            main();
        }
    });

    document.getElementById('clearButton').addEventListener('click', clearCrossword);
    document.getElementById('Submit').addEventListener('click', submitCrossword);
    document.getElementById('Generate').addEventListener('click', function(event) {
        event.preventDefault();
    
        let sizeValue = parseInt(sizeInput.value); 
        if (isNaN(sizeValue) || sizeValue === undefined) {
            sizeValue = 10;
        }

        // Check if the screen width is less than or equal to 500px
        const maxSize = window.innerWidth <= 500 ? 15 : 20;

        if (sizeValue < 5 || sizeValue > maxSize) {
            messageDiv.textContent = `Please enter a valid size between 5 and ${maxSize}.`;
            messageDiv.style.color = "red";
        } else {
            messageDiv.textContent = `Crossword size set to: ${sizeValue} x ${sizeValue}`;
            messageDiv.style.color = "green";
            
            size = sizeValue; 
            matrix = Array.from({ length: size }, () => Array(size).fill('-'));
            
            main();   
        }
    });

    main();
});


function main() {
    const random = Math.random;
    const nontracklist = [];
    const placed = [];
     tracklist = [];
     QuestionNum = [];

    wordList.sort((w1, w2) => w2.getLength() - w1.getLength());

    init(matrix);

    let row, col;
    let placedWord = false;
    let verticalCount = 0;
    let horizontalCount = 0; // Count the number of words placed vertically/horizontally

    for (let attempts = 0; attempts < 100; attempts++) {
        for (let i = 0; i < wordList.length; i++) {
            // Centered placement: Try to place words more towards the center
            row = Math.floor(matrix.length / 2) + Math.floor((random() - 0.5) * matrix.length * 0.5);
            col = Math.floor(matrix[0].length / 2) + Math.floor((random() - 0.5) * matrix[0].length * 0.5);
            
            const vertical = verticalCount <= horizontalCount;  // Place vertically if vertical count is less or equal

            if (placed.includes(wordList[i].word)) {
                continue;
            }

            if (vertical) {
                if (checkvertical(wordList[i].word, row, col, matrix, nontracklist)) {
                    placevertical(wordList[i].word, placed, row, col, matrix, nontracklist, tracklist);
                    const resultHorizontal = checkhorizontalafter(wordList, wordList[i].word, placed, row, col, matrix, nontracklist, tracklist, horizontalCount);
                    horizontalCount = resultHorizontal.horizontalCount;
                    placedWord = true;
                    verticalCount++;  
                    break;
                }
            } else {
                if (checkhorizontal(wordList[i].word, row, col, matrix, nontracklist)) {
                    placehorizontal(wordList[i].word, placed, row, col, matrix, nontracklist, tracklist);
                    const resultVertical = checkafter(wordList, wordList[i].word, placed, row, col, matrix, nontracklist, tracklist, verticalCount);
                    verticalCount = resultVertical.verticalCount;
                    placedWord = true;
                    horizontalCount++; 
                    break;
                }
            }
        }
    }

   
    if (!placedWord) {
        console.log("Failed to place the longest word.");
    }

   
    analyzeAndInsertWords(wordList, placed, matrix, nontracklist, tracklist,verticalCount,horizontalCount);

  
    print(matrix);
    printTracklist(tracklist);
    
    console.log();
    console.log();
    console.log();
    
    const booleanMatrix = convertToBooleanMatrix(matrix);
    createCrossword(matrix, booleanMatrix, wordList, tracklist);
    printQuestionNum(QuestionNum);

 

}


function convertToBooleanMatrix(matrix) {
    return matrix.map(row => row.map(cell => cell !== '-'));
}
class Coordinate1 {
    constructor(row, col, clueNumber, direction, word) {
        this.row = row;
        this.col = col;
        this.clueNumber = clueNumber;
        this.direction = direction;
        this.word = word;
    }

    toString() {
        return `(${this.row}, ${this.col}, Clue Number: ${this.clueNumber}, Direction: ${this.direction}, Word: ${this.word})`;
    }
}

function analyzeAndInsertWords(wordList, placed, matrix, nontracklist, tracklist, verticalCount, horizontalCount) {
    let canPlaceMoreWords = true;

    while (canPlaceMoreWords) {
        canPlaceMoreWords = false;  

        for (let row = 0; row < matrix.length; row++) {
            for (let col = 0; col < matrix[0].length; col++) {
                if (matrix[row][col] === '-') {  

                    for (let j = 0; j < wordList.length; j++) {
                        const word = wordList[j].word;

                        
                        if (placed.includes(word)) {
                            continue;
                        }

                        const vertical = verticalCount <= horizontalCount; 
                        
                       
                        if (vertical) {
                            if (checkvertical(word, row, col, matrix, nontracklist)) {
                                placevertical(word, placed, row, col, matrix, nontracklist, tracklist);
                                const resultHorizontal = checkhorizontalafter(wordList, word, placed, row, col, matrix, nontracklist, tracklist, horizontalCount);
                                horizontalCount = resultHorizontal.horizontalCount; 
                                canPlaceMoreWords = true;
                                verticalCount++; 
                                break;  
                            }
                        } else {
                           
                            if (checkhorizontal(word, row, col, matrix, nontracklist)) {
                                placehorizontal(word, placed, row, col, matrix, nontracklist, tracklist);
                                const resultVertical = checkafter(wordList, word, placed, row, col, matrix, nontracklist, tracklist, verticalCount);
                                verticalCount = resultVertical.verticalCount; 
                                canPlaceMoreWords = true;
                                horizontalCount++;  
                                break;  
                            }
                        }
                    }

                }
                if (canPlaceMoreWords) break;  
            }
            if (canPlaceMoreWords) break;  
        }
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
            // console.log(input.dataset);
            input.dataset.row = i;
            input.dataset.col = j;

            const trackItem = tracklist.find(item => item.row === i && item.col === j);
            if (trackItem) {
                const clueSpan = document.createElement('span');
                clueSpan.className = 'clue-number';
                clueSpan.textContent = clueNumber;

                QuestionNum.push(new Coordinate1(i, j, clueNumber,trackItem.direction,trackItem.word));

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
    let correctWordCount = 0; 
    const maxlength = QuestionNum.length; 

    
    const checkedInputs = new Set();

   
    inputs.forEach((input) => {
        input.classList.remove('correct');
        input.classList.remove('incorrect');
    });

    
    inputs.forEach((input) => {
        let row = parseInt(input.dataset.row);
        let col = parseInt(input.dataset.col);

        let trackItem = QuestionNum.find(item => item.row === row && item.col === col);
        if (trackItem) {
            const word = trackItem.word.toUpperCase(); 
            const direction = trackItem.direction;
            let isWordCorrect = true; 

            for (let i = 0; i < word.length; i++) {
                let expectedLetter;
                let currentInput; 

                if (direction === 'horizontal') {
                    expectedLetter = matrix[row][col + i]; 
                    currentInput = document.querySelector(`.crossword-cell[data-row="${row}"][data-col="${col + i}"]`);
                } else { // vertical
                    expectedLetter = matrix[row + i][col]; 
                    currentInput = document.querySelector(`.crossword-cell[data-row="${row + i}"][data-col="${col}"]`);
                }

                
                if (currentInput && !currentInput.disabled) {
                    if (expectedLetter === undefined || currentInput.value.toUpperCase() !== expectedLetter) {
                        isWordCorrect = false; // Mark the word as incorrect
                        currentInput.classList.add('incorrect'); // Add 'incorrect' class for wrong letters
                        currentInput.classList.remove('correct');
                    } else {
                        currentInput.classList.remove('incorrect');
                        currentInput.classList.add('correct'); // Add 'correct' class for correct letters
                    }

                    checkedInputs.add(currentInput);
                }
            }

            if (isWordCorrect) {
                correctWordCount++;
            }
        }
    });

    const messageElement = document.getElementById('message');
    if (correctWordCount === maxlength) {
        messageElement.textContent = `Correct! You've completed the crossword puzzle!`;
        messageElement.style.color = "green";
    } else {
        messageElement.textContent = `Some answers are incorrect. You have ${correctWordCount} out of ${maxlength} words correct.\nPlease try again.`;
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
  function printQuestionNum(QuestionNum) {
    if (QuestionNum.length === 0) {
      console.log("QuestionNum is empty.");
      return;
    }
  
    console.log("QuestionNum (coordinates of the first placed word):");
    for (const coord of QuestionNum) {
      console.log(coord.toString()); 
    }
  }

  main();
