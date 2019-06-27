# 第十八章 Proxy 数据结构代理

我们的对象没有安全可言，很多操作都可以直接修改，为了保护**我们的对象**，给对象添加了一层**中间件**，我们通过中间件的操作，间接操作实际对象，从而我们可以通过带的让我们操作对象的变成安全操作（过滤不合法操作）。

Proxy就是这样的功能。可以监视拦截直接的代码操作。简称为“代理器”。

```js
var obj = new Proxy({},{
    get: function(target, key, receiver){
        console.log(`正在获取${key}的值`)
        return Reflect.get(target, key, receiver)
    },
    set: function(target, key, value, reciever){
        console.log(`正在设置${key}为${value}`)
        return Reflect.set(target, key, value, reciever)
    }
})
obj.num
// "正在获取num的值" undefined
obj.num = 3
// "正在设置num为3" 3
```

这个和我们之前学的Object.defineProperty非常相似。可以对获取属性值和改变属性值做出响应。换句话说对点操作符进行了扩展。并且方法更好用。

ES6原生的Proxy构造函数生成Proxy实例，返回的实例就是加了拦截器的实例

```js
let proxy = new Proxy(target, handler)
```

Proxy对象的handler是一个对象，描述了拦截方式。new Proxy()生成了一个 Proxy的实例，target是拦截操作的目标对象。

```js
let proxy = new Proxy({},{
    get: function(){
        return "123"
    }
})
proxy.age//"123"
proxy.name//"123"
```

如果不设置handler等同于直接通向原对象

```js
let tar = {},
    handler = {}
let proxy = new Proxy(tar,handler)
proxy.a = 3
tar.a//3
tar.b = 3
proxy.b//3
```

此时没有任何拦截效果。

**拦截效果： 13种**

* **get(target, propKey, receiver)** 对读取属性的时候设置操作。proxy["a"]或proxy.a都触发
* **set(target, propKey, value, receiver)** 设置属性值的时候会触发的操作。proxy["a"]或proxy.a处于等号操作符左边的时候，返回一个布尔值。
* **has(target, propKey)**  当使用in操作符查询属性是否属于对象存在的时候返回true或者false 
* **deleteProperty(target, propKey)** 当我们删除属性delete target[prorKey]的时候执行的操作。返回一个布尔值
* **ownKeys(target)**：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而`Object.keys()`的返回结果仅包括目标对象自身的可遍历属性。
* **defineProperty(target, propKey, propDesc)**：拦截`Object.defineProperty(proxy, propKey, propDesc）`、`Object.defineProperties(proxy, propDescs)`，返回一个布尔值。
* **preventExtensions(target)**：拦截`Object.preventExtensions(proxy)`，返回一个布尔值。
* **getPrototypeOf(target)**：拦截`Object.getPrototypeOf(proxy)`，返回一个对象。
* **isExtensible(target)**：拦截`Object.isExtensible(proxy)`，返回一个布尔值。
* **setPrototypeOf(target, proto)**：拦截`Object.setPrototypeOf(proxy, proto)`，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
* **apply(target, object, args)**：拦截 Proxy 实例作为函数调用的操作，比如`proxy(...args)`、`proxy.call(object, ...args)`、`proxy.apply(...)`。
* **construct(target, args)**：拦截 Proxy 实例作为构造函数调用的操作，比如`new proxy(...args)`。

## 可取消代理的Proxy实例Proxy.revocable

```js
let target = {},
    handler = {}
let {proxy, revoke} = Proxy.revocalble(target, handler)
proxy.age = 18
proxy.x//18
revoke()
proxy.x//报错
```

返回一个对象，有两个参数，第一个是Proxy的实例对象，第二个是一个函数，函数执行取消Proxy实例。当执行取消函数后，再次访问实例对象就会报错。

可以用于：目标对象不允许直接访问，必须通代理访问，访问结束之后收回代理访问全。不允许再次访问。

## this的问题

虽然 Proxy 可以代理针对目标对象的访问，但它不是目标对象的透明代理，即不做任何拦截的情况下，也无法保证与目标对象的行为一致。主要原因就是在 Proxy 代理的情况下，目标对象内部的`this`关键字会指向 Proxy 代理。

```js
const target = {
  m: function () {
    console.log(this === proxy);
  }
};
const handler = {};

const proxy = new Proxy(target, handler);

target.m() // false
proxy.m()  // true
//一旦proxy代理target.m，后者内部的this就是指向proxy，而不是target。 
```

## 与Reflect的关系

在Proxy中定义了处理拦截的方法。那么这些方法可以在Reflect上找到。我们可以通过使用Reflect相同的方法去使用方法。

```js
let obj = {}
let proxy = new Proxy(obj, {
    get: function(tar, key, reciever){
        console.log("proxy获取监听")
        return tar[key]
    },
    set: function(tar, key, value, reciever){
        tar[key] = value
        console.log("proxy修改监听")
        return true
    }
})
proxy.x = 3//"proxy修改监听" 3
Reflect.get(proxy, "x")//"proxy获取监听" 3
```

Reflect对象与Proxy对象一样，也是 ES6 为了操作对象而提供的新 API。

1. 将`Object`对象的一些明显属于语言内部的方法（比如`Object.defineProperty`），放到`Reflect`对象上。现阶段，某些方法同时在`Object`和`Reflect`对象上部署，未来的新方法将只部署在`Reflect`对象上。

2. 修改某些`Object`方法的返回结果，让其变得更合理。

   比如，`Object.defineProperty(obj, name, desc)`在无法定义属性时，会抛出一个错误，而`Reflect.defineProperty(obj, name, desc)`则会返回`false`。

3. 让`Object`操作都变成函数行为。某些`Object`操作是命令式，比如`name in obj`和`delete obj[name]`，而`Reflect.has(obj, name)`和`Reflect.deleteProperty(obj, name)`让它们变成了函数行为。

4. `Reflect`对象的方法与`Proxy`对象的方法一一对应，只要是`Proxy`对象的方法，就能在`Reflect`对象上找到对应的方法。这就让`Proxy`对象可以方便地调用对应的`Reflect`方法，完成默认行为，作为修改行为的基础。也就是说，不管`Proxy`怎么修改默认行为，你总可以在`Reflect`上获取默认行为。