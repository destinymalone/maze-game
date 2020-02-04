const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const worldMap = [
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1],
    [1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0],
    [1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
]
const ending = worldMap[16][15]

const columns = 19
const size = parseInt(canvas.width / columns)

const world = []

worldMap.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
        world.push({
            type: column === 1 ? 'BLOCK' : 'FLOOR',
            x: columnIndex * size,
            y: rowIndex * size,
            width: size,
            height: size
        })
    })
});

const floors = world.filter(element => element.type === 'FLOOR');
const blocks = world.filter(element => element.type === 'BLOCK');

const player = {
    x: size,
    y: 0,
    width: size,
    height: size,
    fill: 'lightgoldenrodyellow',
    moveUp: function () {
        const self = this
        let hit = false

        blocks.forEach(element => {
            if (self.y - size === element.y && self.x === element.x) {
                hit = true
            }
        })

        if (!hit) this.y -= size
    },
    moveDown: function () {
        const self = this
        let hit = false

        blocks.forEach(element => {
            if (self.y + size === element.y && self.x === element.x) {
                hit = true
            }
        })

        if (!hit) this.y += size

        if (self.y >= columns * size) {
            alert('Nice victory!!!!')
        }
    },
    moveLeft: function () {
        const self = this
        let hit = false

        blocks.forEach(element => {
            if (self.x - size === element.x && self.y === element.y) {
                hit = true
            }
        })

        if (!hit) this.x -= size
    },
    moveRight: function () {
        const self = this
        let hit = false

        blocks.forEach(element => {
            if (self.x + size === element.x && self.y === element.y) {
                hit = true
            }
        })

        if (!hit) this.x += size
    }
}

const render = () => {
    context.clearRect(0, 0, canvas.width, canvas.height)

    blocks.forEach(element => {
        context.fillRect(element.x, element.y, element.width, element.height)
    })

    floors.forEach(element => {
        context.rect(element.x, element.y, element.width, element.height)
    });

    context.save()
    context.fillStyle = player.fill
    context.fillRect(player.x, player.y, player.width, player.height)
    context.restore()
}

render()

window.onkeydown = function (a) {
    const key = a.keyCode

    canvas.animate(
        { backgroundColor: ["rgb(252, 252, 141)", "black"] },
        { duration: 500, easing: 'ease-in-out' }
    )

    switch (key) {
        case 38: player.moveUp(); break
        case 40: player.moveDown(); break
        case 37: player.moveLeft(); break
        case 39: player.moveRight(); break
    }

    render()
}