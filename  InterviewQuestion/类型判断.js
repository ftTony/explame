Object.prototype.isType=function(type){
    return function(params){
        return Object.prototype.toString.call(params)===`[object ${type}]`;
    }
}