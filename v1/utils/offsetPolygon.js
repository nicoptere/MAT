
// Return points representing an enlarged polygon.
function offsetPolygon( polygon, offset ){
    var tmp = [];
    var points = polygon.points;
    var count = points.length;
    for(var j = 0; j < count; j++){

        // finds the previous, current and next point
        var i = (j - 1);
        if (i < 0) i += count;
        var k = (j + 1) % count;

        var pre = points[ i ];
        var cur = points[ j ];
        var nex = points[ k ];

        //create 2 lines, parallel to both edges at a given distance 'offset'

        //computes a vector in the direction of the: prev -> current edge
        var v1 = cur.clone().sub( pre ).normalize();

        //give it a length 'offset'
        v1.multiplyScalar(offset);

        // then rotates it by 90° (make it normal the edge)
        var n1 = new Point(-v1.y, v1.x);

        //and create 2 points at both ends of the edge to obtain a parallel line
        var off_p00 = pre.clone().add( n1 );
        var off_p01 = cur.clone().add( n1 );

        //does the same for the : current -> next edge
        var v2 = nex.clone().sub( cur ).normalize().multiplyScalar(offset);
        var n2 = new Point(-v2.y, v2.x);
        var off_p10 = cur.clone().add( n2 );
        var off_p11 = nex.clone().add( n2 );

        //then finds the intersection of the lines parallel to bothe edges
        var ip = LineIntersection(off_p00, off_p01, off_p10, off_p11 );
        if( ip != null ){

            //store the position before the offseting
            //this is required when we collapse the edges
            ip.last = new Point();
            ip.last.x = cur.x;
            ip.last.y = cur.y;
            ip.origin.x = cur.origin.x;
            ip.origin.y = cur.origin.y;

            //store the result if not null
            tmp.push(ip);
        }
    }
    polygon.points = tmp;
    return tmp;
}