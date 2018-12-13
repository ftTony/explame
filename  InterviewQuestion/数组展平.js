// 将[[1, 2], 3, [[[4], 5]]] 展平为 [1, 2, 3, 4, 5]

var arr = [[1, 2], 3, [[[4], 5]]]; // 数组展平

function flatten(arr){
    return [].concat(...arr.map(x=>Array.isArray(x)?flatten(x):x));
}