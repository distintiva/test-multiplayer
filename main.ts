multiplayer.onMasterLoop(2000, function () {
    mySprite = sprites.create(img`
        2 3 5 4 6 9 a b e f 1 . . . . .
        2 3 5 4 6 9 a b e f 1 . . . . .
        2 3 5 4 6 9 a b e f 1 . . . . .
        2 3 5 4 6 9 a b e f 1 . . . . .
        2 3 5 4 6 9 a b e f 1 . . . . .
        2 3 5 4 6 9 a b e f 1 . . . . .
        2 3 5 4 6 9 a b e f 1 . . . . .
        2 3 5 4 6 9 a b e f 1 c . . . .
        2 3 5 4 6 9 a b e f 1 c c . . .
        2 3 5 4 6 9 a b e f 1 a c . . .
        2 3 5 4 6 9 a b e f 1 c a . . .
        2 3 5 4 6 9 a b e f 1 a . . . .
        2 3 5 4 6 9 a b e f 1 . . . . .
        2 3 5 4 6 9 a b e f 1 . . . . .
        2 3 5 4 6 9 a b e f 1 . . . . .
        2 3 5 4 6 9 a b e f 1 . . . . .
    `, SpriteKind.Enemy)
    mySprite.setPosition(Math.randomRange(20, 100), 0)
    mySprite.setVelocity(0, 50)
    mySprite.setFlag(SpriteFlag.AutoDestroy, true)
})
sprites.onCreated(SpriteKind.Player, function (sprite) {
	
})
multiplayer.onConnected(function () {
    scene.setBackgroundColor(4)
    player1 = sprites.create(img`
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f 1 f f f f f f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
    `, SpriteKind.Player)
    player1.setPosition(27, 21)
    player2 = sprites.create(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . 2 2 2 2 2 2 2 . . . . . .
        . . . 2 . . . . . 2 . . . . . .
        . . . 2 . . . . . 2 . . . . . .
        . . . 2 . . . . . 2 . . . . . .
        . . . 2 2 2 2 2 2 2 . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `, SpriteKind.Player)
    multiplayer.movePlayers(player1, player2, 100, 100)
})
let player2: Sprite = null
let player1: Sprite = null
let mySprite: Sprite = null
multiplayer.drawTitle("SPACE", "INVADERS", 1)
multiplayer.waitMessage("Esperando conexión", 1, 9)
let mySprite2 = sprites.create(img`
    . . . . . . . c d . . . . . . .
    . . . . . . . c d . . . . . . .
    . . . . . . . c d . . . . . . .
    . . . . . . . c b . . . . . . .
    . . . . . . . f f . . . . . . .
    . . . . . . . c 7 . . . . . . .
    . . . . . . . f f . . . . . . .
    . . . . . . . 8 7 . . . . . . .
    . . . . . . 8 8 5 6 . . . . . .
    . . . . . . 8 7 5 6 . . . . . .
    . . . . . c c c 6 6 6 . . . . .
    . . . . 8 8 7 7 7 5 6 6 . . . .
    . . 8 f f f c c 6 6 f f 6 6 . .
    . 8 8 8 8 6 6 7 7 7 7 5 7 6 6 .
    8 8 8 8 8 8 6 6 7 7 7 5 7 7 6 6
    8 8 8 8 8 8 6 6 7 7 7 7 5 7 6 6
`, SpriteKind.Player)
effects.starField.startScreenEffect()
multiplayer.myFunction(img`
    5 5 5 4 4 4 4 5 5 5 5 5 5 5 5 5
    5 4 2 2 4 . 4 5 5 4 4 5 5 5 5 5
    4 4 4 2 4 4 4 4 2 2 2 2 2 2 5 5
    5 4 4 2 . 4 4 2 4 4 4 4 . . 2 2
    5 5 4 . 2 4 2 4 . 4 . 4 4 4 2 5
    5 5 4 . 2 2 . 4 . 4 2 2 2 2 2 5
    5 2 2 2 7 2 2 2 2 2 4 4 7 5 5 5
    7 . . . 7 . . . . 7 . 7 7 5 5 5
    7 . f 7 7 . . . . 7 7 5 7 7 5 5
    5 f 7 . f f 7 7 7 . 7 5 5 5 5 5
    f f . . f 7 f . . . . f f f f 5
    f . . f 5 f f f f f f f f f f f
    f . f 5 5 5 5 5 5 5 f f f 5 5 5
    f f 5 5 5 5 5 5 5 5 5 5 5 5 5 5
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
`)
multiplayer.myFunction(img`
    2 3 5 4 6 9 a b e f 1 . . . . .
    2 3 5 4 6 9 a b e f 1 . . . . .
    2 3 5 4 6 9 a b e f 1 . . . . .
    2 3 5 4 6 9 a b e f 1 . . . . .
    2 3 5 4 6 9 a b e f 1 . . . . .
    2 3 5 4 6 9 a b e f 1 . . . . .
    2 3 5 4 6 9 a b e f 1 . . . . .
    2 3 5 4 6 9 a b e f 1 c . . . .
    2 3 5 4 6 9 a b e f 1 c c . . .
    2 3 5 4 6 9 a b e f 1 a c . . .
    2 3 5 4 6 9 a b e f 1 c a . . .
    2 3 5 4 6 9 a b e f 1 a . . . .
    2 3 5 4 6 9 a b e f 1 . . . . .
    2 3 5 4 6 9 a b e f 1 . . . . .
    2 3 5 4 6 9 a b e f 1 . . . . .
    2 3 5 4 6 9 a b e f 1 . . . . .
`)
multiplayer.multiPlayerStart()
game.onUpdateInterval(500, function () {
	
})
