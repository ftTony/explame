// 1.在一个数组中 找出里面其中两项相加后的和为num，如果存在就返回两个数的索引位置，否则false

function fn(num=0,ary=[]){
    for(let i=0;i<ary.length;i++){
        let diff=num-ary[i];
        let diffIndex=ary.indexOf(diff);
        if(diffIndex!=-1) return [i,diffIndex];
    }
    return false;
}

let num = 3;
let arr = [-1, 4, 6, 2];

console.log(fn(num, arr)); // [0, 1]