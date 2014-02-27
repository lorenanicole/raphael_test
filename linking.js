window.onload = function() {
    var paper = new Raphael(document.getElementById('canvas_container'), 500, 500);
    var joe_shape = paper.circle(50, 50, 10).attr({fill: "hsb(0, 1, 1)", stroke: "none"})
    var sara_shape = paper.circle(100, 100, 10).attr({fill: "hsb(.6, 1, 1)", stroke: "none"})
    // var con = paper.path("M 50 50 l 50 50")
var ox = 0;
var oy = 0;

function start(){}

function move(dx, dy, posx, posy) {
    this.attr({
        transform: "...T" + (dx - ox) + "," + (dy - oy)
    });
    paper.connect(joe_shape, sara_shape, "hsb(0, 1, 1)" );
    // var joe_shape_x = joe_shape.attrs.cx,
    //     joe_shape_y = joe_shape.attrs.cy,
    //     sara_shape_x = sara_shape.attrs.cx,
    //     sara_shape_y = sara_shape.attrs.cy;
    // con.attr("path", "M"+joe_shape_x+" "+joe_shape_y+" l"+sara_shape_x - joe_shape_x+ " " + sara_shape_y - joe_shape_y);  
    ox = dx;
    oy = dy;
}


function up(e) {
    ox = 0;
    oy = 0;
}

joe_shape.drag(move, start, up);
sara_shape.drag(move, start, up);

}



Raphael.fn.connect = function(obj1, obj2, colour) {
    // list of paths each object has
    obj1.connections = []
    obj2.connections = []
    // if (!obj1.connections) obj1.connections = [] && if (!obj2.connections) obj2.connections = [])
    // get the bounding box of each object
    var box1 = obj1.getBBox()
    var box2 = obj2.getBBox()
    // create a line/path from object 1 to object 2
    var p = this.path("M" + (box1.x + box1.width / 2) + ","
            + (box1.y + box1.height / 2) + "L" + (box2.x + box2.width / 2)
            + "," + (box2.y + box2.height / 2))
    // adjust attributes of the path
    p.attr({
        stroke : colour,
        "stroke-linecap" : "round",
        "stroke-opacity" : Math.max(obj1.attr('opacity'), obj2.attr('opacity'))
    })
    // set the start and end element for this path
    p.startElement = obj1;
    p.endElement = obj2;
    // add the path to each of the object
    obj1.connections.push(p)
    obj2.connections.push(p)
    // mark each object as being connected
    obj1.connected = true;
    obj2.connected = true;
    // listen for the Raphael frame event
    eve.on("raphael.anim.frame.*", function(obj) {
        // if the object the frame event is fired on is connected
        if (this.connected) {
            // for each connection on this object
            for ( var c in this.connections) {
                var path = this.connections[c]; // temp path
                var b1 = path.startElement.getBBox(); // get the current
                                                        // location of start
                                                        // element
                var b2 = path.endElement.getBBox();// get the current location
                                                    // of end element
                // move the path to the new locations
                path.attr({
                    path : "M " + (b1.x + b1.width / 2) + " "
                            + (b1.y + b1.height / 2) + "L "
                            + (b2.x + b2.width / 2) + " "
                            + (b2.y + b2.height / 2),
                    opacity : Math.max(path.startElement.attr('opacity'),
                            path.endElement.attr('opacity'))
                });
            }
        }
    });
}
