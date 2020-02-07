function startGame () {
	
}
multiplayer.onConnected(function () {
    scene.setBackgroundColor(4)
    mySprite = sprites.create(img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . 8 8 8 8 8 8 8 . . . . . . 
. . . 8 . . . . . 8 . . . . . . 
. . . 8 . . . . . 8 . . . . . . 
. . . 8 . . . . . 8 . . . . . . 
. . . 8 8 8 8 8 8 8 . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, SpriteKind.Player)
    mySprite.setPosition(27, 21)
    controller.moveSprite(mySprite)
    pl2 = sprites.create(img`
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
    controller.player2.moveSprite(pl2)
})
let pl2: Sprite = null
let mySprite: Sprite = null
multiplayer.multiPlayerStart()
