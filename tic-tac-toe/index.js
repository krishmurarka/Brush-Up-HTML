const Minimum_Grid_size_Required =3;
const prompt = require("prompt-sync")();
class TicTacToeGame{
    #gridSize
    #gameMatrix
    #playerPlaying
    constructor(){
        console.log("Welcome to Console Based Tic-Tac-Toe!!!!");
        this.#gridSize = this.get_grid_input()

        if(this.#gridSize !== null){
            this.#gameMatrix = Array(this.#gridSize).fill().map(() => Array(this.#gridSize).fill(-1));
        }
        this.#playerPlaying =1;

    }
    startGame(){
        let maxChances = this.#gridSize * this.#gridSize;
        let currentChance = 1;
        this.printGrid()
        while(currentChance <= maxChances){

            console.log(`Player ${this.#playerPlaying%2 ==0 ? 2 : 1}, select your location`)
            let x = prompt("")
            let y = prompt("")
            if(this.verifyLocation(x,y)){
                this.#gameMatrix[x][y] = this.#playerPlaying == 1 ? "X" : "0"
                if(this.checkWin()){
                     this.printGrid()
                    console.log(`Whoohoooo!!!!! Player ${this.#playerPlaying%2 ==0 ? 2 : 1} Won !!!!`)
                    break;
                } 
                this.#playerPlaying = this.#playerPlaying ^ 1;
            }else{
                console.log("Wrong Location")
                break
            }

            this.printGrid()
        }
    }

    verifyLocation(row, col){

        if(row < this.#gridSize && row >= 0 && col < this.#gridSize && col >=0 && this.#gameMatrix[row][col]===-1){
            return true;
        }
        return false;
    }

    checkWin() {
        // Check rows and columns
        for (let i = 0; i < this.#gridSize; i++) {
            if (this.checkLine(this.#gameMatrix[i]) || this.checkLine(this.#gameMatrix.map(row => row[i]))) {
                return true;
            }
        }
    
        // Check diagonals
        if (this.checkLine(this.#gameMatrix.map((row, idx) => row[idx])) || // Major diagonal
            this.checkLine(this.#gameMatrix.map((row, idx) => row[this.#gridSize - 1 - idx]))) { // Minor diagonal
            return true;
        }
    
        return false;
    }
    
    checkLine(line) {
        const firstCell = line[0];
        if (firstCell === -1) return false;
    
        return line.every(cell => cell === firstCell);
    }
    

    get_grid_input(){
        let gridSize  = parseInt(prompt("Enter the Grid Dimension you would like to play in : "))

        if(isNaN(gridSize) || gridSize < Minimum_Grid_size_Required){
            console.log("The Grid Size is be atleast ", Minimum_Grid_size_Required);
            return null;
        }
        return gridSize;
    }

    printGrid(){

        for(let i =0;i< this.#gridSize; i++){
            
            this.printTopPattern()
            this.printRows(i)
            
        }
        this.printTopPattern()
    }

    printTopPattern(){
            let top_design =""
            for(let j =0;j< this.#gridSize; j++){
                    top_design += " ---"
            }
            console.log(top_design)
    }
    printRows(rowNo){
            let row = ""
            for(let j =0;j<this.#gridSize; j++){
                row+= "| ";
                if(this.#gameMatrix[rowNo][j] != "-1"){
                    row+= this.#gameMatrix[rowNo][j]
                    row+=" ";
                }else row+="  ";
            }
            row+= "|"
            console.log(row)
    }
    get gridSize(){
        return this.#gridSize
    }
}


let game = new TicTacToeGame();
if(game.gridSize === null)return
game.startGame();