function makeTableHTML(array) {
    let result = "";
    for(let i=0; i<array.length; i++) {
        result += "<tr>";
        for(let j=0; j<array[i].length; j++){
            result += `<td id='${i*3+j}' onclick="changeData(${[i,j]})">`+array[i][j]+"</td>";
        }
        result += "</tr>";
    }
    return result;
} 
function changeData(a,b){
    let empty=(game[a][b]=='')
    if (gamestatus.innerHTML!='Game goes on'){
        if(gamestatus.innerHTML=='X won'){
            score[0]+=1 
        } 
        else if(gamestatus.innerHTML=='O won'){
            score[1]+=1
        } 
        counter.innerHTML=`${score[0]}-${score[1]}`
        game=[['','',''],['','',''],['','','']] 
        gamestatus.innerHTML='Game goes on'
        let turn = true 
        ttt.innerHTML=makeTableHTML(game) 
    } 
    if(checkTie(game)){
        counter.innerHTML=`${score[0]}-${score[1]}`
        game=[['','',''],['','',''],['','','']] 
        let turn = true 
        ttt.innerHTML=makeTableHTML(game)
    }
    if (empty){let paint=turn?x:o 
    game[a][b]=paint 
    checkTie(game)?gamestatus.innerHTML='Tie':gamestatus.innerHTML=renderGame(game) 
    
    ttt.innerHTML=makeTableHTML(game) 
    turn=!turn
    }   
} 
function check(arr){ 
    let gameStr 
    if (arr[0]==arr[1]&&arr[1]==arr[2]){
        if (arr[0]==x){
            gameStr='X won' 
            return gameStr
        }  
        if (arr[0]==o){
            gameStr='O won' 
            return gameStr
        } 
    }       
}
function checkTie(arr){
    let cond1=(renderGame(arr)=='Game goes on') 
    let cond2=true 
    for (const elem of arr){
        for(const elem2 of elem){
            if(elem2==''){
                cond2=false
            }
        }
    } 
    if(cond1&&cond2){
        return true
    } 
    return false
}
function renderGame(arr){
    let gameStr='Game goes on'
    for(const elem of arr){
        if (check(elem)!=undefined){
            return check(elem)
        }  
    } 
    let verticals=[[arr[0][0], arr[1][0], arr[2][0]],[arr[0][1], arr[1][1], arr[2][1]],[arr[0][2], arr[1][2], arr[2][2]]]  
    for(const elem of verticals){
        if (check(elem)!=undefined){
            return check(elem)
        }  
    } 
    let diagonals=[[arr[0][0],arr[1][1],arr[2][2]],[arr[0][2],arr[1][1],arr[2][0]]] 
    for(const elem of diagonals){
        if (check(elem)!=undefined){
            return check(elem)
        }
    }  
    return gameStr
}
const ttt=document.getElementById('ttt')  
const gamestatus=document.getElementById('status')
const x='<img src="1.png" alt="">'
const o='<img src="2.png" alt="">' 
const counter=document.getElementById('counter')
let game=[['','',''],['','',''],['','','']] 
let turn = true 
let score=[0,0]

ttt.innerHTML=makeTableHTML(game)


