// 原生repeat
// 'ni'.repeat(3); // 'ninini'
String.prototype.repeatString1=function(n){
    return Array(n).fill(this);
}