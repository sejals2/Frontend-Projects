const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


//lets create function to initialize the game
function init(){
   currentPlayer="X";
   gameGrid=["","","","","","","","",""];
   //UI pe empty kro logic
   boxes.forEach((box,index)=>{
     box.innerText="";
     boxes[index].style.pointerEvents="all";
     //initialize boxes with css properties
     box.classList=`box box${index+1}`;

   });
   newGameBtn.classList.remove("active");
   gameInfo.innerText=`Current Player - ${currentPlayer}`;
}
init();

//swap turn function
function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer="O";
    }
    else{
        currentPlayer="X";
    }
   //UI update
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}


//check game over function
function checkGameOver(){
   let answer="";
   winningPositions.forEach((position)=>{
    //all boxes should not be empty and should have same value
     if((gameGrid[position[0]]!=""||gameGrid[position[1]]!=""||gameGrid[position[2]]!="")
        &&(gameGrid[position[0]]===gameGrid[position[1]])&&(gameGrid[position[1]]===gameGrid[position[2]])){
          
            //check if winner is X
            if(gameGrid[position[0]]=='X')
                answer="X";
            else
            answer="O";
            
            //disable ponter events
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })
            //now we know X/O is winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

     }

   });
   
   //if we have winner
   if(answer!==""){
     gameInfo.innerText=`Winner Player -${answer}`;
     newGameBtn.classList.add("active");
     return;
   }

   //when there is tie
   let fillCount=0;
   gameGrid.forEach((box)=>{
    if(box!=="")
       fillCount++;
    
});

//board is filled ,game is tie
   if(fillCount===9){
    gameInfo.innerText="Game Tied!!"
    newGameBtn.classList.add("active");
   }

}

//handle click function
function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";
        //swap the turn
        swapTurn();
        //check if anyone wins
        checkGameOver();
    }
}


boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
});


newGameBtn.addEventListener("click",init);
