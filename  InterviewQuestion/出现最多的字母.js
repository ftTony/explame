var str = "jhadfgskjfajhdewqe";

function fn(str){
    return str.split('').reduce(function(obj,current){
        if(current in obj){
            obj[current]++;
        }else{
            obj[current]=1;
        }
        obj.max=obj.max>obj[current]?obj.max:obj[current];
        obj.key=obj.max>obj[current]?obj.key:current;
        return obj;
    },{});
}