var heading = document.querySelector(".board h2");
var small = document.querySelector(".board #small");
var medium = document.querySelector(".board #med");
var large = document.querySelector(".board #large");
var board = document.querySelector(".board");
var nodes = new Map();
var idmap = new Map();
var startingnode;
var endingnode;

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
    for (let j = 0; j < 30; j++) {
        for (let i = 0; i < 50; i++) {
            var sq = document.createElement("sq");   // Create a <button> element
            sq.id = i.toString() + "-" + j.toString(); 
            sq.classList.add("square");
            sq.style.width = "19.6px";
            sq.style.height = "19.6px";
            sq.style.backgroundColor = "white";
            sq.style.border = "solid #87CEFA 0.2px";
            board.appendChild(sq);
            let node = null;
            let up = j - 1; 
            let right = i + 1; 
            let left = i - 1; 
            let down = j + 1; 
            if (i == 0 && j == 0) {
                node = new Graph(i.toString() + "-" + j.toString(), [right.toString() + "-" + j.toString(), i.toString() + "-" + down.toString(), right.toString() + "-" + down.toString()]);
            } else if (i == 0 && j == 29) {
                node = new Graph(i.toString() + "-" + j.toString(), [i.toString() + "-" + up.toString(), right.toString() + "-" + j.toString(), right.toString() + "-" + up.toString()]);
            } else if (i == 49 && j == 0) {
                node = new Graph(i.toString() + "-" + j.toString(), [i.toString() + "-" + down.toString(), left.toString() + "-" + j.toString(), left.toString() + "-" + down.toString()]);
            } else if (i == 49 && j == 29) {
                node = new Graph(i.toString() + "-" + j.toString(), [i.toString() + "-" + up.toString(), left.toString() + "-" + j.toString(), left.toString() + "-" + up.toString()]);
            } else if (i == 0) {
                node = new Graph(i.toString() + "-" + j.toString(), [i.toString() + "-" + up.toString(), right.toString() + "-" + j.toString(), i.toString() + "-" + down.toString(), right.toString() + "-" + up.toString(), right.toString() + "-" + down.toString()]);
            } else if (i == 49) {
                node = new Graph(i.toString() + "-" + j.toString(), [i.toString() + "-" + up.toString(), i.toString() + "-" + down.toString(), left.toString() + "-" + j.toString(), left.toString() + "-" + up.toString(), left.toString() + "-" + down.toString()]);
            } else if (j == 0) {
                node = new Graph(i.toString() + "-" + j.toString(), [right.toString() + "-" + j.toString(), i.toString() + "-" + down.toString(), left.toString() + "-" + j.toString(), left.toString() + "-" + down.toString(), right.toString() + "-" + down.toString()]);
            } else if (j == 29) {
                node = new Graph(i.toString() + "-" + j.toString(), [i.toString() + "-" + up.toString(), right.toString() + "-" + j.toString(), left.toString() + "-" + j.toString(),  right.toString() + "-" + up.toString(), left.toString() + "-" + up.toString()]);
            } else {
                node = new Graph(i.toString() + "-" + j.toString(), [i.toString() + "-" + up.toString(), right.toString() + "-" + j.toString(), i.toString() + "-" + down.toString(), left.toString() + "-" + j.toString(), right.toString() + "-" + up.toString(), right.toString() + "-" + down.toString(), left.toString() + "-" + up.toString(), left.toString() + "-" + down.toString()]);
            }
            nodes.set(i.toString() + "-" + j.toString(), node);
            let element = document.getElementById(i.toString() + "-" + j.toString());
            idmap.set(element, node);
            mark = 1; 
            document.querySelector("h3").innerHTML = "Select Starting Node";
            element.addEventListener("click", function() {clickevent(i.toString() + "-" + j.toString()) });
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
    console.log(id);
    var elem = document.getElementById(id);
    if (mark == 1) {
        elem.style.backgroundColor = "lightgreen";
        startingnode = nodes.get(id);
        document.querySelector("h3").innerHTML = "Select Ending Node";
        mark++; 
    } else if (mark == 2) {
        if (startingnode == nodes.get(id)) {
            return;
        } else {
            elem.style.backgroundColor = "brown";
            endingnode = nodes.get(id);
            document.querySelector("h3").innerHTML = "Draw Walls and Choose an algorithm";
            removelisteners(); 
            addwalllisteners();
            var style1 = document.createElement("style");
            var style2 = document.createElement("style");

            style1.appendChild(
                document.createTextNode(".dropdown:hover .dropdown-content { display: block; }")
            );
            style2.appendChild(
                document.createTextNode(".dropdown:hover .dropbtn { cursor: pointer; color: #303030; }")
            );
            document.querySelector("head").appendChild(style1);
            document.querySelector("head").appendChild(style2);

            document.querySelector(".dropbtn").innerHTML = "Algorithms ▽"
                
            document.querySelector(".menucontainer .dropdown .dropdown-content #dfs").addEventListener("click", function() {
                document.querySelector(".dropbtn").innerHTML = "Depth First Search ▽";
                document.querySelector(".runbutton").innerHTML = "Run Algorithm!";
                document.querySelector(".runbutton").addEventListener("click", function() {
                    run("dfs");
                });
            });
            document.querySelector(".menucontainer .dropdown .dropdown-content #bfs").addEventListener("click", function() {
                document.querySelector(".dropbtn").innerHTML = "Breadth First Search ▽";
                document.querySelector(".runbutton").innerHTML = "Run Algorithm!";
                document.querySelector(".runbutton").addEventListener("click", function() {
                    run("bfs");
                });
            });
            document.querySelector(".menucontainer .dropdown .dropdown-content #dijkstra").addEventListener("click", function() {
                document.querySelector(".dropbtn").innerHTML = "Dijkstras ▽";
                document.querySelector(".runbutton").innerHTML = "Run Algorithm!";
                document.querySelector(".runbutton").addEventListener("click", function() {
                    run("dijkstras");
                });
            });
            document.querySelector(".menucontainer .dropdown .dropdown-content #astar").addEventListener("click", function() {
                document.querySelector(".dropbtn").innerHTML = "A-Star ▽";
                document.querySelector(".runbutton").innerHTML = "Run Algorithm!";
                document.querySelector(".runbutton").addEventListener("click", function() {
                    run("astar");
                });
            });
            mark = 0;
        }
    }
}

var removelisteners = function() {
    var squares = document.getElementsByClassName("square");
    for (let i = 0; i < squares.length; i++) {
        var old_element = squares[i];
        var new_element = old_element.cloneNode(true);
        var pastnode = idmap.get(old_element);
        idmap.delete(old_element);
        idmap.set(new_element, pastnode);
        old_element.parentNode.replaceChild(new_element, old_element);
    }
}

var addwalllisteners = function() { 
    var squares = document.getElementsByClassName("square");
    for (let i = 0; i < squares.length; i++) {
        let elem = squares[i];
        elem.addEventListener("mousedown", function() {
            drawwalls(elem, 1);
        });
        elem.addEventListener("mousemove", function() {
            drawwalls(elem, 2);
        });
        elem.addEventListener("mouseup", function() {
            drawwalls(elem, 3);
        });
    }
}

var dragging = false; 
var drawwalls = function(elem, state) {
    var node = idmap.get(elem);
    if (state == 1) {
        if (node != startingnode && node != endingnode) {
            dragging = true; 
            nodes.visited = true; 
            nodes.delete(elem.id);
            idmap.delete(elem);
            nodes.set(elem.id, node)
            idmap.set(elem, node);
            elem.style.backgroundColor = "grey";
        }
    } else if (state == 2) {
        if (dragging == false) {
            return;
        } else {
            if (node != startingnode && node != endingnode) {
                node.visited = true; 
                elem.style.backgroundColor = "grey";
                nodes.delete(elem.id);
                idmap.delete(elem);
                nodes.set(elem.id, node)
                idmap.set(elem, node);
            }
        }
    } else if (state == 3) {
        if (dragging == false) {
            return;
        } else {
            dragging = false;
            if (node != startingnode && node != endingnode) {
                node.visited = true; 
                elem.style.backgroundColor = "grey";
                nodes.delete(elem.id);
                idmap.delete(elem);
                nodes.set(elem.id, node)
                idmap.set(elem, node);
            }
        }
    }
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

function run(type) {
    if (type == "dfs") {
        endingnode.visited = false; 
        removelisteners();
        var button = document.querySelector(".menucontainer .runbutton");
        var old_element = button
        var new_element = old_element.cloneNode(true);
        old_element.parentNode.replaceChild(new_element, old_element);
        dfs(startingnode);
        animbfs(); 
    }
}

function resetbutton() {
    var button = document.querySelector(".menucontainer .runbutton");
    var old_element = button
    var new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
    button = document.querySelector(".menucontainer .runbutton");
    document.querySelector(".menucontainer .runbutton").innerHTML = "Reset Board";
    button.addEventListener("click", resetboardsmall);
}

function resetboardsmall() {
    for (let j = 0; j < 30; j++) {
        for (let i = 0; i < 50; i++) {
            let id = i.toString() + "-" + j.toString();
            nodes.get(id).visited = false; 
            var node = document.getElementById(id);
            if (node.style.boxShadow == "orange 0px 0px 5px 3px inset") {
                node.style.boxShadow = "none";
            } 
            if (node.style.backgroundColor == "yellow") {
                node.style.backgroundColor = "white";
            }
            if (node.style.backgroundColor == "grey") {
                node.style.backgroundColor = "white";
            }
        }
    }
    animate = [];  
    var button = document.querySelector(".menucontainer .runbutton");
    var old_element = button
    var new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
    document.querySelector(".menucontainer .runbutton").innerHTML = "";
    addwalllisteners(); 
    record = true;
    coloryellow = false;  
}


var animate = [];
var coloryellow = false; 
var record = true;
async function dfs(node) {
    if (node === endingnode) {
        coloryellow = true; 
        record = false; 
        return;
    }
    node.visited = true; 
    if (node != startingnode && record == true) {
        animate.push(node);
    }
    for (let i = 0; i < node.edges.length; i++) {
        let id = node.edges[i];
        var nextnode = nodes.get(id);
        if (nextnode.visited == false) {
            dfs(nextnode);
        }
    }
}

shortestpath = [];
function bfs(node, steps) {
    if (node === endingnode) {

    }
    node.visited = true;
    for (let i = 0; i < node.edges.length; i++) {
        let id = node.edges[i];
        var nextnode = nodes.get(id);
        if (nextnode.visited == false) {
            bfs(nextnode, steps + 1);
        }

    }


}

async function animbfs() {
    for (let i = 0; i < animate.length; i++) {
        var node = animate[i];
        document.getElementById(node.val).style.boxShadow = "0px 0px 5px 3px orange inset";
        await delay(20);
    }
    if (coloryellow == true) {
        for (let i = 0; i < animate.length; i++) {
            var node = animate[i];
            document.getElementById(node.val).style.backgroundColor = "yellow";
            await delay(5);
        }
    }
    resetbutton();
}



async function delay(delayInms) {
    return new Promise(resolve  => {
      setTimeout(() => {
        resolve(2);
      }, delayInms);
    });
}


/* @arthor: Brian Kim
A class representing the graphs data structure **/
class Graph {
    constructor(val, edges) {
        this.val = val; 
        this.edges = edges; 
        this.visited = false; 
    }

}

main(); 
