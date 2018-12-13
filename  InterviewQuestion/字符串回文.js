//字符串回文判断(回文是指把相同的词汇或句子，在下文中调换位置或颠倒过来，产生首尾回环的情趣，叫做回文，也叫回环。)

function plalindrome(str){
    return str===str.split('').reverse().join('');
}
