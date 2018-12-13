// 数组的扁平化，就是将一个嵌套多层的数组 array (嵌套可以是任何层数)转换为只有一层的数组。

/* 

方法一：

var arr = [1, [2, [3, 4]]];

function flatten(arr){
    var result=[];
    for(var i=0,len=arr.length;i<len;i++){
        if(Array.isArray(arr[i])){
            result=result.concat(flatten(arr[i]));
        }else{
            result.push(arr[i]);
        }
    }
} 
*/

function flatten(arr) {
    return arr.reduce(function (prev, next) {
        return prev.concat(Array.isArray(next) ? flatten(next) : next);
    }, []);
}