
var table='';
var row=15;
var col=50;
var startNode = '';
var endNode = '';
var listID=[];
var ClistID=[];
var graph=[];
var p=[];
var visitedgraph=[];
var g=[];
var z=0;
var algo='d';



for (var r=0;r < row;r++){
  table+='<tr>';
  for (var c=0;c<col;c++){
    var id=r+'-'+c;
    listID.push(extract(id));
    ClistID.push(extract(id));
    table+="<td id="+id+" class='unvisited'"+"onclick="+'getID(id)'+">"+'</td>';
  }
  table+='</tr>';
}

document.write("<table align='center'>"+table+"</table>");

function getID(id){
if (endNode==''){
  if (startNode==''){
    startNode = extract(id);
    document.getElementById("variable").innerHTML = '<center>Please set the End Node.</center>';
    debugger;
    graph.push([startNode,null,0]);
    if (z==0){
    for (var i = 0; i < listID.length; i++) {
      if (JSON.stringify(listID[i])!==JSON.stringify(startNode)){
        graph.push([listID[i],null,9999]);
      }
    }
  }else if (z==1) {
    for (var i = 0; i < ClistID.length; i++) {
      listID.push(ClistID[i]);
      if (JSON.stringify(listID[i])!==JSON.stringify(startNode)){
        graph.push([ClistID[i],null,9999]);
      }
    }
  }
    document.getElementById(id).className = "startNode";
  } else{
    document.getElementById(id).className = "endNode";
    document.getElementById("variable").innerHTML = '<center>Select Nodes to act as walls(or click START).</center>';
    endNode=extract(id);
    document.getElementById('btn').disabled = false;
  }
}else{
  debugger;
  if (document.getElementById(id).className=="unvisited"){
    document.getElementById(id).className = "wall";
    document.getElementById("variable").innerHTML = '<center>Click START to find PATH.</center>';
  }else if (document.getElementById(id).className == "wall") {
    document.getElementById(id).className = "unvisited";
  }else{
    alert('Wall cannot be formed');/*change to a visible value*/
  }
}
}

function execute(){
  if (algo=='a'){
    Astar(graph,startNode,endNode);
  }else{
    Dijkstra(graph,startNode,endNode);
  }
  debugger;
  p=graph[0];
  document.getElementById("variable").innerHTML = '<center>Path Found!</center>';
  while (JSON.stringify(p[1])!= JSON.stringify(startNode)){
    for (i=0;i<visitedgraph.length;i++){
      if (JSON.stringify(p[1])==JSON.stringify(visitedgraph[i][0])){
        p=visitedgraph[i];
        id=visitedgraph[i][0][0]+'-'+visitedgraph[i][0][1];
        document.getElementById(id).className='path';
        break;
      }
    }
  }
}

function slateClean(){
  debugger;
  z=1;
  startNode='';
  endNode='';
  listID=[];
  graph=[];
  visitedgraph=[];
  algo='d';
  document.getElementById("variable").innerHTML = '<center>Here we go again...</center>';
  for (i=0;i<ClistID.length;i++){
    document.getElementById(ClistID[i][0]+'-'+ClistID[i][1]).className='unvisited';
  }
}

function crtWall() {
  var i=0;
  slateClean();
  while (i<=200){
    debugger;
    r=Math.floor(Math.random() * 15);
    c=Math.floor(Math.random() * 50);
      if (r.length==1){
        r='0'+r;
      }
      if (c.lenght==1){
        c='0'+c;
      }
      id=r+'-'+c;
      document.getElementById(id).className='wall';
      i++;
    }
}
function drop() {
document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) {
if (!event.target.matches('.dropbtn')) {
  var dropdowns = document.getElementsByClassName("dropdown-content");
  var i;
  for (i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
    if (openDropdown.classList.contains('show')) {
      openDropdown.classList.remove('show');
    }
  }
}
}

function temp() {
algo='a';
document.getElementById("variable").innerHTML = '<center>You are using A Star Pathfinding Algorithm</center>';
}




function update(g){
  debugger;
  g.sort(function(a, b) {
  return a[2] - b[2];
});
}

