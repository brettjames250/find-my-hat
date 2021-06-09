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

      switch (move) {
        case "r":
          this.column += 1;
          console.log("RIGHT");
          break;
        case "d":
          this.row += 1;
          console.log("DOWN");
          break;
        case "u":
          this.row -= 1;
          console.log("UP");
          break;
        case "l":
          this.column -= 1;
          console.log("LEFT");
          break;
        default:
          console.log("Enter U, D, L or R.");
      }

      // CHECK IF OUT OF BOUNDS
      if (this.isOutOfBounds()) {
        console.log("OUT OF BOUNDS");
        gameOverFlag = true;
        break;
      }

      // CHECK IF HOLE
      if (this.hasFallenDownHole()) {
        console.log("GAME OVER YOU HAVE FALLEN DOWN A HOLE!");
        gameOverFlag = true;
        break;
      }

      // CHECK IF HAT
      if (this.hasFoundHat()) {
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

  isOutOfBounds() {
    return (
      this.row < 0 ||
      this.row > this.field.length - 1 ||
      this.column < 0 ||
      this.column > this.field[0].length - 1
    );
  }

  hasFoundHat() {
    return this.field[this.row][this.column] === hat;
  }

  hasFallenDownHole() {
    return this.field[this.row][this.column] === hole;
  }

  print() {
    for (let row of this.field) {
      console.log(row.join(" "));
    }
  }

  randomIndex(upperRange) {
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
    const hatColumn = Math.floor(Math.random() * columns);
    const hatRow = Math.floor(Math.random() * rows);

    fieldArray[hatColumn][hatRow] = hat;

    // CALCULATE REQUIRED HOLES
    const numCells = fieldArray.length * fieldArray[0].length;
    const numHoles = Math.round((percentageHoles / 100) * numCells);

    // ADD HOLES IN
    for (let i = 0; i < numHoles; i++) {
      const holeColumn = Math.floor(Math.random() * columns);
      const holeRow = Math.floor(Math.random() * rows);

      fieldArray[holeRow][holeColumn] = hole;

      // CHECK IF HOLE LOCATION IS ALREADY PATH OR HAT
      do {
        fieldArray[holeRow][holeColumn] = hole;
      } while (
        fieldArray[holeColumn][holeRow] === pathCharacter ||
        fieldArray[holeColumn][holeRow] === hat
      );
    }

    return fieldArray;
  }
}

let field = Field.generateField(10, 10, 35);

const myField = new Field(field);

myField.startGame();
