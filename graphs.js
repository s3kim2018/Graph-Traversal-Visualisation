var main = function() {
    heading.style.marginTop = "70px";
    small.style.marginTop = "60px";
    medium.style.marginTop = "60px";
    large.style.marginTop = "60px";
    board.style.background = 'url("img/background.gif")';
    small.addEventListener("click", generatesmall);
    medium.addEventListener("click", generatemedium);
    large.addEventListener("click", generatelarge);
}

var generatemedium = function() {
    clear();
    board.style.display = "flex"; 
    board.style.flexWrap = "wrap";
    board.style.alignContent = "flex-start";
    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 60; j++) {
            var sq = document.createElement("square");   // Create a <button> element
            sq.id = i.toString() + j.toString(); 
            sq.style.width = "9px";
            sq.style.height = "9px";
            sq.style.backgroundColor = "#F5F5F5";
            sq.style.border = "solid black 0.5px";
            board.appendChild(sq);

        }
    }
}

var generatesmall = function() {
    clear(); 
    board.style.display = "flex"; 
    board.style.flexWrap = "wrap";
    board.style.justifyContent = "flex-end";
    for (let i = 0; i < 50; i++) {
        for (let j = 0; j < 30; j++) {
            var sq = document.createElement("square");   // Create a <button> element
            sq.id = i.toString() + j.toString(); 
            sq.classList.add("sq");
            sq.style.width = "19px";
            sq.style.height = "19px";
            sq.style.backgroundColor = "#F5F5F5";
            sq.style.border = "solid black 0.5px";
            board.appendChild(sq);
            let node = null;
            let up = j - 1; 
            let right = i + 1; 
            let left = i - 1; 
            let down = j + 1; 
            if (i == 0 && j == 0) {
                node = new Graph(i.toString() + j.toString(), [right.toString() + j.toString(), i.toString() + down.toString(), right.toString() + down.toString()]);
            } else if (i == 0 && j == 29) {
                node = new Graph(i.toString() + j.toString(), [i.toString() + up.toString(), right.toString() + j.toString(), right.toString() + up.toString()]);
            } else if (i == 49 && j == 0) {
                node = new Graph(i.toString() + j.toString(), [left.toString() + j.toString(), i.toString() + down.toString(), left.toString() + down.toString()]);
            } else if (i == 49 && j == 29) {
                node = new Graph(i.toString() + j.toString(), [left.toString() + j.toString(), i.toString() + up.toString(), left.toString() + up.toString()]);
            } else if (i == 0) {
                node = new Graph(i.toString() + j.toString(), [i.toString() + up.toString(), right.toString() + up.toString(), right.toString() + j.toString(), right.toString() + down.toString(), i.toString() + down.toString()]);
            } else if (i == 49) {
                node = new Graph(i.toString() + j.toString(), [i.toString() + up.toString(), left.toString() + up.toString(), left.toString() + j.toString(), left.toString() + down.toString(), i.toString() + down.toString()]);
            } else if (j == 0) {
                node = new Graph(i.toString() + j.toString(), [right.toString() + j.toString(), right.toString() + down.toString(), i.toString() + down.toString(), left.toString() + down.toString(), left.toString() + j.toString()]);
            } else if (j == 29) {
                node = new Graph(i.toString() + j.toString(), [right.toString() + j.toString(), right.toString() + up.toString(), i.toString() + up.toString(), left.toString() + up.toString(), left.toString() + j.toString()]);
            } else {
                node = new Graph(i.toString() + j.toString(), [i.toString() + up.toString(), right.toString() + up.toString(), right.toString() + j.toString(), right.toString() + down.toString(), i.toString() + down.toString(), left.toString() + down.toString(), left.toString() + j.toString(), left.toString() + up.toString()]);
            }
            nodes.set(i.toString() + j.toString(), node);
            let element = document.getElementById(i.toString() + j.toString());
            console.log(i.toString() + j.toString());
            element.addEventListener("click", clickevent.bind(i.toString() + j.toString()));

  
        }
    }
}

var generatelarge = function() {
    clear();
    board.style.display = "flex"; 
    board.style.flexWrap = "wrap";
    board.style.alignContent = "flex-start";
    for (let i = 0; i < 125; i++) {
        for (let j = 0; j < 75; j++) {
            var sq = document.createElement("square");   // Create a <button> element
            sq.id = i.toString() + j.toString(); 
            sq.style.width = "7px";
            sq.style.height = "7px";
            sq.style.backgroundColor = "#F5F5F5";
            sq.style.border = "solid black 0.5px";
            board.appendChild(sq);

        }
    }
    clear(); 
}

var mark; 
var clickevent = function(id) {
    var elem = document.getElementById(id);
    elem.style.backgroundColor = "lightgreen";



}

var clear = function() {
    heading.style.margin = "0";
    small.style.margin = "0";
    medium.style.margin = "0";
    large.style.margin = "0";

    small.removeEventListener("click", generatesmall);
    medium.removeEventListener("click", generatemedium);
    large.removeEventListener("click", generatelarge); 

    board.style.removeProperty("background");
    board.style.backgroundColor = "white"; 
    heading.innerHTML = "";
    small.innerHTML = "";
    medium.innerHTML = "";
    large.innerHTML = "";
    small.classList.remove("button");
    medium.classList.remove("button");
    large.classList.remove("button");
}

var heading = document.querySelector(".board h2");
var small = document.querySelector(".board #small");
var medium = document.querySelector(".board #med");
var large = document.querySelector(".board #large");
var board = document.querySelector(".board");
var nodes = new Map([]);
main(); 

/* @arthor: Brian Kim
A class representing the graphs data structure **/
class Graph {
    constructor(val, edges) {
        this.val = val; 
        this.edges = edges; 
        this.visited = false; 
    }

}