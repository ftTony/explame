// 斐波那契数列从第三项开始，每一项都等于前两项之和。指的是这样一个数列：0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144 …

// 递归

/* function fib(fn){
    if(n===1||n===2) return n-1;
    return fib(n-1)+fib(n-2);
} */

// 非递归

function fib(n) {
    var val = [];
    if (n === 1 || n === 2) {
        return 1;
    } else {
        for (let i = 3; i < n; i++) {
            val[i] = val[i - 1] + val[i - 2];
        }
        return val[n - 1];
    }
}