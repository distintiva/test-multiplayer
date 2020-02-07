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

let programState = ProgramState.Waiting;

let gameStarted = false;

const dbFont = image.doubledFont(image.font8);

let offset = 0;
let flip = true;
let readyCount = 3000;




function waitForOtherPlayer() {
    if (programState === ProgramState.Waiting) {

        screen.printCenter("SPACE", 10, 1, image.font12);
        screen.printCenter("DESTROYER", 26, 1, image.font12);

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
            startGame();
            return;

        }

        screen.printCenter("GET READY", 26, 1, dbFont);
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
