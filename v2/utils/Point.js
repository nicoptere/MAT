
var Point = function (x, y) {

    this.x = (x) || 0;
    this.y = (y) || 0;

    //used to collapse an edge
    this.last = null;

    //used when computing the PSLG
    this.isIntersect = false;

    //used when splitting a polygon into sub polygons
    this.visited = false;
    this.edge = null;
    this.next = null;

    //stores the origin to get the straight skeleton anchors
    this.origin = { x:this.x, y:this.y };



    return this;
};
Point.prototype = {
    add : function(p){
        this.x += p.x;
        this.y += p.y;
        return this;
    },
    sub : function(p){
        this.x -= p.x;
        this.y -= p.y;
        return this;
    },
    clone : function(){
        return new Point(this.x, this.y);
    },
    copy : function(p){
        this.x = p.x;
        this.y = p.y;
        return this;
    },
    length : function(){
        return Math.sqrt( this.x*this.x + this.y * this.y );
    },
    normalize : function(){
        var l = this.length();
        this.x/=l;
        this.y/=l;
        return this;
    },
    multiplyScalar : function( value ){
        this.x*= value;
        this.y*= value;
        return this;
    },
    direction : function( other ){
        return other.clone().sub(this).normalize();
    },
    dot : function ( p ){
        return this.x * p.x + this.y * p.y;
    },
    equals:function(other){
        return this.x == other.x && this.y == other.y;
    }
};

