const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let score = 0;
let scoreText = document.getElementById("scoreText")

let cw = 400;
let ch = 600;

canvas.width = cw;
canvas.height = ch;

let player = {
    x: cw / 2 - 75,
    y: ch - 100,
    w: 100,
    h: 100,
    speed: 100,
    color: "#000"
}

class anotherBlock {
    constructor(x, y, color) {
        this.x = x
            this.y = y
            this.w = 120
            this.h = 100
        this.speed = 3
        this.color = color
    }

    draw() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.w, this.h)
    }

    move() {
        this.y += this.speed / 2
    }
}

let blockArray = []

function spawner() {
    setInterval(function () {
        let randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        let randomX = Math.floor(Math.random() * (cw - 120))
        let randomY = -100
        let newBlock = new anotherBlock(randomX, randomY, randomColor)
        blockArray.push(newBlock)
    }, 3000)
}

function game() {
	ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, cw, ch);

    ctx.fillStyle = "#000";
    ctx.fillRect(player.x, player.y, player.w, player.h);

    blockArray.forEach((block) => { 
        block.draw()
        block.move()

        if (block.y > ch) {
            setTimeout(() => {
                blockArray.shift()
            })

            score += 1
        }

        if(block.y + block.h > player.y && block.y < player.y + player.h && block.x + block.w > player.x && block.x < player.x + player.w) {
            blockArray.shift()
            alert("YOU LOSE")
            location.reload()
            score = 0
        }
    })
    scoreText.innerText = score
}

addEventListener("keydown", (event) => {
    if (event.keyCode === 37 || event.keyCode == 65) {
        if (player.x > 0) {
            player.x -= player.speed / 2;
        }
    } else if (event.keyCode === 39 || event.keyCode == 68) {
        if (player.x < cw - player.w) {
            player.x += player.speed / 2;
        }
        }
})

spawner()
setInterval(() => {
	game();
}, 1000 / 60);