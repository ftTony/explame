function debounce(func,wait,immediate){
    var timeout;
    return function(){
        var context=this;
        var args=arguments;
        if(timeout) clearTimeout(timeout);
        if(immediate){
            var callNow=!timeout;
            timeout=setTimeout(function(){
                timeout=null;
            },wait);
            if(callNow) func.apply(context,args);
        }else{
            timeout=setTimeout(function(){
                func.apply(context,args);
            },wait);
        }
    }
}