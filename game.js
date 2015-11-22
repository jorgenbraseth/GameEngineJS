


var Game = {

    sprites: [],
    screen: {},

    init:function(keymonitor){
        this.screen = document.getElementById("game");

        Sprite.onload = function(){
            var allLoaded = this.sprites.reduce(function(prev, cur){
                return prev && cur;
            },true);
            if(allLoaded){
                this.onload();
            }
        }.bind(this);

        this.sprites.push(Sprite);
        this.sprites.forEach(function(spr){
            spr.init(keymonitor);
        })


    },


    step: function(){
        var sw = this.screen.width;
        var sh = this.screen.height;
        this.sprites.forEach(function(sprite){
            sprite.step();
        });
    },

    render: function(){
        var context = document.getElementById("game").getContext("2d");

        context.fillStyle="#3399ff";
        context.fillRect(0,0,300,150);

        this.sprites.forEach(function(sprite){
            sprite.render(context);
        });
    }
}



function loop(){
    Game.step();
    Game.render();
    requestAnimationFrame(loop)
}


function run() {
    KeyMonitor.bind();
    Game.onload = function(){
        loop();
    };
    Game.init(KeyMonitor);


}

// in case the document is already rendered
if (document.readyState!='loading') run();
// modern browsers
else if (document.addEventListener) document.addEventListener('DOMContentLoaded', run);
// IE <= 8
else document.attachEvent('onreadystatechange', function(){
        if (document.readyState=='complete') run();
    });