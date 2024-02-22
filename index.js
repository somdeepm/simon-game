var game_running=false;
var click_req=false;
var level=0;
var high_score=0;
var arr=[];
var ptr;
document.addEventListener("keydown",function(){
    if(game_running)return;
    game_running=true;
    arr=[];
    ptr=-1;
    setTimeout(newLevel,200);
})
function newLevel(){
    var el=Math.floor(Math.random()*4);
    if(el==0)arr.push("blue");
    else if(el==1)arr.push("green");
    else if(el==2)arr.push("red");
    else arr.push("yellow");
    ptr=0;
    let color=arr[arr.length-1];
    document.querySelector("#"+color).classList.add("pressed");
    var audio = new Audio(`./sounds/${color}.mp3`);;
    audio.play();
    setTimeout(function(){
        document.querySelector("h1").textContent=`Level ${++level}`;
        click_req=true;
    },100);
    setTimeout(function(){
        document.querySelector("#"+color).classList.remove("pressed");
    },100);
}
window.onclick = e => {
    var color=(e.target.getAttribute('id'));  
    if(color!=null){
        processColor(color);
    }
}
function processColor(color){
    document.querySelector("#"+color).classList.add("pressed");
    if(game_running==false||click_req==false||arr[ptr]!=color){
        gameOver();
        setTimeout(function(){
            document.querySelector("#"+color).classList.remove("pressed");
        },100); 
        return;
    }
    var audio = new Audio(`./sounds/${color}.mp3`);;
    audio.play();
    setTimeout(function(){
        document.querySelector("#"+color).classList.remove("pressed");
    },100); 
    ptr++;
    if(ptr==arr.length){
        click_req=false;
        high_score=Math.max(high_score,level);
        document.querySelector("h4").textContent="High Score: "+high_score;
        setTimeout(newLevel,1000)
    }
}
function gameOver(){
         level=0;
         click_req=false;       
         var audio = new Audio(`./sounds/wrong.mp3`);;
         audio.play();
         document.querySelector("h1").textContent="Game Over, Press Any Key to Restart";
         document.querySelector("body").classList.add("game-over");
         setTimeout(function(){
            document.querySelector("body").classList.remove("game-over");
        },100);
        game_running=false;
} 