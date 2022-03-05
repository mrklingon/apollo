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
    if (state == orbit) {
        speed = -1
        ship = mvShip(ship, 0, 1)
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
function guard (val: number) {
    if (val < 0) {
        val = diam - 1
    }
    if (val >= diam) {
        val = 0
    }
    return val
}
input.onButtonPressed(Button.AB, function () {
    if (state == orbit) {
        state = nav
        for (let index = 0; index < 4; index++) {
            basic.showIcon(IconNames.Chessboard)
            basic.pause(200)
            basic.showLeds(`
                # . . . #
                . . . . .
                . . # . .
                . . . . .
                # . . . #
                `)
            basic.pause(200)
        }
        mkStars()
        state = orbit
    }
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
        for (let index = 0; index <= 29; index++) {
            if (6 < randint(0, 10)) {
                setXY(index, 29, randint(0, 5))
            }
        }
        state = orbit
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
    if (state == orbit) {
        speed = 1
        ship = mvShip(ship, 0, -1)
    }
})
function mkStars () {
    for (let index = 0; index < 180; index++) {
        setXY(randint(0, diam - 1), randint(0, diam - 4), randint(1, 9))
    }
}
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
    mkStars()
    for (let index = 0; index <= 29; index++) {
        setXY(index, 29, 9)
    }
    ship = [15, 26, 3]
    setship(ship)
}
function mvShip (veh: any[], xd: number, yd: number) {
    clrship(veh)
    veh[0] = guard(xd + veh[0])
    veh[1] = guard(yd + veh[1])
    setship(veh)
    showPane(veh[0] - 3, veh[1] - 1)
    return veh
}
let cosmos: number[] = []
let val = 0
let ship: any[] = []
let stgs: any = null
let ay: any = null
let ax: any = null
let sy = 0
let sx = 0
let speed = 0
let orbit = 0
let nav = 0
let state = 0
let launch = 0
let start = 0
let diam = 0
for (let index = 0; index < 4; index++) {
    basic.showLeds(`
        # . # . #
        . . # . .
        # # # # #
        . . # . .
        # . # . #
        `)
    basic.showLeds(`
        # . . . #
        . # . # .
        . . # . .
        . # . # .
        # . . . #
        `)
}
diam = 30
start = 0
launch = 1
state = start
nav = 2
orbit = 3
speed = 1
Genesis()
for (let index = 0; index <= 25; index++) {
    showPane(index, 25)
    basic.pause(100)
}
basic.pause(500)
showPane(0, 25)
sx = 0
sy = 25
basic.forever(function () {
    if (orbit == state) {
        ship = mvShip(ship, speed, 0)
        basic.pause(100)
    }
})
