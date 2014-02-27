window.onload = function() {
    var paper = new Raphael(document.getElementById('canvas_container'), 500, 500);
    var joe_shape = paper.path("M 250 250 l 50 50 l -100 0 l 50 50 -50 50 z")
var ox = 0;
var oy = 0;

function start(){}

function move(dx, dy, posx, posy) {
    joe_shape.attr({
        transform: "...T" + (dx - ox) + "," + (dy - oy)
    });
    ox = dx;
    oy = dy;
}


function up(e) {
    ox = 0;
    oy = 0;
}

joe_shape.drag(move, start, up);

}
