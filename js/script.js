(function(){
    //canvas
    var cnv = document.querySelector('canvas');

    //contexto de renderização 2d
    var ctx = cnv.getContext('2d');
    

    // RECURSOS DO JOGO
    //Arrays
    var sprites = [];
    var assetsToLoad = [];

    //Sprites
    //Cenário
    var background = new Sprite(0, 56, 400, 500, 0, 0);
    sprites.push(background);

    //Nave
    var defender = new Sprite(0, 0, 30, 50, 185, 450);
    sprites.push(defender);

    //Imagem
    var img = new Image();
    img.addEventListener('load', loadHandler, false);
    img.src = "img/img.png";
    assetsToLoad.push(img);

    //Contador de Recursos
    var loadedAssets = 0;


    // ENTRADAS (Setas do Teclado)
    var LEFT = 37, RIGHT = 39, ENTER = 13, SPACE = 32;

    // DIREÇÕES (Nave)
    var mvLeft = mvRight = false;

    //ESTADO DO JOGO (Loading, playing, paused, over)
    var LOADING = 0, PLAYING = 1, PAUSED = 2, OVER = 3;
    var gameState = LOADING;

    //LISTENERS (Comandos de Entrada)
    window.addEventListener('keydown', function(e){
        var key = e.keyCode;
        switch(key){
            case LEFT:
                mvLeft = true;
                break;
            case RIGHT:
                mvRight = true;
                break;    
        }
    }, false);

    window.addEventListener('keyup', function(e){
        var key = e.keyCode;
        switch(key){
            case LEFT:
                mvLeft = false;
                break;
            case RIGHT:
                mvRight = false;
                break;
            case ENTER:
                if(gameState !== PLAYING){
                    gameState = PLAYING;
                }else {
                    gameState = PAUSED;
                }        
        }
    }, false);

    // FUNÇÕES
    function loadHandler(){
        loadedAssets++;
        if(loadedAssets === assetsToLoad.length){
            img.removeEventListener('load', loadHandler, false);
            //Inicia o jogo
            gameState = PAUSED;
        }
    }

    function loop(){
        requestAnimationFrame(loop, cnv);
        //Define as ações com base no estado do jogo
        switch(gameState){
            case LOADING:
                console.log('LOADING...');
                break;
            case PLAYING:
                update();
                break;
        }
        render();
    }

    // Função responsavel pela atualização dos elementos do jogo 
    function update(){
        alert('Update ok');
    }

    // Função responsavel para desenhas os elementos do jogo na tela
    function render(){
        ctx.clearRect(0, 0, cnv.width, cnv.height);
        if(sprites.length !== 0){
            for(var i in sprites){
                var spr = sprites[i];
                ctx.drawImage(img, spr.sourceX, spr.sourceY, spr.width, spr.height, Math.floor(spr.x), Math.floor(spr.y), spr.width, spr.height);
            }
        }
    }

    loop();









}());