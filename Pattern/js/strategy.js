/**
 * 策略模式指的是定义一些列的算法，把他们一个个封装起来，目的就是将算法的使用与算法的实现分离开来。说白了就是以前要很多判断的写法，现在把判断里面的内容抽离开来，变成一个个的个体
 */

function vipPrice() {
    this.discount = 0.5;
}

vipPrice.prototype.getPrice = function (price) {
    return price * this.discount;
}

//老客户
function oldPrice() {
    this.discount = 0.3;
}

oldPrice.prototype.getPrice = function (price) {
    return price * this.discount;
}

//对于普通客户
function Price() {
    this.discount = 1;
}

Price.prototype.getPrice = function (price) {
    return price;
}

// 上下文，对于客户端的使用
function Context() {
    this.name = '';
    this.stratey = null;
    this.price = 0;
}

Context.prototype.set = function (name, strategy, price) {
    this.name = name;
    this.strategy = strategy;
    this.price = price;
}

Context.prototype.getResult = function () {
    console.log(this.name + ' 的结账为：' + this.strategy.getPrice(this.price));
};

var context = new Context();
var vip = new vipPrice();
context.set('vip客户', vip, 200);
context.getResult();

var old = new oldPrice();
context.set('老客户', old, 200);
context.getResult();

var Price = new Price();
context.set('普通客户', Price, 200);
context.getResult();

//通过策略模式，使得客户的折扣与算法解藕，又使得个性跟扩展独立的进行，不影响到客户端或其他算法的使用

/**
 * 使用场景：策略模式最实用的场合就是某个“类”中包含有大量的条件性语句，比如if...else或者switch。每一个条件分支都会引起该“类”的特定行为以不同的方式作出改变。以其维
护一段庞大的条件性语句，不如将每一个行为划分为多个独立的对象。每一个对象被称为一个策略。设置多个这种策略对象，可以改进我们的代码质量，也更好的进行单元测试。
 */