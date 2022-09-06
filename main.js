function validRow(matrix, i, val){
    for(let j=0;j < 9;j++){
        if(matrix[i][j] == val)return false;
    }
    return true;
}
function validCol(matrix, j, val){
    for(i=0;i<9;i++){
        if(matrix[i][j] == val)return false;
    }
    return true;
}
function validBox(matrix, i, j, val){
    let x = (Math.floor(i/3))*3;
    let y = (Math.floor(j/3))*3;
    for(let xi=x;xi<x+3;xi++){
        for(let yi=y; yi< y+3;yi++){
            if(matrix[xi][yi] == val)return false;
        }
    }
    return true;
}

function solveHelper(matrix, i, j){
    // console.log("in solve helper", i, j);
    if(i == 9 && j == 0)return true; //end case
    let icpy = i;
    let jcpy = j;
    icpy = i + Math.floor((j + 1) / 9);
    jcpy = (j + 1) % 9;
    
    if(matrix[i][j] != 0){//board value already filled
        return solveHelper(matrix, icpy, jcpy);
    }
    for(let val=1;val<=9;val++){
        let rowCheck = validRow(matrix, i, val);
        let colCheck = validCol(matrix, j, val);
        let boxCheck = validBox(matrix, i, j, val);
        
        if(rowCheck && colCheck && boxCheck){
            matrix[i][j] = val;
            if(solveHelper(matrix, icpy , jcpy))return true;
        }
        matrix[i][j] = 0;
       
    }
    return false;
}
function validateSudoku(matrix){
    let cnt = [];
    
    for(let i=0;i<9;i++){
        cnt = [];
        for(let i=0;i<=9;i++)cnt[i] = 0;

        for(let j=0;j<9;j++){
            cnt[matrix[i][j]] += 1;
        }
        for(let num = 1;num<=9;num++){
            if(cnt[num]>=2)return false;
        }
    }

    // Check columns
    for(let j=0;j<9;j++){
        cnt = [];
        for(let i=0;i<=9;i++)cnt[i] = 0;

        for(let i=0;i<9;i++){
            cnt[matrix[i][j]] += 1;
        }
        for(let num = 1;num<=9;num++){
            if(cnt[num]>=2)return false;
        }
    }
    // check boxes
    let rowVal=[0,3,6];
    let colVal=[0,3,6];
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            cnt = [];
            for(let i=0;i<=9;i++)cnt[i] = 0;

            for(let x=rowVal[i];x<rowVal[i]+3;x++){
                for(let y=colVal[j]; y<colVal[j]+3;y++){
                    cnt[matrix[x][y]] += 1;
                }
            }
            
            for(let num = 1;num<=9;num++){
                if(cnt[num]>=2)return false;
            }
        }
    }
    return true;
}
function solveSudoku(){
    let matrix = new Array(9);
    for(let i=0;i<9;i++){
        matrix[i] = [];
    }
    let unfilledX = [];//To store coordinates of already unfilled cells
    let unfilledY = [];//To store coordinates of already unfilled cells
    for(let i =0;i<9;i++){
        for(let j=0;j<9;j++){
            let num = document.getElementById('t'+i+j).value;
            if(num == "" || (num >= "1" && num <= "9")){
                matrix[i][j] = (num === "") ? 0 : parseInt(num);
            }
            else{
                alert("Please enter numbers between 1 and 9 (both inclusive).");
                return;
            }
            if(num === ""){
                unfilledX.push(i);
                unfilledY.push(j);
            }
        }
    }
    if(!validateSudoku(matrix)){
        alert("Please enter a valid Sudoku.")
        return;
    }
    let result = solveHelper(matrix,0,0);
    // console.log("solve helper returned", result);
    if(result){
        for(let i =0;i<9;i++){
            for(let j=0;j<9;j++){
                let num = matrix[i][j];
                document.getElementById('t'+i+j).value = num;
            }
        }
        for(let k=0;k<unfilledX.length;k++){
            document.getElementById('t'+unfilledX[k]+unfilledY[k]).style.backgroundColor="aqua";
        }
    }
}

const solveBtn = document.getElementById("solveIt");
solveBtn.onclick = solveSudoku;

function resetSudoku(){
    for(let i =0;i<9;i++){
        for(let j=0;j<9;j++){
            document.getElementById('t'+i+j).value = "";
            document.getElementById('t'+i+j).style.backgroundColor="white";
        }
    }
}
const resetBtn = document.getElementById("resetIt");
resetBtn.onclick = resetSudoku;

//solving the board when user presses the enter key
document.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    console.log(document.activeElement.id);
    // console.log('Enter key pressed')
    solveSudoku();
  }
});

document.addEventListener('keydown', (e) => {  
    // e = e || window.event;  
    const curEl = document.activeElement;
    if(curEl.nodeName === "INPUT"){
        if (e.key === "ArrowUp") {  
            const nextFieldID = 't' + (curEl.id[1]==='0' ? '0' : String.fromCharCode(curEl.id[1].charCodeAt() - 1 )) + + curEl.id[2]; 
            document.getElementById(nextFieldID).focus(); 
            // console.log('up arrow pressed');  
        } else if (e.key === "ArrowDown") {  
            const nextFieldID = 't' + (curEl.id[1]==='8' ? '8' : String.fromCharCode(curEl.id[1].charCodeAt() + 1 )) + + curEl.id[2]; 
            document.getElementById(nextFieldID).focus(); 
            // console.log('down arrow pressed');  
        } else if (e.key === "ArrowLeft") { 
            const nextFieldID = 't' + curEl.id[1] + (curEl.id[2]==='0' ? '0' : String.fromCharCode(curEl.id[2].charCodeAt() - 1 )); 
            document.getElementById(nextFieldID).focus();  
            // console.log('left arrow pressed'); 
        } else if (e.key === "ArrowRight") {  
            // console.log('right arrow pressed'); 
            const nextFieldID = 't' + curEl.id[1] + (curEl.id[2]==='8' ? '8' : String.fromCharCode(curEl.id[2].charCodeAt() + 1 )); 
            document.getElementById(nextFieldID).focus(); 
        }  
    }
})
  