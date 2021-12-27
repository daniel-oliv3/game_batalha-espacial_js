(function(){
    //canvas
    var cnv = document.querySelector('canvas');

    //contexto de renderização 2d
    var ctx = cnv.getContext('2d');
    

    // RECURSOS DO JOGO


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
        this.alert(key);
    }, false);

    // FUNÇÕES
}());