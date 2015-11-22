var SpriteClass = {
    init: function(){
        throw "Unimplemented init() in sprite!";
    },
    step: function(){
        throw "Unimplemented step() in sprite!";
    },
    render: function(){
        throw "Unimplemented render() in sprite!";
    }
};

var Sprite = extend(SpriteClass, {

    keymonitor: {},
    xPos: 60,
    yPos:60,
    x: function(){
        return this.xPos - this.width/2;
    },
    y: function(){
        return this.yPos - this.height/2;
    },
    width: 80,
    height:105,
    loaded: false,
    image: undefined,
    direction: 0,
    speed: 15,
    dx: 0,
    dy: 0,
    animFrame: 0,

    init: function(keymonitor){
        this.keymonitor = keymonitor;

        var base_image = new Image();

        base_image.onload = function(){
            this.onload();
        }.bind(this);
        this.image = base_image;

        base_image.src = './sprite.png';
    },

    step: function(){
        var LEFT = 37;
        var RIGHT = 39;
        var UP = 38;
        var DOWN = 40;
        var SPACE = 32;

        this.dx = 0;
        this.dy = 0;
        if(this.keymonitor.isPressed(UP)){
            this.dy = -1*this.speed/1.5;
            this.direction = 3;
            this.animFrame = (this.animFrame+1)%4;
        }else
        if(this.keymonitor.isPressed(DOWN)){
            this.dy = 1*this.speed/1.5;
            this.direction = 0;
            this.animFrame = (this.animFrame+1)%4;
        }else

        if(this.keymonitor.isPressed(LEFT)){
            this.dx = -1*this.speed;
            this.direction = 1;
            this.animFrame = (this.animFrame+1)%4;
        }else
        if(this.keymonitor.isPressed(RIGHT)){
            this.dx = 1*this.speed;
            this.direction = 2;
            this.animFrame = (this.animFrame+1)%4;
        }else{
            this.animFrame = 0;
        }

        if(this.keymonitor.isPressed(SPACE)){
            var audio = new Audio('shoot.mp3');
            audio.play();
        }

        this.xPos+=this.dx;
        this.yPos+=this.dy;
    },

    render: function(context){
        var tick = (Math.floor(Date.now()/200))%4;
        context.drawImage(
            this.image,
            this.animFrame*80,this.direction*105,80,105,
            this.x(),
            this.y(),
            this.width,
            this.height
        );

    }
});