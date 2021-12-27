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

Sprite.prototype.halfwidth = function(){
    return this.width/2;
}

Sprite.prototype.halfheight = function(){
    return this.height/2;
}