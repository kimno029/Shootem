KN.engine = {
    tick_ms: 20,
    ready:false,
    tick_handler: false,
    objects: [],
    canvas: null,
    afterLoad: function(){
       console.log("Engine loaded");
       this.canvas = document.getElementById('cnx');
       this.ready = true;
    },
    start: function(){
        if(!ready) {
            console.log("Engine not ready. READY : ", this.ready);
            return;
        }
    },
    pause: function(){
        if (this.tick_handler) {
            clearInterval(this.tick_handler);
            this.tick_handler = false;
        } else {
            this.tick_handler = setInterval(this.tick.bind(this), this.tick_ms);
        }
    },
    tick: function(){
        this.objects.forEach(function(i){
            i.doMove();
        });
        this.paint();
    },
    paint: function(){
        var ctx = this.canvas.getContext('2d');
        this.objects.forEach(function(i){
            i.paintMe(ctx);
        });
    },
    addObject: function(obj){
        this.objects.push(obj);
    }
};
KN.doLoader.push(KN.engine);
KN.isLoaded();