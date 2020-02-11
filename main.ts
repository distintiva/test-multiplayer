multiplayer.onMasterLoop(2000, function () {
    mySprite = sprites.create(img`
. . . . . . . . c c c c . . . . 
. . . . c c c c c c c c c . . . 
. . . c f c c a a a a c a c . . 
. . c c f f f f a a a c a a c . 
. . c c a f f c a a f f f a a c 
. . c c a a a a b c f f f a a c 
. c c c c a c c b a f c a a c c 
c a f f c c c a b b 6 b b b c c 
c a f f f f c c c 6 b b b a a c 
c a a c f f c a 6 6 b b b a a c 
c c b a a a a b 6 b b a b b a . 
. c c b b b b b b b a c c b a . 
. . c c c b c c c b a a b c . . 
. . . . c b a c c b b b c . . . 
. . . . c b b a a 6 b c . . . . 
. . . . . . b 6 6 c c . . . . . 
`, SpriteKind.Enemy)
    mySprite.setVelocity(0, 50)
    mySprite.setPosition(Math.randomRange(20, 120), 0)
    mySprite.setFlag(SpriteFlag.AutoDestroy, true)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (multiplayer.spriteIsFrom(sprite, multiplayer.Players12.Player1)) {
        info.changeScoreBy(1)
    }
    if (multiplayer.spriteIsFrom(sprite, multiplayer.Players12.Player2)) {
        info.player2.changeScoreBy(1)
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (multiplayer.isPlayer1()) {
        laser = sprites.createProjectileFromSprite(img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . 1 . . . . . . . . 
. . . . . . 1 1 1 . . . . . . . 
. . . . . . 1 5 1 . . . . . . . 
. . . . . . 1 5 1 . . . . . . . 
. . . . . . 1 5 1 . . . . . . . 
. . . . . . 1 5 1 . . . . . . . 
. . . . . . 1 5 1 . . . . . . . 
. . . . . . 4 2 4 . . . . . . . 
. . . . . 2 5 . 5 2 . . . . . . 
. . . . . . . 5 . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, player1, 0, -100)
        multiplayer.spriteOwnsTo(laser, multiplayer.Players12.Player1)
    } else {
        laser = sprites.createProjectileFromSprite(img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . 1 . . . . . . . . 
. . . . . . 1 1 1 . . . . . . . 
. . . . . . 1 5 1 . . . . . . . 
. . . . . . 1 5 1 . . . . . . . 
. . . . . . 1 5 1 . . . . . . . 
. . . . . . 1 5 1 . . . . . . . 
. . . . . . 1 5 1 . . . . . . . 
. . . . . . 4 2 4 . . . . . . . 
. . . . . 2 5 . 5 2 . . . . . . 
. . . . . . . 5 . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, player2, 0, -100)
        multiplayer.spriteOwnsTo(laser, multiplayer.Players12.Player2)
    }
})
multiplayer.onConnected(function () {
    effects.starField.startScreenEffect()
    player1.setPosition(40, 100)
    player2.setPosition(120, 100)
    multiplayer.movePlayers(player1, player2, 100, 100)
})
let laser: Sprite = null
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
. . . . . . . . c c c c . . . . 
. . . . c c c c c c c c c . . . 
. . . c f c c a a a a c a c . . 
. . c c f f f f a a a c a a c . 
. . c c a f f c a a f f f a a c 
. . c c a a a a b c f f f a a c 
. c c c c a c c b a f c a a c c 
c a f f c c c a b b 6 b b b c c 
c a f f f f c c c 6 b b b a a c 
c a a c f f c a 6 6 b b b a a c 
c c b a a a a b 6 b b a b b a . 
. c c b b b b b b b a c c b a . 
. . c c c b c c c b a a b c . . 
. . . . c b a c c b b b c . . . 
. . . . c b b a a 6 b c . . . . 
. . . . . . b 6 6 c c . . . . . 
`, img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . 1 . . . . . . . . 
. . . . . . 1 1 1 . . . . . . . 
. . . . . . 1 5 1 . . . . . . . 
. . . . . . 1 5 1 . . . . . . . 
. . . . . . 1 5 1 . . . . . . . 
. . . . . . 1 5 1 . . . . . . . 
. . . . . . 1 5 1 . . . . . . . 
. . . . . . 4 2 4 . . . . . . . 
. . . . . 2 5 . 5 2 . . . . . . 
. . . . . . . 5 . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`])
multiplayer.waitForConnection(true)
