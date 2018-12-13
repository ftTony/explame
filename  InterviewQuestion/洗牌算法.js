// 洗牌算法

function shufle(arr) {
    var result = [],
        random;
    while (arr.length > 0) {
        random = Math.floor(Math.random(arr.length));
        result.push(arr[random]);
        arr.splice(random, 1);
    }
    return result;
}