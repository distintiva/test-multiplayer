// Add your code here
// Add your code here
//jacdac.controllerService.stop();

//% weight=0 color=#b8860b icon="\uf021" block="Sprite Transforms"
//% advanced=true
namespace multiplayer {


    //% blockId=transform_change_rotation
    //% block="start mutiplayer game"
    //% sprite.shadow="variables_get" angleChange.defl=0
    export function multiPlayerStart():void {
        jacdac.controllerService.stop();

       
       
    }

    // group="Gameplay"
    //% blockId=onConnected block="on multiplayer connected"
    //% blockAllowMultiple=0
    export function onConnected(a: () => void): void {
        if (!a) return;
        funcOnConnected = a;
        return;
    }

    // group="Gameplay"
    //% blockId=drawTitle block="show title $text || subtitle $sub | color $color"
    //% blockAllowMultiple=0
    //% color.defl=1
    //% color.min=1 color.max=15
    //% text.defl=""
    //% sub.defl=""
    //% expandableArgumentMode="toggle"
    export function drawTitle(text:string, sub:string, color:number): void {
        waitTitle = text;
        waitSubtitle = sub;
        waitTitleColor = color;
    }

    // group="Gameplay"
    
    //% blockId="moveplayers" block="move $player1=variables_get(player1) $player2=variables_get(player2) ||vx $vx vy $vy"
    //% vx.defl=100 vy.defl=100
    //% blockAllowMultiple=0
    //% expandableArgumentMode="toggle"
    //% inlineInputMode=inline
    export function movePlayers(player1:Sprite, player2:Sprite, vx:number=100, vy:number=100): void {
       pl1 = player1;
       pl2 = player2;
       _vx= vx;
       _vy= vy;

       if (isPlayerOne()) {
           controller.moveSprite(pl1, _vx, _vy);

       } else {
           controller.moveSprite(pl2, _vx, _vy);

       }

        
    }
 


    game.onShade(function () {
        waitForOtherPlayer();
    })


const socket = multiplayer.Socket.getInstance();

enum ProgramState {
    Waiting = 0,
    Counting = 1,
    Playing = 2,
    Disconnected = 3
}

let funcOnConnected: () => void;

let waitTitle ="", waitSubtitle = "", waitTitleColor = 1;

let pl1:Sprite, pl2:Sprite;
let _vx:number=100, _vy:number=100;

let programState = ProgramState.Waiting;

let gameStarted = false;

const dbFont = image.doubledFont(image.font8);

let offset = 0;
let flip = true;
let readyCount = 3000;




function waitForOtherPlayer() {
    if (programState === ProgramState.Waiting) {

        screen.printCenter(waitTitle, 10, waitTitleColor, image.font12);
        screen.printCenter(waitSubtitle, 26, waitTitleColor, image.font12);

        screen.printCenter("Waiting for connection", 80, 9, image.font8);

        if (flip) {
            screen.fillRect(30, 95, offset, 2, 3);
        }
        else {
            screen.fillRect(30 + offset, 95, 100 - offset, 2, 3);
        }

        offset = (offset + 1) % 100;

        if (!offset) flip = !flip;
    }
    else if (programState === ProgramState.Counting) {
        readyCount -= game.eventContext().deltaTimeMillis;
        if (readyCount <= 0) {
            programState = ProgramState.Playing;
            //const g = new multiplayer.Game(socket);
            //g.startGame();
            //startGame();
            funcOnConnected();
            return;

        }

        if( isPlayerOne() ){
         screen.printCenter("GET READY 1", 26, 1, dbFont);
        // controller.moveSprite(pl1,_vx, _vy);
        
        }else{
            screen.printCenter("GET READY 2", 26, 1, dbFont);
         //   controller.moveSprite(pl2, _vx, _vy);
          
        }

        screen.printCenter("" + Math.idiv(readyCount, 1000), 80, 1, dbFont);
    }
}

socket.onConnect(function () {
    if (programState === ProgramState.Waiting) {
        programState = ProgramState.Counting;
        readyCount = 4000;
    }
    else if (programState === ProgramState.Disconnected) {
        game.popScene();
    }
});

socket.onDisconnect(function () {
    if (programState === ProgramState.Playing) {
        game.pushScene();
        game.onShade(function () {
            screen.printCenter("CONNECTION", 30, 1, dbFont);
            screen.printCenter("LOST", 46, 1, dbFont);
        });
        programState = ProgramState.Disconnected;
    }
});

enum SpriteKindLegacy {
    Player1,
    Player2,
    Laser1,
    Laser2,
    Asteroid
}

function isPlayerOne() {
    return socket.session.playerNumber === 1;
}
}
