### 1. 游戏介绍

#### 1.1 游戏效果

[预览地址](https://fttony.github.io/explame/floors/)

运行项目

>进入项目运行npm install——>npm run dev

##### 主界面

<img width="280" alt="floors-01" src="https://user-images.githubusercontent.com/6395813/50571776-d85e9c00-0ded-11e9-9ebc-0b9f3e4035f7.png">
##### 游戏界面

<img width="280" alt="floors-02" src="https://user-images.githubusercontent.com/6395813/50571780-e9a7a880-0ded-11e9-908f-22990ad46e01.png">
##### 游戏结束界面

<img width="279" alt="floors-03" src="https://user-images.githubusercontent.com/6395813/50571782-f1674d00-0ded-11e9-902f-440bfa235fa4.png">

- 游戏介绍

使用方向键左右控制小人，要防止被托上去挤死，掉下去摔死、被钉板（尖刀）戳死。

板子分类：正常板、翻板、跳板、传送带、钉子板

除钉子板之外，其它板子均可以增加分数，如果掉到钉子、人物撞到顶部板、人物向下坠落都会减血。

### 2. 程序设计思路

#### 2.1 程序默认数据

板子默认数据

```
var floorRate=[{
            name: 'normal',
            rate: 15,
        },
        {
            name: 'spring',
            rate: 15
        },
        {
            name: 'weak',
            rate: 15
        },
        {
            name: 'scroll-left',
            rate: 10
        },
        {
            name: 'scroll-right',
            rate: 10
        },
        {
            name: 'nail',
            rate: 35
        }
    ];

```


#### 2.2 随机产生板子

随机产生板子，这里有两个随机数据，第一个是随机产生的板子类型，第二个是随机产生板子的位置。

**随机产生板子左右位置**

`偏移左边位置=(屏目宽度-板子宽度)*Math.random()`

具体代码：

```
_left = Math.random() * (this.canvasWidth - this.floorWidth);
```

**随机产生板子类型**

先随机产生0~100的数，再根据预先定义好每个板子类型权重加总并存入数组中，再判断产生的随机数是否在数组范围中。

代码：

```

var rangeArray
function getRandowFloor(rangeArray){
    var dice = Math.random() * 100;
        for (var i = 0; i < rangeArray.length - 1; i++) {
            if (dice >= rangeArray[i] && dice < rangeArray[i + 1]) {
                return this.floorRate[i];
            }
        }
}
```

整个代码：

```
function createFloorSpan() {
    var _top = this._floorScrollerY += this.floorDeltaY,
        _left = Math.random() * (this.canvasWidth - this.floorWidth);
    var floorConfig = this.getRandowFloor(this._floorRateArray);
    var floorElement = '<i class="floor ' + floorConfig.name + '"></i>';

    $(floorElement).css({
        top: _top,
        left: _left,
        width: this.floorWidth,
        height: this.floorHeight
    }).appendTo(this.$scroller);
    }
```
#### 2.3 更新卷轴位置

通过css3的transform和translate3d来变化卷轴的位置，变化的速度等于speed/频率

具体代码

```
var _deltaY=this.speed / fps;
var _currentScrollerY -= _deltaY;
this.$scroller.css({
    '-webkit-transform': 'translate3d(0, ' + _currentScrollerY + 'px, 0)',
    '-ms-transform': 'translate3d(0, ' + _currentScrollerY + 'px, 0)',
    'transform': 'translate3d(0, ' + _currentScrollerY + 'px, 0)',
  });
```

#### 2.4 更新人物视图

初始化时，人物在屏目最顶端中间，如不操作人物自由下落，自由下落的速度计算方式分为纵向跟横向，横向计算方式=人物横向移动速度/濒率；纵向计算方式= `速度 * 每帧消耗时间 + 重力加速度 * 每帧耗时间平方 / 2` 随着时间越长，速度越快

具体代码：

```
 var _deltaPeopleY = this._v0 * dt + this.gravity * (dt) * (dt) / 2;
//更新时间 t=t+dt;
this._t += dt;
// 更新速度 v=at
this._v0 = this.gravity * this._t;
//卷轴纵向每帧移动距离
var _deltaY = this.speed / fps;
//人物横向每帧移动距离
var _deltaPeopleVertical = this.peopleVerticalSpeed / fps;
this.$people.css({
'-webkit-transform': 'transform3d(' + this._currentPeopleVertical + 'px,' + this._currentPeopleY + 'px,0)',
'-ms-transform': 'transform3d(' + this._currentPeopleVertical + 'px,' + this._currentPeopleY + 'px,0)',
'transform': 'transform3d(' + this._currentPeopleVertical + 'px,' + this._currentPeopleY + 'px,0)'
});
        
```
