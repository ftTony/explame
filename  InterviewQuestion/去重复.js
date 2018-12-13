// 方法一：正常思维

/* var array=[1,1,'1'];

function unique(array){
    var res=[];
    for(var i=0,len=array.length;i<len;i++){
        var current=array[i];
        if(res.indexOf(current)===-1) res.push(current);
    }
    return res;
} */

// 方法二：利用fitler

/* var array=[1,2,1,1,'1'];

function unique(array){
    var res=array.filter(function(item,index,array){
        return array.indexOf(item)===index;
    });
    return res;
} */

// 使用reduce

/* var arr=[1,2,1,2,3,5,4,5,3,4,4,4,4];

function unique(arr){
    var result=arr.sort().reduce(()=>{
        if(init.length===0 || init[init.length-1]!=current){
            init.push(current);
        }
        return init;
    },[]);
    return result;
} */