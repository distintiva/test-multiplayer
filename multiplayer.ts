// Add your code here
// Add your code here
//jacdac.controllerService.stop();

//% weight=0 color=#DDB012 icon="\uf0e8" block="Real Multiplayer"
//% advanced=false
namespace multiplayer {
    enum GameMessage {
        Update = 7,
        LaserCreated = 8,
        AsteroidCreated = 9,
        AsteroidDestroyed = 10,
        HudUpdate = 11
    }


     

function test(){
    let b: Buffer = control.createBuffer(0);
    let im: Image = pl1.image;

    if (pl1 == undefined) return;

    let imcrc=0;
    for (let f = 0; f < im.height; f++) {
        for (let c = 0; c < im.width; c++) {
            let px = im.getPixel(f, c);
            imcrc += px*c + (c*f);
        }
    }



    //pl1.image.setRows(2, b);
    console.log("buffer");
    console.log( imcrc );
    
  //  console.log(jacdac.jd_crc(b));
}


    const socket =  multiplayer.Socket.getInstance();

    enum ProgramState {
        Waiting = 0,
        Counting = 1,
        Playing = 2,
        Disconnected = 3
    }

    let funcOnConnected: () => void;
    let funcOnMasterLoop: () => void;

    let waitTitle = "", waitSubtitle = "", waitTitleColor = 1;
    let waitMessageText = "", waitMessageColor = 8, waitProgressBarColor = 8;


    let pl1: Sprite, pl2: Sprite;
    let _vx: number = 100, _vy: number = 100;

    let programState = ProgramState.Waiting;

    let gameStarted = false;

    let useHWMultiplayer = false;

    const dbFont = image.doubledFont(image.font8);

    let offset = 0;
    let flip = true;
    let readyCount = 3000;

    
    //% blockId=myFunction
    //% block="as $myParam"
    //% myParam.shadow="lists_create_with"
    //% myParam.defl="inner_shadow_block"
    function myFunction(myParam: number[]): void { }


    //% blockId=multiPlayerStart
    //% block="start mutiplayer game5"
    //% sprite.shadow="variables_get" angleChange.defl=0
    export function multiPlayerStart():void {
        
        jacdac.controllerService.stop();
        useHWMultiplayer = true;

       
       
       
    }


    //% blockId=onConnected block="on multiplayer connected"
    //% blockAllowMultiple=0
    export function onConnected(a: () => void): void {
        if (!a) return;
        funcOnConnected = a;
        return;
    }

    //% blockId=onMasterLoop block="on master loop every $every"
    //% every.shadow="timePicker"
    export function onMasterLoop(every:number, a: () => void ): void {
        if (!a) return;
        
        if( isPlayerOne() ){
            game.onUpdateInterval(every, a );
        }


    }

    // group="Gameplay"
    //% blockId=drawTitle block="show title $text || subtitle $sub | color %color=colorindexpicker"
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

    //% blockId=waitMessage block="wait message $text || color %color=colorindexpicker | progress color %barcolor=colorindexpicker"
    //% blockAllowMultiple=0
    //% color.defl=8
    //% barcolor.defl=8
    //% text.defl="Waiting for connection"
    //% expandableArgumentMode="toggle"
    //% inlineInputMode=inline
    export function waitMessage(text: string, color: number=8, barcolor:number=8): void {
        waitMessageText = text;
        waitMessageColor = color;
        waitProgressBarColor = barcolor;
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

       //- on simulator mode
       if( !useHWMultiplayer ){
           controller.player2.moveSprite(pl2, _vx, _vy)  ;     
       }
        test();
        
    }
 
//==================================


   

    sprites.onCreated(SpriteKind.Enemy, function (sprite) {
           // console.log(sprite.image.  );

           let b:Buffer = control.createBuffer(0) ;
           let im:Image  = sprite.image;
           
           if(pl1==undefined) return;
           
            for(let c=0;c<16;c++){
                let tmp: Buffer = control.createBuffer(16);
                sprite.image.getRows(c, tmp );
                b = b.concat(tmp);
            }

           
           
           //pl1.image.setRows(2, b);
          // console.log("buffer");
          // console.log(    (b.toHex())  );
    })


    game.onShade(function () {
        if( useHWMultiplayer ){
            waitForOtherPlayer();
        }else{

            if (!gameStarted){
                 funcOnConnected();  
                 gameStarted = true;
            }
        }
    })

    game.onUpdateInterval(100, () => {
        if (programState == ProgramState.Playing){
            sendPlayerState();
        }
        //this.sendPlayerState();
    });


    function sendPlayerState(kind = GameMessage.Update, arg = 0) {
        const playerSprite = isPlayerOne() ? pl1 : pl2;
        const packet = new SocketPacket();
        packet.arg1 = kind;
        packet.arg2 = playerSprite.x;
        packet.arg3 = playerSprite.y;
        packet.arg4 = playerSprite.vx;
        packet.arg5 = playerSprite.vy;

        socket.sendCustomMessage(packet);

        /*if (isPlayerOne()) {
            this.sendHUD();
        }*/
    }

    function updatePlayerState(packet: SocketPacket) {
        const otherSprite = isPlayerOne() ? pl2 : pl1;
        otherSprite.x = packet.arg2;
        otherSprite.y = packet.arg3;
        otherSprite.vx = packet.arg4;
        otherSprite.vy = packet.arg5;
    }

    socket.onMessage((packet: SocketPacket) => {
        switch (packet.arg1) {
            case GameMessage.Update:
                updatePlayerState(packet);
                break;
            /*case GameMessage.LaserCreated:
                this.updatePlayerState(packet);
                if (isPlayerOne()) {
                    this.createLaser(SpriteKindLegacy.Laser2, this.ship2, packet.arg5);
                }
                else {
                    this.createLaser(SpriteKindLegacy.Laser1, this.ship1, packet.arg5);
                }
                break;
            case GameMessage.AsteroidCreated:
                this.createAsteroid(packet.arg2, packet.arg3)
                break;
            case GameMessage.AsteroidDestroyed:
                this.handleCollision(packet.arg2, packet.arg3, packet.arg4 === 1)
                break;
            case GameMessage.HudUpdate:
                this.updateHUD(packet);
                break;*/
        }
    })







function waitForOtherPlayer() {
    if (programState === ProgramState.Waiting) {

        screen.printCenter(waitTitle, 10, waitTitleColor, image.font12);
        screen.printCenter(waitSubtitle, 26, waitTitleColor, image.font12);

        screen.printCenter(waitMessageText, 80, waitMessageColor, image.font8);

        if (flip) {
            screen.fillRect(30, 95, offset, 3, waitProgressBarColor);
        }
        else {
            screen.fillRect(30 + offset, 95, 100 - offset, 3, waitProgressBarColor);
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
    if( !useHWMultiplayer ) return true;
    return socket.session.playerNumber === 1;
}
}
