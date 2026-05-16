console.log("Portfolio Loaded");


/* Typing */

const typing=document.querySelector(".typing");

const words=[

"Cloud Engineer",
"AWS Enthusiast",
"Docker Developer",
"Linux Explorer"

];

let word=0;
let char=0;
let deleting=false;


function type(){


let current=words[word];

if(!deleting){

typing.innerHTML=
current.substring(
0,
char++
);

if(char>

current.length){

deleting=true;

setTimeout(type,1000);

return;

}

}

else{

typing.innerHTML=
current.substring(
0,
char--
);

if(char==0){

deleting=false;

word++;

if(word==words.length){

word=0;

}

}

}

setTimeout(

type,
deleting?50:100

);

}

type();



/* Scroll reveal */

const observer=
new IntersectionObserver(

entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add(
"show"
);

}

});

}

);


document
.querySelectorAll(".fade-section")
.forEach(section=>{

observer.observe(section);

});


/* Progress bar */

window.addEventListener(
"scroll",

()=>{

const winScroll=

document.documentElement.scrollTop;

const height=

document.documentElement.scrollHeight-

document.documentElement.clientHeight;


const scrolled=
(winScroll/height)*100;


document.getElementById(
"progress-bar"
).style.width=

scrolled+"%";

}

);


/* Cursor */

const cursor=
document.querySelector(".cursor");


document.addEventListener(

"mousemove",

e=>{

cursor.style.left=
e.clientX+"px";

cursor.style.top=
e.clientY+"px";


let particle=
document.createElement(
"div"
);

particle.style.position=
"fixed";

particle.style.left=
e.clientX+"px";

particle.style.top=
e.clientY+"px";

particle.style.width=
"6px";

particle.style.height=
"6px";

particle.style.borderRadius=
"50%";

particle.style.background=
"#67e8f9";

particle.style.pointerEvents=
"none";

particle.style.opacity=
"1";

document.body.appendChild(
particle
);


setTimeout(()=>{

particle.remove();

},500);

}

);