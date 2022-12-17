const divs = document.querySelectorAll(".root");

divs.forEach((single) => {
  single.addEventListener("click", (e) => {
    handle(e);
  });
});

var selected;

function handle(e) {
  const div = e.target;
  const divlocation = document.getElementById("divlocation");
  divlocation.innerText = div.innerText;
  selected = div;
}

function adddiv() {
  const inp = document.getElementById("value").value;
  const divlocation = document.getElementById("divlocation");
  const box = selected.parentElement;
  const child = box.children[1];

  if (divlocation.innerText.length == 0) {
    alert("root not selected");
    return;
  }
  if (inp.length == 0) {
    alert("value not entered");
    return;
  }

  query = `
    <div class="box">
        <div class="root"> ${inp} </div>
        <div class="child"> 
        </div>
    </div>
  `;

  const box_div = document.createElement("div");
  const root_div = document.createElement("div");
  const child_div = document.createElement("div");

  box_div.className = "box";
  root_div.className = "root";
  child_div.className = "child";

  root_div.innerText = inp;
  box_div.appendChild(root_div);
  box_div.appendChild(child_div);

  root_div.addEventListener("click", (e) => handle(e));

  child.appendChild(box_div);

  document.getElementById('svg').innerHTML = "";
  join();
}




function order() {
  const divs1 = document.querySelectorAll(".root");
  const pre = document.getElementById("preorder");
  var vals = [];

  divs1.forEach((single) => {
    vals.push(single.innerText);
  });

  pre.innerText = vals;
}



function vals(element){
    var v1 = (element.offsetLeft + (element.offsetWidth)/2 );
    var v2 = ( element.offsetTop );
    return { v1 , v2 };
}



function draw(x1 , y1 , x2 , y2){
    const svg = document.getElementById('svg');
    var query = `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="black"/>`;
    svg.innerHTML += query;
}

function join(){
    const divs = document.querySelectorAll(".root");

    const parent = divs[0].parentElement;
    const r = parent.children[0];
    const left = parent.children[1].children[0];
    const right = parent.children[1].children[1];

    var y1 = r.offsetTop + r.offsetHeight;
    var x1 = r.offsetLeft + (r.offsetWidth)/2;

    var { v1:x2 , v2:y2 } = vals(left);
    draw(x1,y1,x2,y2)
    
    var { v1:x2 , v2:y2 } = vals(right);
    draw(x1,y1,x2,y2)

    console.log(x1,y1,x2,y2);

    divs.forEach( (single)=>{

        var bottom = single.offsetTop + (single.offsetHeight);
        var mid = single.offsetLeft + (single.offsetWidth/2);

        var box = single.parentElement.children;

        var child = box[1].children;

        var root = box[2];

        for (var i=0 ; i<child.length ; i++){
            var mid2 = child[i].offsetLeft + (child[i].offsetWidth)/2;
            var top = child[i].offsetTop;
            // if(vals != undefined){
            //     var top = vals.offsetTop;
            //     var mid2 = vals.offsetLeft + (vals.offsetWidth/2);
    
            //     
            // }
            draw(mid,bottom,mid2,top);
        };
    });
}

join();
