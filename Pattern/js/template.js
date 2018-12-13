/**
 * 概念：定义了一个操作中的算法的骨架，而将一些步骤延迟到子类中。模板方法使得子类可以不改变一个算法的结构即可重定义该算法的某些特定步骤。
 * 通俗的讲，就是将一些公共方法封装到父类，子类可以继承这个父类，并且可以在子类中重写父类的方法，从而实现自己的业务逻辑。
 * 
 * 本质
 * 固定算法骨架
 * 
 * 在一个方法中定义一个算法的骨架，而将一些步骤延迟到子类中。模板方法使得子类可以在不改变算法结构的情况下，重新定义算法中的某些步骤。
 * 
 * 功能：
 * 模板方法模式的功能在于固定算法骨架，而让具体算法实现可扩展。
 * 模板方法还额外提供了一个好处，就是可以控制子类的扩展。因为在父类中定义好了算法的步骤，只是在某几个固定的点才会调用到被子类实现的方法，因此也就只允许在这几个点来扩展功能。这些可以被子类覆盖以扩展功能的方法通常被称为“钩子”方法。
 * 
 * 变与不变
 * 模板类实现的就是不变的方法和算法的骨架，而需要变化的地方，都通过抽象方法，把具体实现延迟到子类中了，而且还通过父类的定义来约束子类的行为，从而使系统能有更好的利用性的扩展性。
 * 
 * 好莱坞法则
 * 作为父类的模板会在需要的时候，调用子类相应的方法，也就是由父类来找子类，而不让子类来找父类
 * 
 * 对设计原则的体现
 * 模板方法很好地体现了武装原则和里氏原则。
 * 首先从设计上分享变与不变，然后把不变的部分抽取出来，定义到父类，比如算法骨架，一些公共的，固定的实现等。这些不变的部分被封闭起来，尽量不去个性它们。想要扩展新的功能，那就是用子类扩展，通过子类来实现可变化的步骤，对于这种新增功能的做法是开放的。
 * 其次，能够实现统一的算法骨架，通过切换不同的具体实现来切换不同的功能，一个根本原因就是里氏替换原则，遵循这个原则，保证所有的子类实现的是同一个算法模板，并能在使用模板的地方，根据需要切换不同的具体实现。
 * 
 * 相关模式
 * 
 * 模板方法模式和工厂方法模式
 * 可以配合用
 * 模板方法模式可以通过工厂方法来获取需要调用的对象。
 * 
 * 模板方法模式和策略模式
 * 两者有些相似，但是有区别
 * 从表面看，两个模式都能实现算法的封装，但是模式方法封装的是算法的骨架，这个算法骨架是不变的，变化的是算法中某些步骤的具体实现；而策略模式是把某个步骤的具体实现算法封装起来，所有封装的算法对象是等价的，可以相互替换。
 * 因此，可以在模板方法中使用策略模式，就是把那些变化的算法步骤通过使用策略模式来实现，但具体选取哪个策略还是要由外部来确定，而整体的算法步骤，也就是算法骨架则由模板方法来定义了。
 * 
 */

