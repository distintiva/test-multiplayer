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
    mySprite.setVelocity(0, 50)
    mySprite.setPosition(Math.randomRange(20, 100), 0)
    mySprite.setFlag(SpriteFlag.AutoDestroy, true)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile2 = sprites.createProjectileFromSprite(img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . 5 5 . . . . . . . 
. . . . . . . 5 5 . . . . . . . 
. . . . . . . 5 5 . . . . . . . 
. . . . . . . 5 5 . . . . . . . 
. . . . . . . 5 5 . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, multiplayer.CurrentPlayer(), 0, -100)
})
multiplayer.onConnected(function () {
    effects.starField.startScreenEffect()
    player1.setPosition(40, 100)
    player2.setPosition(120, 100)
    multiplayer.movePlayers(player1, player2, 100, 100)
})
let projectile2: Sprite = null
let mySprite: Sprite = null
let player2: Sprite = null
let player1: Sprite = null
multiplayer.drawTitle("SPACE", "INVADERS", 1)
multiplayer.waitMessage("Waiting for connection", 1, 9)
player1 = sprites.create(img`
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
player1.setPosition(40, 60)
player2 = sprites.create(img`
. . . . . . . c d . . . . . . . 
. . . . . . . c d . . . . . . . 
. . . . . . . c d . . . . . . . 
. . . . . . . c b . . . . . . . 
. . . . . . . f f . . . . . . . 
. . . . . . . c 4 . . . . . . . 
. . . . . . . f f . . . . . . . 
. . . . . . . e 4 . . . . . . . 
. . . . . . e e 5 2 . . . . . . 
. . . . . . e 4 5 2 . . . . . . 
. . . . . c c c 2 2 2 . . . . . 
. . . . e e 4 4 4 5 2 2 . . . . 
. . e f f f c c 2 2 f f 2 2 . . 
. e e e e 2 2 4 4 4 4 5 4 2 2 . 
e e e e e e 2 2 4 4 4 5 4 4 2 2 
e e e e e e 2 2 4 4 4 4 5 4 2 2 
`, SpriteKind.Player)
player2.setPosition(120, 60)
multiplayer.sharedImgs([img`
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
`, img`
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
`, img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . 5 5 . . . . . . . 
. . . . . . . 5 5 . . . . . . . 
. . . . . . . 5 5 . . . . . . . 
. . . . . . . 5 5 . . . . . . . 
. . . . . . . 5 5 . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`])
multiplayer.multiPlayerStart(true)
