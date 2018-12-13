window.onload = function () {
    var Snake = function (width, height, snakeId, speed, isAuto) {
        this.width = width || 20; //创建地图的行跟列数
        this.height = height || 20;
        this.snakeId = snakeId || 'snake'; //创建的表格id
        this.Grid = []; //存放td对象的数组（二维）
        this.snakeGrid = []; //存放蛇的数组
        this.foodGrid = []; //存放食物的数组
        this.derectkey = 39; //按下的方向键
        this.goX = 0; //蛇横向移动的位移
        this.goY = 0; //蛇纵向移动的位移
        this.speed = this.oldSpeed = speed || 10; //蛇移动的速度
        this.stop = true; //控制蛇开始/暂停
        this.snakeTimer = null; //蛇移动主函数的计时器
        this.isAuto = isAuto || false; //是否启用自动模式(不完善)
        this.init();
    }

    Snake.prototype = {
        // 创建二维数组
        multiArray: function (m, n) {
            var array = new Array(m);
            for (var i = 0; i < m; i++) {
                array[i] = new Array(n);
            }
            return array;
        },
        // 给函数绑定作用域(修正this)
        bind: function (fn, context) {
            return function () {
                return fn.apply(context, arguments);
            }
        },
        // 返回随机点
        randomPoint: function (initX, initY, endX, endY) {
            var initx = initX || 0;
            var inity = initY || 0;
            var endx = endX || (this.width - 1);
            var endy = endY || (this.height - 1);
            var p = [];
            p[0] = Math.floor(Math.random() * (endx - initx)) + initx;
            p[1] = Math.floor(Math.random() * (endy - inity)) + inity;
            return p;
        },
        /**
         * 判断点是否在蛇身的任一位置，pos:从身上哪个位置开始判断
         */
        pointInSnake: function (point, pos) {
            var snakeGrid = this.snakeGrid;
            if (point instanceof Array) {
                var i = pos || 0;
                for (i; i < snakeGrid.length; i++) {
                    if (point[0] == snakeGrid[i][0] && point[1] == snakeGrid[i][1]) {
                        return true;
                    }
                }
            }
            return false;
        },
        isWall: function (point) {
            if (point instanceof Array) {
                if (point[0] < 0 || point[0] > this.width - 1 || point[1] < 0 || point[1] > this.height - 1) {
                    return true;
                }
            }
            return false;
        },
        /**
         * 计算分数（以蛇长度5为分支，如果长12
         */
        getScore: function () {
            var length = this.snakeGrid.length;
            var score = 0;
            var i = parseInt(length / 5);
            if (i == 0) {
                score = length;
            } else {
                i = i > 4 ? 4 : i; //若蛇长超过20则临界分值为4
                var j = i;
                while (j > 0) {
                    score += 5 * j;
                    j--;
                }
                score += (length - 5 * i) * (i + 1); //最大分值为临界分值+1
            }
            return score;
        },
        /**
         * 
         */
        createGrid: function () {
            var table = document.createElement('table');
            var tbody = document.createElement('tbody');
            for (var i = 0; i < this.width; i++) {
                var tr = document.createElement('tr');
                for (var j = 0; j < this.height; j++) {
                    var td = document.createElement('td');
                    this.Grid[i][j] = tr.appendChild(td);
                }
                tbody.appendChild(tr);
            }
            table.appendChild(tbody);
            table.id = this.snakeId;
            document.body.appendChild(table);
        },
        /**
         * 
         */
        painSnake: function () {
            var snakeGrid = this.snakeGrid;
            for (var i = 0; i < snakeGrid.length; i++) {
                var snake_temp1 = snakeGrid[i][0],
                    snake_temp2 = snakeGrid[i][1];
                this.Grid[snake_temp1][snake_temp2].className = 'snake';
            }
        },
        //初始化蛇的初始位置
        initSnake: function () {
            this.snakeGrid = [];
            this.snakeGrid.push([1, 3]);
            this.snakeGrid.push([1, 2]);
            this.snakeGrid.push([1, 1]);
            //设置蛇的背景色
            this.painSnake();
            // 设置蛇头的背景色
            this.Grid[this.snakeGrid[0][0]][this.snakeGrid[0][1]].className = 'snake_head';
        },
        /**
         * 食物
         */
        initfood: function () {
            this.foodGrid = this.randomPoint();
            //此处判断随机食物的位置是否就在蛇身位置，如果是的话重新产生食物
            if (this.pointInSnake(this.foodGrid)) {
                this.initfood();
                return false;
            }
            this.Grid[this.foodGrid[0]][this.foodGrid[1]].className = 'food';
        },
        keyDown: function (e) {
            var e = e || window.event;
            var keycode = e ? e.keyCode : 0;
            if (keycode == 116) {
                window.location.reload();
            } //按下F5键，刷新页面
            if (keycode == 32) {
                if (this.stop) {
                    this.move();
                    this.stop = false;
                } else {
                    if (this.snakeTimer) {
                        clearInterval(this.snakeTimer);
                    }
                    this.stop = true;
                }
            }
            if (keycode >= 37 && keycode <= 40) {
                if (!this.stop) {
                    this.derectkey = keycode;
                }
            }
            return false;
        },
        controller: function () {
            var head_x = this.snakeGrid[0][0],
                head_y = this.snakeGrid[0][1],
                food_x = this.foodGrid[0],
                food_y = this.foodGrid[1];
            if (head_x < food_y) {
                if (!this.pointInSnake([head_x + 1, head_y]) && this.derectkey != 38 && (head_x + 1) < this.width) {
                    this.derectkey = 40;
                } else if (!this.pointInSnake(head_x, head_y + 1) && this.derectkey != 37 && (head_y + 1) < this.height) {
                    this.derectkey = 39;
                } else if (!this.pointInSnake([head_x - 1, head_y]) && this.derectkey != 40 && (head_x - 1) >= 0) {
                    this.derectkey = 38;
                } else {
                    this.derectkey = 37;
                }
            } else if (head_x > food_x) {
                if (!this.pointInSnake([head_x - 1, head_y]) && this.derectkey != 40 && (head_x - 1) >= 0) {
                    this.derectkey = 38;
                } else if (!this.pointInSnake([head_x, head_y + 1]) && this.derectkey != 37 && (head_x - 1) >= 0) {
                    this.derectkey = 39;
                } else if (!this.pointInSnake[head_x + 1, head_y] && this.derectkey != 38 && (head_x + 1) < this.width) {
                    this.derectkey = 40;
                } else {
                    this.derectkey = 37;
                }
            } else if (head_y < food_y) {
                if (!this.pointInSnake([head_x, head_y + 1]) && this.derectkey != 37 && (head_y + 1) < this.height) {
                    this.derectkey = 39;
                } else if (!this.pointInSnake([head_x + 1, head_y]) && this.derectkey != 38 && (head_x + 1) < this.width) {
                    this.derectkey = 40;
                } else if (!this.pointInSnake([head_x - 1, head_y]) && this.derectkey != 40 && (head_x - 1) >= 0) {
                    this.derectkey = 38;
                } else {
                    this.derectkey = 37;
                }
            } else if (head_y > food_y) {
                if (!this.pointInSnake([head_x, head_y - 1]) && this.derectkey != 39 && (head_y - 1) >= 0) {
                    this.derectkey = 37;
                } else if (!this.pointInSnake([head_x + 1, head_y]) && this.derectkey != 38 && (head_x + 1) < this.width) {
                    this.derectkey = 40;
                } else if (!this.pointInSnake([head_x - 1, head_y]) && this.derectkey != 40 && (head_x - 1) >= 0) {
                    this.derectkey = 38;
                } else {
                    this.derectkey = 39;
                }
            }
        },
        main: function () {
            var headx = this.snakeGrid[0][0],
                heady = this.snakeGrid[0][1],
                temp = this.snakeGrid[this.snakeGrid.length - 1],
                isEnd = false,
                msg = '';
            // 根据方向键的控制确定方向
            switch (this.derectkey) {
                //左键
                case 37:
                    if (this.goY != 1) {
                        this.goY = -1;
                        this.goX = 0
                    }
                    break;
                case 38:
                    if (this.goX != 1) {
                        this.goX = -1;
                        this.goY = 0
                    }
                    break;
                case 39:
                    if (this.goY != -1) {
                        this.goY = 1;
                        this.goX = 0
                    }
                    break;
                    //右键
                case 40:
                    if (this.goX != -1) {
                        this.goX = 1;
                        this.goY = 0;
                    }
            }
            headx += this.goX;
            heady += this.goY;
            // 判断是否吃到食物
            if (headx == this.foodGrid[0] && heady == this.foodGrid[1]) {
                this.snakeGrid.unshift(this.foodGrid); //将食物插入到蛇头位置
                this.initfood();
                if (this.snakeGrid.length > 4) {
                    if (this.snakeGrid.length == 5) {
                        this.speed += 5;
                    } else if (this.snakeGrid.length == 10) {
                        this.speed += 3;
                    } else if (this.snakeGrid.length == 20) {
                        this.speed += 3;
                    } else if (this.snakeGrid.length == 30) {
                        this.speed += 3;
                    }
                    this.move();
                }
            } else {
                for (var i = this.snakeGrid.length - 1; i > 0; i--) {
                    this.snakeGrid[i] = this.snakeGrid[i - 1];
                }
                this.snakeGrid[0] = [headx, heady];
                if (this.pointInSnake(this.snakeGrid[0], 1)) {
                    isEnd = true;
                    msg = 'SB，吃到自己啦';
                    //判断是否撞墙
                } else if (this.isWall(this.snakeGrid[0])) {
                    isEnd = true;
                    msg = '擦，撞墙了！！';
                }
                //判断游戏是否结束
                if (isEnd) {
                    if (this.snakeTimer) {
                        clearInterval(this.snakeTimer)
                    }
                    var score = this.getScore();
                    if (confirm(msg + '你的分数是：' + score + '!是否重新开始？')) {
                        this.reset();
                    }
                    return false;
                }
                this.Grid[temp[0]][temp[1]].className = 'notsnake';
            }
            this.painSnake();
            this.Grid[headx][heady].className = 'snake_head';
            // 自动控制方向
            if (this.isAuto) {
                this.controller();
                document.onkeydown = null;
            }
        },
        move: function () {
            var _this = this;
            if (_this.snakeTimer) {
                clearInterval(_this.snakeTimer);
            }
            _this.snakeTimer = setInterval(_this.bind(_this.main,_this),Math.floor(3000/this.speed));
        },
        reset: function () {
            this.derectkey = 39;
            this.goX = 0;
            this.goY = 0;
            this.speed = this.oldSpeed;
            this.stop = true;
            this.init();
        },
        init: function () {
            var _this = this,
                snake_id = document.getElementById(_this.snake_id) || 0;
            if (snake_id) {
                document.body.removeChild(snake_id);
            }
            _this.Grid = _this.multiArray(_this.width, _this.height);
            _this.createGrid();
            _this.initSnake();
            _this.initfood();
            document.onkeydown = _this.bind(_this.keyDown, _this); //绑定键盘事件
        }
    };
    new Snake(20, 20, 'eatSnake', 10, false);
}