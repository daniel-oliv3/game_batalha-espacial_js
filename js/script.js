(function(){
    //canvas
    var cnv = document.querySelector('canvas');

    //contexto de renderização 2d
    var ctx = cnv.getContext('2d');
    

    // RECURSOS DO JOGO
    //Arrays
    var sprites = [];
    var assetsToLoad = [];
    var missiles = [];
    var aliens = [];

    //Variaveis úteis
    var alienFrequency = 100;
    var alienTimer = 0;

    //Sprites Sheets
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

    // Ações (Nave)
    var mvLeft = mvRight = shoot = spaceIsDown = false;

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
            case SPACE:
                if(!spaceIsDown){
                    shoot = true;
                    spaceIsDown = true;
                }
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
                break;
            case SPACE:
                spaceIsDown = false;
                break;            
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
        // Move para a esquerda
        if(mvLeft && !mvRight){
            defender.vx = -5;
        }
        // Move para a direita
        if(mvRight && !mvLeft){
            defender.vx = 5;
        }
        // Para a Nave
        if(!mvLeft && !mvRight){
            defender.vx = 0;
        }

        //Disparo do canhão
        if(shoot){
            fireMissile();
            shoot = false;
        }

        // Atualiza a posição
        defender.x = Math.max(0, Math.min(cnv.width - defender.width, defender.x + defender.vx));

        //Atualização da posição dos misseis
        for(var i in missiles){
            var missile = missiles[i];
            missile.y += missile.vy;
            if(missile.y < -missile.height){
                removeObjects(missile, missiles);
                removeObjects(missile, sprites);
                i--;
            }
        }
        //encremento do alienTimer
        alienTimer++;

        //criação do alien, caso o o time se iguale a frenquencia
        if(alienTimer === alienFrequency){
            makeAlien();
            alienTimer = 0;

            //ajuste na frenquencia de criação de aliens
            if(alienFrequency > 2){
                alienFrequency--;
            }
        }

    }

    //Criação dos mísseis
    function fireMissile(){
        var missile = new Sprite(136, 12, 8, 13, defender.centerX() - 4, defender.y - 13);
        missile.vy = -8;
        sprites.push(missile);
        missiles.push(missile);
    }

    //criação de aliens
    function makeAlien(){
        var alienPosition = (Math.floor(Math.random() * 8)) * 50; //cria uma valor aleatorio entre 0 e 7 => lagura  do canvas / largura do alien. //Divide o canvas em 8 colunas para o posicionamento aleatorio do alien
        var alien = new Alien(30, 0, 50, 50, x, y);
    }

    //Remove os objetos do jogo
    function removeObjects(objectToRemove, array){ 
        var i = array.indexOf(objectToRemove);
        if(i !== -1){
            array.splice(i, 1);
        }
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