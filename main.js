const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field) {
    this.field = field;
    this.row = 0;
    this.column = 0;
  }

  startGame() {
    // PRINT FIELD INITIALLY
    this.print();
    let gameOverFlag = false;

    while (gameOverFlag != true) {
      // RETRIEVE USER MOVE
      const move = prompt("Which way?");
      console.log(`Direction: ${move}`);

      switch (move) {
        case "r":
          this.column += 1;
          break;
        case "d":
          this.row += 1;
          break;
        case "u":
          this.row -= 1;
          break;
        case "l":
          this.column -= 1;
          break;
        default:
      }

      // CHECK IF OUT OF BOUNDS
      if (
        [this.row] < 0 ||
        [this.row] > this.field.length - 1 ||
        [this.column] < 0 ||
        [this.column] > this.field.length - 1
      ) {
        console.log("OUT OF BOUNDS");
        gameOverFlag = true;
        break;
      }

      // CHECK IF HOLE
      if (this.field[this.row][this.column] === hole) {
        console.log("GAME OVER YOU HAVE FALLEN DOWN A HOLE!");
        gameOverFlag = true;
        break;
      }

      // CHECK IF HAT
      if (this.field[this.row][this.column] === hat) {
        console.log("CONGRATULATIONS, YOU WIN!");
        gameOverFlag = true;
        break;
      }

      // SET NEW USER POSITION
      if (gameOverFlag != true) {
        this.field[this.row][this.column] = pathCharacter;

        // PRINT UPDATED FIELD
        this.print();
      }
    }
  }

  print() {
    for (let row of this.field) {
      console.log(row.join(" "));
    }
  }

  randomIndex(upperRange){
      return Math.floor(Math.random() * upperRange);
  }

  static generateField(rows, columns, percentageHoles) {
    let fieldArray = [];

    // GENERATE GRID BASED ON HEIGHT AND WIDTH
    for (let i = 0; i < rows; i++) {
      const line = [];
      for (let j = 0; j < columns; j++) {
        line.push(fieldCharacter);
      }
      fieldArray.push(line);
    }

    // ADD USER
    fieldArray[0][0] = pathCharacter;

    // ADD HAT IN
    const hatX = Math.floor(Math.random() * columns);
    const hatY = Math.floor(Math.random() * rows);

    fieldArray[hatX][hatY] = hat;

    // CALCULATE REQUIRED HOLES
    const numCells = fieldArray.length * fieldArray[0].length;
    const numHoles = Math.round((percentageHoles / 100) * numCells);

    // ADD HOLES IN
    for (let i = 0; i < numHoles; i++) {
      const holeX = Math.floor(Math.random() * columns);
      const holeY = Math.floor(Math.random() * rows);

      // CHECK IF RANDOM HOLE INDEX IS ALREADY PATH OR HAT
      if (
        fieldArray[holeX][holeY] == pathCharacter ||
        fieldArray[holeX][holeY] == hat
      ) {
      }

      fieldArray[holeX][holeY] = hole;
    }

    return fieldArray;
  }
}

let field = Field.generateField(10, 10, 7);

const myField = new Field(field);

myField.startGame();
