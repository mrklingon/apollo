function showPane (x: number, y: number) {
    for (let ly = 0; ly <= 4; ly++) {
        for (let lx = 0; lx <= 4; lx++) {
            led.plotBrightness(lx, ly, getxy(lx + x, ly + y) * 25)
        }
    }
}
input.onButtonPressed(Button.A, function () {
    if (state == start) {
        sx += -1
        if (sx < 0) {
            sx = diam - 5
        }
        showPane(sx, sy)
    }
})
input.onButtonPressed(Button.B, function () {
    if (state == start) {
        sx += 1
        if (sx > diam - 5) {
            sx = 0
        }
        showPane(sx, sy)
    }
})
function setXY (x: number, y: number, val: number) {
    cosmos[y * diam + x] = val
}
function getxy (x: number, y: number) {
    return cosmos[y * diam + x]
}
function Genesis () {
    cosmos = []
    for (let index = 0; index < diam * diam; index++) {
        cosmos.push(0)
    }
    for (let index = 0; index < 180; index++) {
        setXY(randint(0, 29), randint(0, 29), randint(1, 9))
    }
    for (let index = 0; index <= 29; index++) {
        setXY(index, 29, 9)
    }
}
let cosmos: number[] = []
let sy = 0
let sx = 0
let state = 0
let start = 0
let diam = 0
diam = 30
start = 0
state = start
Genesis()
for (let index = 0; index <= 25; index++) {
    showPane(index, 25)
    basic.pause(100)
}
basic.pause(500)
showPane(0, 25)
sx = 0
sy = 25