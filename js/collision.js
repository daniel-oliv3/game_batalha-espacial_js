function collide(s1, s2){
    var hit = false;

    //Calcular a distancia entre o centro dos sprites
    var vetX = s1.centerX() - s2.centerX();
    var vetY = s1.centerY() - s2.centerY();

    //Armazena as somas das metades dos sprites largura e ltura
    var sumHalfWidth = s1.halfWidth() + s2.halfWidth();
    var sumHalfHeight = s1.halfHeight() + s2.halfHeight();

    //Verifica se ouve colisão
    if(Math.abs(vetX) < sumHalfWidth && Math.abs(vetY) < sumHalfHeight){
        hit = true;
    }
    return hit;
}