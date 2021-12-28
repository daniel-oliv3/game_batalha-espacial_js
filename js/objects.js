//Nave
var Sprite = function(sourceX, sourceY, width, height, x, y){
    this.sourceX = sourceX;
    this.sourceY = sourceY;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
}

//metodos da classe
Sprite.prototype.centerX = function(){
    return this.x + (this.width/2);
}

Sprite.prototype.centerY = function(){
    return this.y + (this.height/2);
}

Sprite.prototype.halfWidth = function(){
    return this.width/2;
}

Sprite.prototype.halfHeight = function(){
    return this.height/2;
}


//Inimigo/Herança
var Alien = function(sourceX, sourceY, width, height, x, y){
    Sprite.call(this, sourceX, sourceY, width, height, x, y);
    this.NORMAL = 1;
    this.EXPLODED = 2;
    this.CRAZY = 3;
    this.state = this.NORMAL;
    this.mvStye = this.NORMAL;
}
//Herança/metodos da classe
Alien.prototype = Object.create(Sprite.prototype);
Alien.prototype.explode = function(){
    this.sourceX = 80;
    this.width = this.height = 56;
}