  /*
        //观察者模式（Observer）

        观察者模式：一个对象（称为subject）维持一系列依赖于它的对象（称为observer），将有关状态的任何变更自动通知给它们（观察者）。


        function Subject() {
            this.observers = [];
        }

        Subject.prototype = {
            add: function (observer) {
                this.observers.push(observer);
            },
            remove: function (observer) {
                var observers = this.observers;
                for (var i = 0; i < observers.length; i++) {
                    if (observers[i] === observer) {
                        observers.splice(i, 1);
                    }
                }
            },
            notify: function () { //通知
                var observers = this.observers;
                for (var i = 0; i < observers.length; i++) {
                    observers[i].update();
                }
            }
        };

        function Observer(name) {
            this.name = name;
        }

        Observer.prototype = {
            update: function () { //更新
                console.log('my name is ' + this.name);
            }
        };

        var sub = new Subject();
        var obs1 = new Observer('ttsy1');
        var obs2 = new Observer('ttsy2');
        sub.add(obs1);
        sub.add(obs2);
        sub.notify();
    */

  /**
      发布/订阅模式：基于一个主题/事件通道，希望接收通知的对象（称为subscriber）通过自定义事件订阅主题，被激活事件的对象（称为publisher）通过发布主题事件的方式被通知。
  */

  /**
  *  两种模式之间的差异

      Observer模式要求观察者必须订阅内容改变的事件，定义了一个一对多的依赖关系；
      Publish/Subscribe模式使用一个主题/事件通道，这个通道介于订阅着与发布者之间；
      观察者模式里面观察者【被迫】执行内容改变事件（subject内容事件）；发布/订阅模式中订阅着可以自定义事件处理程序
      观察者模式两个对象之间有很强的依赖关系；发布/订阅模式两个对象之间的耦合读底。

  参考资料：https://juejin.im/post/5af05d406fb9a07a9e4d2799
  */
  let pubSub = {
      list: {},
      subscribe: function (key, fn) { //订阅
          if (!this.list[key]) {
              this.list[key] = [];
          }
          this.list[key].push(fn);
      },
      publish: function () { //发布
          let arg = arguments;
          let key = [].shift.call(arg);
          let fns = this.list[key];

          if (!fns || fns.length <= 0) return false;

          for (var i = 0, len = fns.length; i < len; i++) {
              fns[i].apply(this, arg);
          }
      },
      unSubscribe(key) { //取消订阅
          delete this.list[key];
      }
  };

  pubSub.subscribe('name', (name) => {
      console.log('your name is ' + name);
  });

  pubSub.subscribe('sex', (sex) => {
      console.log('your sex is ' + sex);
  });

  pubSub.publish('name', 'ttsy1');
  pubSub.publish('sex', 'male');