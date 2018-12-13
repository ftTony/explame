var throttle=function(fn,wait){
    var timer,previous,now,diff;
    return function(){
        var _args=[].slice.call(arguments),
                context=this;
// 储存当前时间戳
                now=Date.now();
                var _fn=function(){
                    previous=Date.now();
                    timer=null;
                    fn.apply(context,_args);
                };

                clearTimeout(timer);
                if(previous!=undefined){
                    diff=now-previous;
                    if(diff>=wait){
                        fn.apply(context,_args);
                        previous=now;
                    }else{
                        timer=setTimeout(_fn,wait)
                    }
                }else{
                    _fn();
                }
    }
}