/**
 * 概念：代理模式的中文含义就是帮别人做事，javascript的解释为：把对一个对象的访问，交给另一个代理对象来操作。
 */

 //应用场景：比如图片的懒加载，我们就可以运用这种技术。在图片未加载完成之前，给个loading图片，加载完成后再替换实体路径。

//  参考资料：http://www.cnblogs.com/xianyulaodi/p/5827821.html
var myImage=(function(){
    var imgNode=document.createElement('img');
    document.body.appendChild(imgNode);
    return function(src){
        imgNode.src=src;
    };
})();

//代理模式
var ProxyImage=(function(){
    var img=new Image();
    img.onload=function(){
        myImage(this.src);
    };
    return function(src){
        //占位图片loading
        myImage("http://img.lanrentuku.com/img/allimg/1212/5-121204193Q9-50.gif");
        img.src=src;
    };
})();
//调用方式
ProxyImage("https://img.alicdn.com/tps/i4/TB1b_neLXXXXXcoXFXXc8PZ9XXX-130-200.png"); // 真实要展示的图片