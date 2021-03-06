

function LineIntersection( p1, p2, p3, p4 ) {
    // Get the segments' parameters.
    var dx12 = Math.round( p2.x - p1.x );
    var dy12 = Math.round( p2.y - p1.y );
    var dx34 = Math.round( p4.x - p3.x );
    var dy34 = Math.round( p4.y - p3.y );
    var denominator = (dy12 * dx34 - dx12 * dy34);
    var t1 = ((p1.x - p3.x) * dy34 + (p3.y - p1.y) * dx34) / denominator;
    if ( t1 == Number.POSITIVE_INFINITY || t1 == Number.NEGATIVE_INFINITY ) {
        return null;
    }
    return new Point(p1.x + dx12 * t1, p1.y + dy12 * t1);
}
