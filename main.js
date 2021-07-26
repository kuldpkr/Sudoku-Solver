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

function solveSudoku(){
    let matrix = new Array(9);
    for(let i=0;i<9;i++){
        matrix[i] = [];
    }

    for(let i =0;i<9;i++){
        for(let j=0;j<9;j++){
            let num = document.getElementById('t'+i+j).value;
            matrix[i][j] = (num === "") ? 0 : parseInt(num);
        }
    }
    // console.log(matrix);
    let result = solveHelper(matrix,0,0);
    // console.log("solve helper returned", result);
    if(result){
        for(let i =0;i<9;i++){
            for(let j=0;j<9;j++){
                let num = matrix[i][j];
                document.getElementById('t'+i+j).value = num;
            }
        }
    }
}

const solveBtn = document.getElementById("solveIt");
solveBtn.onclick = solveSudoku;
