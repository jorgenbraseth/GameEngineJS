var KeyMonitor = {
    keyMap: {},

    bind: function() {
        if (document.attachEvent){
            document.attachEvent('onkeydown', this.pressed.bind(this));
            document.attachEvent('onkeyup', this.released.bind(this));
        }
        else {
            document.addEventListener('keydown', this.pressed.bind(this));
            document.addEventListener('keyup', this.released.bind(this));
        }
    },

    isPressed: function(charCode){

        return this.keyMap[charCode] === true;
    },

    pressed: function(e) {
        var key = window.event ? e.keyCode : e.which;
        this.keyMap[key] = true;
    },

    released: function(e) {
        var key = window.event ? e.keyCode : e.which;
        this.keyMap[key] = false;
    }
};
