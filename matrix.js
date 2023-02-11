const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let cw = window.innerWidth;
let ch = window.innerHeight;


canvas.width = cw;
canvas.height = ch;


window.addEventListener('resize', function(event) {
    cw = window.innerWidth;
    ch = window.innerHeight;
    canvas.width = cw
    canvas.height = ch;
    maxColumns = cw / fontSize;    
}, true);

let charArr = [
  "a",  "b",  "c",  "d",  "e",  "f",  "g",  "h",
  "i",  "j",  "k",  "l",  "m",  "o",  "n",  "p",
  "q",  "r",  "s",  "t",  "u",  "v",  "w",  "x",
  "y",  "z",  
  "0", "1",  "2",  "3",  "4",
  "5",  "6",  "7",  "8", "9",
  
  "@", "#",  "-", "%", "*",  
  "$",  
  
  "Г", "Д",
  "Є", "Л",  
  "Ѯ", "Ѻ",  
  "П", "Ч",  

  "您", "区", "何", "体",  
  "ゴ", "シ", "ッ", "ク",
  "体", "评", "今", "天",
  "在", "亚", "年", "的",  
  "Ф", "热", "Ѱ", "Ѿ",
  "价", "ん", "に", "ち",
  "は", "Ц", "英", "会", 
  "如", "马", "上", "购", 
  "买", "书", "月",  
];

let maxCharCount = 300;
let fallingCharArr = [];
let fontSize = 14;
let maxColumns = cw / fontSize;


let frames = 0;

class FallingChar {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(ctx) {
    this.value =
      charArr[Math.floor(Math.random() * (charArr.length - 1))].toUpperCase();
    this.speed = (Math.random() * fontSize * 3) / 4 + (fontSize * 3) / 4;

    ctx.fillStyle = "rgba(0,255,0)";
    ctx.font = fontSize + "px bold";
    ctx.fillText(this.value, this.x, this.y);
    this.y += this.speed;

    if (this.y > ch) {
      this.y = (Math.random() * ch) / 2 - 50;
      this.x = Math.floor(Math.random() * maxColumns) * fontSize;
      this.speed = (-Math.random() * fontSize * 3) / 4 + (fontSize * 3) / 4;
    }
  }
}

let update = () => {
  if (fallingCharArr.length < maxCharCount) {
    let fallingChar = new FallingChar(
      Math.floor(Math.random() * maxColumns) * fontSize,
      (Math.random() * ch) / 2 - 50
    );
    fallingCharArr.push(fallingChar);
  }
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0, 0, cw, ch);
  for (let i = 0; i < fallingCharArr.length && frames % 2 == 0; i++) {
    fallingCharArr[i].draw(ctx);
  }

  requestAnimationFrame(update);
  frames++;
};

update();
