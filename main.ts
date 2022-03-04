function setship (shp: any[]) {
    ax = shp[0]
    ay = shp[1]
    stgs = shp[2]
    for (let index = 0; index <= stgs - 1; index++) {
        setXY(ax, ay + index, 9)
    }
}
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
function clrship (shp: any[]) {
    ax = shp[0]
    ay = shp[1]
    stgs = shp[2]
    for (let index = 0; index <= stgs - 1; index++) {
        setXY(ax, ay + index, 0)
    }
}
input.onButtonPressed(Button.AB, function () {
    if (state == start) {
        state = launch
        ax = 12
        ay = 25
        showPane(ax, ay)
        for (let index = 0; index < 2; index++) {
            ship = mvShip(ship, 0, -1)
            basic.pause(500)
            ship[2] = ship[2] - 1
        }
        for (let index = 0; index < 6; index++) {
            ship = mvShip(ship, 0, -1)
            basic.pause(100)
        }
        state = launch
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
        setXY(randint(0, 29), randint(0, 26), randint(1, 9))
    }
    for (let index = 0; index <= 29; index++) {
        setXY(index, 29, 9)
    }
    ship = [15, 26, 3]
    setship(ship)
}
function mvShip (veh: any[], xd: number, yd: number) {
    clrship(veh)
    veh[0] = xd + veh[0]
    veh[1] = yd + veh[1]
    setship(veh)
    showPane(veh[0] - 3, veh[1] - 1)
    return veh
}
let cosmos: number[] = []
let ship: number[] = []
let stgs: any = null
let ay: any = null
let ax: any = null
let sy = 0
let sx = 0
let state = 0
let launch = 0
let start = 0
let diam = 0
diam = 30
start = 0
launch = 1
state = start
let nav = 2
Genesis()
for (let index = 0; index <= 25; index++) {
    showPane(index, 25)
    basic.pause(100)
}
basic.pause(500)
showPane(0, 25)
sx = 0
sy = 25
