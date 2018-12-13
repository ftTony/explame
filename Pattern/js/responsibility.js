/**
 * 职责链模式是使多个对象都有机会处理请求，从而避免请求的发送者和接受者之间的耦合关系。将这个对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理他为止。 也就是说，请求以后，从第一个对象开始，链中收到请求的对象要么亲自处理它，要么转发给链中的下一个候选者。提交请求的对象并不明确知道哪一个对象将会处理它——也就是该请求有一个隐式的接受者（implicit receiver）。根据运行时刻，任一候选者都可以响应相应的请求，候选者的数目是任意的，你可以在运行时刻决定哪些候选者参与到链中。
 * 
 * 一：职责链模式的最大优点就是解耦了请求必送者和N个接收者之间的复杂关系，由于不知道链中的如个节点可以处理你发现的请求，所以你只需要请求传递给第一个节点即可。
二：使用了职责链模式之后，链中的节点对象可以灵活地拆分重组。增加或者删除一个节点，或者改变节点在链中的位置都是轻而易举的事情。
三：在职责模式还有一个优点，那就是可以手动指定起始节点，请求并不是非得从链中的第一个节点开始传递。
四：职责链模式使得程序中多了一些节点对象，可能在某一次的请求过程中，大部分节点并没有起到实质性的作用，它们的作用仅仅是让请求传递下去，从性能方面考虑，我们要避免过长的职责链带来性能损耗。
五：如果一个节点出错，就会导致整个链条断开。
 */

//场景 demo
//场景：某电商针对已付过定金的用户有优惠政策，在正式购买后，已经支付过 500 元定金的用户会收到 100 元的优惠券，200 元定金的用户可以收到 50 元优惠券，没有支付过定金的用户只能正常购买。

// orderType: 表示订单类型，1：500 元定金用户；2：200 元定金用户；3：普通购买用户
// pay：表示用户是否已经支付定金，true: 已支付；false：未支付
// stock: 表示当前用于普通购买的手机库存数量，已支付过定金的用户不受此限制

// const order = function (orderType, pay, stock) {
//     if (orderType === 1) {
//         if (pay === true) {
//             console.log('500元定金预购，得到100元优惠券');
//         } else {
//             if (stock > 0) {
//                 console.log('普通购买，无优惠券');
//             } else {
//                 console.log('库存不够，无法购买');
//             }
//         }
//     } else if (orderType === 2) {
//         if (pay === true) {
//             console.log('200元定金预购，得到50元优惠券');
//         } else {
//             if (stock > 0) {
//                 console.log('普通购买，无优惠券');
//             } else {
//                 console.log('库存不够，无法购买');
//             }
//         }
//     } else if (orderType === 3) {
//         if (stock > 0) {
//             console.log('普通购买，无优惠券')
//         } else {
//             console.log('库存不够，无法购买')
//         }
//     }
// };

// order(3, true, 500) // 普通购买，无优惠券

//职责改造
const order500 = function (orderType, pay, stock) {
    if (orderType === 1 && pay === true) {
        console.log('500 元定金预购，得到100元优惠券');
    } else {
        order200(orderType, pay, stock);
    }
}

const order200 = function (orderType, pay, stock) {
    if (orderType === 2 && pay === true) {
        console.log('200元定金预购，得到50元优惠券');
    } else {
        orderCommon(orderType, pay, stock);
    }
};

const orderCommon = function () {
    if (orderType === 3 && stock > 0) {
        console.log('普通购买，无优惠券');
    } else {
        console.log('库存不够，无法购买');
    }
};

order500(3, true, 500); //普通购买，无优惠券

//继续优化
const order500 = function (orderType, pay, stock) {
    if (orderType === 1 && pay === true) {
        console.log('500元定金预购，得到100元优惠券');
    } else {
        return 'nextSucess';
    }
};

const order200 = function (orderType, pay, stokc) {
    if (orderType === 2 && pay === true) {
        console.log('200元定金预购，得到50元优惠券');
    } else {
        return 'nextSucess';
    }
};

const orderCommon = function (orderType, pay, stock) {
    if (orderType === 3 && stock > 0) {
        console.log('普通购买，无优惠券');
    } else {
        console.log('库存不够，无法购买');
    }
};

//链路代码
const chain = function (fn) {
    this.fn = fn;
    this.sucessor = null;
};

chain.prototype.setNext = function (sucessor) {
    this.sucessor = sucessor;
}

chain.prototype.init = function () {
    const result = this.fn.apply(this, arguments);
    if (result === 'nextSucess') {
        this.sucessor.init.apply(this.sucessor, arguments);
    }
};

const order500New = new chain(order500);
const order200New = new chain(order200);
const orderCommonNew = new chain(orderCommon);

order500New.setNext(order200New);
order200New.setNext(orderCommonNew);

order500New.init(3, true, 500); //普通购买，无优惠券

//AOP

const order500 = function (orderType, pay, stock) {
    if (orderType === 1 && pay === true) {
        console.log('500元定金预购，得到100元优惠券');
    } else {
        return 'nextSucess';
    }
};

const order200 = function (orderType, pay, stock) {
    if (orderType === 2 && pay === true) {
        console.log('200元定金预购，得到50元优惠券');
    } else {
        return 'nextSucess';
    }
};

const orderCommon = function (orderType, pay, stock) {
    if (orderType === 3 && stock > 0) {
        console.log('普通购买，无优惠券');
    } else {
        console.log('库存不够，无法购买');
    }
};

//链路代码
Function.prototype.after = function (fn) {
    const self = this;
    return function () {
        const result = self.apply(self, arguments);
        if (result === 'nextSucess') {
            return fn.apply(self,arguments);
        }
    };
}

const order=order500.after(order200).after(orderCommon);

order(3,true,500);