/* 
var Interview=function(){};
//笔试
Interview.prototype.writtenTest=function(){
    console.log('这里是前端笔试题');
};
// 技术面试
Interview.prototype.technicalInterview=function(){
    console.log('这里是技术面试');
};
// 领导面试
Interview.prototype.leader=function(){
    console.log('领导面试');
};
//HR面试
Interview.prototype.HR=function(){
    console.log('HR面试');
};
// 等通知
Interview.prototype.waitNotice=function(){
    console.log('等通知呀，不知道过了没哦');
};
//代码初始化
Interview.prototype.init=function(){
    this.writtenTest();
    this.technicalInterview();
    this.leader();
    this.HR();
    this.waitNotice();
};
//阿里巴巴的笔试和技术面不同，重写父类方法，其他继承父类方法。
var AliInterview=function(){};
AliInterview.prototype=new Interview();

// 子类重写方法 实现自己的业务逻辑
AliInterview.prototype.writtenTest=function(){
    console.log('阿里的技术题就是难呀~');
};
AliInterview.prototype.technicalInterview=function(){
    console.log('阿里的技术题就是叨呀');
};
var AliInterview=new AliInterview();
AliInterview.init(); 
*/
(function () {
    //示例代码

    //定义模板方法，原语操作等的抽象类
    function AbstractClass() {

    }

    AbstractClass.prototype = {
        //原语操作1，所谓的原语操作就是抽象的操作，必须要由子类提供实现
        doPrimitiveOperation1: function () {

        },
        // 原语操作2
        doPrimitiveOperation2: function () {

        },
        // 模板方法，定义算法骨架
        templateMethod: function () {
            this.doPrimitiveOperation1();
            this.doPrimitiveOperation2();
        }
    };

    function ConcreteClass() {

    }
    ConcreteClass.prototype = {
        __proto__: AbstractClass.prototype,

        doPrimitiveOperation1: function () {
            //具体的实现
        },
        doPrimitiveOperation2: function () {

        }
    };
}());
(function () {
    //验证人员登录的例子

    // 封装进行登录控制所需要的数据
    function LoginModel() {
        // 登录人员编号
        this.loginId;
        // 登录密码
        this.pwd;
    }

    // 登录控制的模板
    function LoginTemplate() {}
    LoginTemplate.prototype = {
        // 判断登录数据是否正确，也就是是否能登录成功
        login: function (loginModel) {
            var dbLm = this.findLoginUser(loginModel.loginId);

            if (dbLm) {
                // 对密码进行加密
                var encryptPwd = this.encryptPwd(loginModel.pwd);
                // 把加密后的密码设置回到登录数据模型中
                loginModel.pwd = encryptPwd;
                // 判断是否匹配
                return this.match(loginModel, dbLm);
            }
            return false;
        },
        // 根据登录编号来查找和获取存储中相应的数据
        findLoginUser: function (loginId) {},
        // 对密码数据进行加密
        encryptPwd: function () {
            return pwd;
        },
        // 判断用户填写的登录数据和存储中对应的数据是否匹配得上
        match: function (lm, dbLm) {
            return lm.loginId === dbLm.loginId && lm.pwd === dbLm.pwd;
        }
    };

    // 普通用户登录控制的逻辑处理
    function NormalLogin() {}

    NormalLogin.prototype = {
        __proto__: LoginTemplate.prototype,

        findLoginUser: function (loginId) {
            var lm = new LoginModel();
            lm.loginId = loginId;
            lm.pwd = 'testpwd';
            return lm;
        }
    };

    // 工作保山登录控制的逻辑处理
    function WorkerLogin() {}
    WorkerLogin.prototype = {
        __proto__: LoginTemplate.prototype,
        findLoginUser: function (loginId) {
            var lm = new LoginModel();
            lm.loginId = loginId;
            lm.pwd = 'workerpwd';
            return lm;
        },
        encryptPwd: function (pwd) {
            console.log('使用MD5进行密码加密');
            return pwd;
        }
    };
    var lm = new LoginModel();
    lm.loginId = 'admin';
    lm.pwd = 'workerpwd';

    var lt = new WorkerLogin();
    var lt2 = new WorkerLogin();

    var flag = lt.login(lm);
    console.log('可以登录工作平台=' + flag);

    var flag2=lt2.login(lm);
    console.log('可以进行普通人员登录='+flag2);

    function test(){
        var crypto=require('crypto');
        function createHmac(){
            return crypto.createHmac('shal','password');
        }

        // 封装进行登录控制所需要的数据
        function LoginModel(){
            //登录人员编号
            this.loginId;
            //登录密码
            this.pwd;
        }

        //登录控制的模板
        function LoginTemplate(){

        }
        LoginTemplate.prototype={
            // 判断登录数据是否正确，也就是是否能登录成功
            login:function(loginModel){
                var dbLm=this.findLoginUser(loginModel.loginId);
                
            }
        }
    }
}());