function extract(node){
  node=node.split('-');
  return node.map(x => parseInt(x));
}
/*thee is some problem with my if statements*/


function Dijkstra(graph,startNode,endNode){
  debugger;
  update(graph);
  while (JSON.stringify(startNode)!=JSON.stringify(endNode) && JSON.stringify(graph[0][0])!=JSON.stringify(endNode)){
    c=graph[0][2]+1;
    var s=0;
    var l=0;
    var r=0;
    var u=0;
    var d=0;
    if (JSON.stringify(visitedgraph)!=JSON.stringify([])) {
      for (i=0;i<visitedgraph.length;i++){
        if (JSON.stringify(visitedgraph[i][0])==JSON.stringify([graph[0][0][0]+1,graph[0][0][1]]) && d ==0) {
          s++;
          d=1;
        }else if (JSON.stringify(visitedgraph[i][0])==JSON.stringify([graph[0][0][0]-1,graph[0][0][1]]) && u==0) {
          s++;
          u=1;
        }else if (JSON.stringify(visitedgraph[i][0])==JSON.stringify([graph[0][0][0],graph[0][0][1]+1]) && r==0) {
          s++;
          r=1;
        }else if (JSON.stringify(visitedgraph[i][0])==JSON.stringify([graph[0][0][0],graph[0][0][1]-1]) && l==0) {
          s++;
          l=1;
        }
      }
    }


    for (j=0;j<listID.length;j++){
      if (JSON.stringify([graph[0][0][0]+1,graph[0][0][1]]) === JSON.stringify(listID[j])){
        for (i=0;i<graph.length;i++){
          if (JSON.stringify(graph[i][0])==JSON.stringify(listID[j])){
            s++;
            if (graph[i][2]>c && document.getElementById(listID[j][0]+'-'+listID[j][1]).className!='wall'){
            graph[i][1]=graph[0][0];
            graph[i][2]=c;
            id=(graph[0][0][0]+1)+'-'+(graph[0][0][1]);
            if (document.getElementById(id).className!='endNode'){
            document.getElementById(id).className='pointer';
          }
            break;
          }
          }
        }
      }else if (JSON.stringify([graph[0][0][0]-1,graph[0][0][1]]) ===JSON.stringify(listID[j])){
        for (i=0;i<graph.length;i++){
          if (JSON.stringify(graph[i][0])==JSON.stringify(listID[j])){
            s++;
            if (graph[i][2]>c && document.getElementById(listID[j][0]+'-'+listID[j][1]).className!='wall'){
            graph[i][1]=graph[0][0];
            graph[i][2]=c;
            id=(graph[0][0][0]-1)+'-'+(graph[0][0][1]);
            if (document.getElementById(id).className!='endNode'){
            document.getElementById(id).className='pointer';
          }
            break;
          }
          }
        }
      }else if (JSON.stringify([graph[0][0][0],graph[0][0][1]+1]) === JSON.stringify(listID[j])){
        for (i=0;i<graph.length;i++){
          if (JSON.stringify(graph[i][0])==JSON.stringify(listID[j])){
            s++;
            if (graph[i][2]>c && document.getElementById(listID[j][0]+'-'+listID[j][1]).className!='wall'){
            graph[i][1]=graph[0][0];
            graph[i][2]=c;
            id=(graph[0][0][0])+'-'+(graph[0][0][1]+1);
            if (document.getElementById(id).className!='endNode'){
            document.getElementById(id).className='pointer';
          }
            break;
          }
          }
        }
      }else if (JSON.stringify([graph[0][0][0],graph[0][0][1]-1]) ===JSON.stringify(listID[j])){
        for (i=0;i<graph.length;i++){
          if (JSON.stringify(graph[i][0])==JSON.stringify(listID[j])){
            s++;
            if (graph[i][2]>c && document.getElementById(listID[j][0]+'-'+listID[j][1]).className!='wall'){
            graph[i][1]=graph[0][0];
            graph[i][2]=c;
            id=(graph[0][0][0])+'-'+(graph[0][0][1]-1);
            if (document.getElementById(id).className!='endNode'){
            document.getElementById(id).className='pointer';
          }
            break;
          }
          }
        }
      }
      if (s==4){/* if edge nodes*/
        visitedgraph.push(graph[0]);
        id=graph[0][0][0]+'-'+graph[0][0][1];
        if (document.getElementById(id).className!='startNode'){
        document.getElementById(id).className='visited';
      }
        for (i=0;i<listID.length;i++){
          if (JSON.stringify(graph[0][0])==JSON.stringify(listID[i])){
            listID.splice(i,1);
            break;
          }
        }
        graph.shift();
        break; /*to decrease comparisons*/
      }else if (s==2 && (JSON.stringify(graph[0][0])==JSON.stringify([0,0]) || JSON.stringify(graph[0][0])==JSON.stringify([0,col-1]) || JSON.stringify(graph[0][0])==JSON.stringify([row-1,0]) ||
       JSON.stringify(graph[0][0])==JSON.stringify([row-1,col-1]))) {
        visitedgraph.push(graph[0]);
        id=graph[0][0][0]+'-'+graph[0][0][1];
        if (document.getElementById(id).className!='startNode'){
        document.getElementById(id).className='visited';
      }
        for (i=0;i<listID.length;i++){
          if (JSON.stringify(graph[0][0])==JSON.stringify(listID[i])){
            listID.splice(i,1);
            break;
          }
        }
        graph.shift();
        break; /*to decrease comparisons*/
      } else if (s==3 && (graph[0][0][0]==0 || graph[0][0][0]==(row-1) || graph[0][0][1]==0 || graph[0][0][1]==(col-1))) {
        visitedgraph.push(graph[0]);
        id=graph[0][0][0]+'-'+graph[0][0][1];
        if (document.getElementById(id).className!='startNode'){
        document.getElementById(id).className='visited';
      }
        for (i=0;i<listID.length;i++){
          if (JSON.stringify(graph[0][0])==JSON.stringify(listID[i])){
            listID.splice(i,1);
            break;
          }
        }
        graph.shift();
        break;
      }
    }
    update(graph);/*can push it up*/
  }
}
function Astar(graph,startNode,endNode){
  debugger;
  update(graph);
  while (JSON.stringify(startNode)!=JSON.stringify(endNode) && JSON.stringify(graph[0][0])!=JSON.stringify(endNode)){
    var d=(graph[0][0][0]-endNode[0])+(graph[0][0][1]-endNode[1]);
    d=Math.abs(d)
    c=graph[0][2]+d+1;
    var s=0;
    var l=0;
    var r=0;
    var u=0;
    var d=0;
    if (JSON.stringify(visitedgraph)!=JSON.stringify([])) {
      for (i=0;i<visitedgraph.length;i++){
        if (JSON.stringify(visitedgraph[i][0])==JSON.stringify([graph[0][0][0]+1,graph[0][0][1]]) && d ==0) {
          s++;
          d=1;
        }else if (JSON.stringify(visitedgraph[i][0])==JSON.stringify([graph[0][0][0]-1,graph[0][0][1]]) && u==0) {
          s++;
          u=1;
        }else if (JSON.stringify(visitedgraph[i][0])==JSON.stringify([graph[0][0][0],graph[0][0][1]+1]) && r==0) {
          s++;
          r=1;
        }else if (JSON.stringify(visitedgraph[i][0])==JSON.stringify([graph[0][0][0],graph[0][0][1]-1]) && l==0) {
          s++;
          l=1;
        }
      }
    }


    for (j=0;j<listID.length;j++){
      if (JSON.stringify([graph[0][0][0]+1,graph[0][0][1]]) === JSON.stringify(listID[j])){
        for (i=0;i<graph.length;i++){
          if (JSON.stringify(graph[i][0])==JSON.stringify(listID[j])){
            s++;
            if (graph[i][2]>c && document.getElementById(listID[j][0]+'-'+listID[j][1]).className!='wall'){
            graph[i][1]=graph[0][0];
            graph[i][2]=c;
            id=(graph[0][0][0]+1)+'-'+(graph[0][0][1]);
            if (document.getElementById(id).className!='endNode'){
            document.getElementById(id).className='pointer';
          }
            break;
          }
          }
        }
      }else if (JSON.stringify([graph[0][0][0]-1,graph[0][0][1]]) ===JSON.stringify(listID[j])){
        for (i=0;i<graph.length;i++){
          if (JSON.stringify(graph[i][0])==JSON.stringify(listID[j])){
            s++;
            if (graph[i][2]>c && document.getElementById(listID[j][0]+'-'+listID[j][1]).className!='wall'){
            graph[i][1]=graph[0][0];
            graph[i][2]=c;
            id=(graph[0][0][0]-1)+'-'+(graph[0][0][1]);
            if (document.getElementById(id).className!='endNode'){
            document.getElementById(id).className='pointer';
          }
            break;
          }
          }
        }
      }else if (JSON.stringify([graph[0][0][0],graph[0][0][1]+1]) === JSON.stringify(listID[j])){
        for (i=0;i<graph.length;i++){
          if (JSON.stringify(graph[i][0])==JSON.stringify(listID[j])){
            s++;
            if (graph[i][2]>c && document.getElementById(listID[j][0]+'-'+listID[j][1]).className!='wall'){
            graph[i][1]=graph[0][0];
            graph[i][2]=c;
            id=(graph[0][0][0])+'-'+(graph[0][0][1]+1);
            if (document.getElementById(id).className!='endNode'){
            document.getElementById(id).className='pointer';
          }
            break;
          }
          }
        }
      }else if (JSON.stringify([graph[0][0][0],graph[0][0][1]-1]) ===JSON.stringify(listID[j])){
        for (i=0;i<graph.length;i++){
          if (JSON.stringify(graph[i][0])==JSON.stringify(listID[j])){
            s++;
            if (graph[i][2]>c && document.getElementById(listID[j][0]+'-'+listID[j][1]).className!='wall'){
            graph[i][1]=graph[0][0];
            graph[i][2]=c;
            id=(graph[0][0][0])+'-'+(graph[0][0][1]-1);
            if (document.getElementById(id).className!='endNode'){
            document.getElementById(id).className='pointer';
          }
            break;
          }
          }
        }
      }
      if (s==4){/* if edge nodes*/
        visitedgraph.push(graph[0]);
        id=graph[0][0][0]+'-'+graph[0][0][1];
        if (document.getElementById(id).className!='startNode'){
        document.getElementById(id).className='visited';
      }
        for (i=0;i<listID.length;i++){
          if (JSON.stringify(graph[0][0])==JSON.stringify(listID[i])){
            listID.splice(i,1);
            break;
          }
        }
        graph.shift();
        break; /*to decrease comparisons*/
      }else if (s==2 && (JSON.stringify(graph[0][0])==JSON.stringify([0,0]) || JSON.stringify(graph[0][0])==JSON.stringify([0,col-1]) || JSON.stringify(graph[0][0])==JSON.stringify([row-1,0]) ||
       JSON.stringify(graph[0][0])==JSON.stringify([row-1,col-1]))) {
        visitedgraph.push(graph[0]);
        id=graph[0][0][0]+'-'+graph[0][0][1];
        if (document.getElementById(id).className!='startNode'){
        document.getElementById(id).className='visited';
      }
        for (i=0;i<listID.length;i++){
          if (JSON.stringify(graph[0][0])==JSON.stringify(listID[i])){
            listID.splice(i,1);
            break;
          }
        }
        graph.shift();
        break; /*to decrease comparisons*/
      } else if (s==3 && (graph[0][0][0]==0 || graph[0][0][0]==(row-1) || graph[0][0][1]==0 || graph[0][0][1]==(col-1))) {
        visitedgraph.push(graph[0]);
        id=graph[0][0][0]+'-'+graph[0][0][1];
        if (document.getElementById(id).className!='startNode'){
        document.getElementById(id).className='visited';
      }
        for (i=0;i<listID.length;i++){
          if (JSON.stringify(graph[0][0])==JSON.stringify(listID[i])){
            listID.splice(i,1);
            break;
          }
        }
        graph.shift();
        break;
      }
    }
    update(graph);/*can push it up*/
  }
}
