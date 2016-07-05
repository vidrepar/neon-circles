
var app = {

    canvas:null,
    stage:null,
    circles:[],
    CIRCLE_NUM:25,
    
    init:function () {

        app.canvas = document.getElementById('my-canvas');
        app.stage = new createjs.Stage(app.canvas);
        app.stage.enableDOMEvents();
        app.stage.enableMouseOver(10);
        createjs.Touch.enable(app.stage);

        createjs.Ticker.addEventListener('tick', app.update);

    },
    draw:function () {

        for(var i=0;i<app.CIRCLE_NUM;i++) {

            var circle = new Circle((i+1)*4);

            circle.shape.x = Math.random()*400;
            circle.shape.y = Math.random()*400;

            circle.shape.scaleX = 2;
            circle.shape.scaleY = 2;

            app.circles.push(circle);

            app.stage.addChild(circle.shape);

            TweenLite.to(circle.shape, 2, { x:400, y:200, ease:Back.easeOut });

        }

    },
    listenForClick:function () {

        app.stage.addEventListener('stagemousemove', app.onMouseUp);

    },
    onMouseUp:function (evt) {

        for(var i=0;i<app.circles.length;i++){

            var circle = app.circles[i];

            circle.animateTo({
                x:app.stage.mouseX,
                y:app.stage.mouseY,
                ease : Elastic.easeOut
            }, i*5/app.CIRCLE_NUM+1);

        }

    },
    update:function (evt) {

        app.stage.update(evt);

    }


};

app.init();
app.draw();
app.listenForClick();