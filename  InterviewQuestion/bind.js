Function.prototype._bind=function(context){
    var func=this;
    var params=[].slice.call(arguments,1);
    var Fnop=function(){};
    var fbound=function(){
        params=params.concat([].slice.call(arguments));
        return func.apply(this instanceof Fnop? this:context,params);
    };
    Fnop.prototype=this.prototype;
    fbound.prototype=new Fnop();
    return fbound;
}