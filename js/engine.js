/**
Engine sorts tick rate,
    calls tick and paintme functions on registered components,
     use KN.Engine.addObject(component), to add to game loop

*/
KN.createModule("Engine",{
    tick_ms: 30,
    save_tick_ms: 1000,
    ready: false,
    isPause: true,
    tick_handler: false,
    objects: [],
    canvas: null,
    canvas_rect: {
        h:0,
        w:0
    },
    require: [
        "Melon",
        "Banana"
    ],
    afterLoad: function(){
       console.log("Engine loaded");
       this.canvas = document.getElementById('cnx');
       this.ctx = this.canvas.getContext('2d');
       this.ready = true;
    },
    start: function(){
        if(!ready) {
            console.log("Engine not ready. READY : ", this.ready);
            return;
        } else {
            this.pause = false;
        }
    },
    pause: function(){
        this.isPause = !this.isPause;
        if (this.tick_handler) {
            clearInterval(this.tick_handler);
            this.tick_handler = false;
        } else {
            this.tick_handler = setInterval(this.tick.bind(this), this.tick_ms);
        }
    },
    tick: function(){
        this.objects.forEach(function(i){
            if (i.doTick) {
                i.doTick();
            }
        });
        this.paint();
    },
    paint: function(){
        var ctx = this.ctx;
        var me = this;
        ctx.clearRect(0, 0, me.canvas.width,me.canvas.height);
        this.objects.forEach(function(i){
            if (i.paintMe) {
                i.paintMe(ctx);
            }
        });
    },
    addObject: function(obj){
        this.objects.push(obj);
    }
});
// KN.doLoader.push(KN.engine);
// KN.isLoaded();