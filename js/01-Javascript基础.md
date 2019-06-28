# 第一章 JavaScript基础

## 1. JavaScript历史

背景： 互联网发展初期，不存在客户端处理程序，但是网页变得更加复杂功能更加丰富，需要处理的事情越来越多，如果任何处理逻辑都放到后端，效率低下（带宽，服务器负担）。Netscape(网景)的Brendan Eich(布兰登·艾奇)在1995年5月被公司要求做一个“看上去和Java相似，但是比java简单的网页脚本语言”，他本身对Java不感兴趣，花了10天设计了JavaScript满足了公司要求。其设计思想：1.C语言语法；2.Java数据类型于内存管理 3.函数第一等公民 4.基于原型(prototype). 语言本身设计之初出现了很多问题，后来不断完善好了。

ES1-5,ES6-9分水岭，我们就处在这个分水岭时期

## 2. 为什么使用JavaScript

因为他是主流。。。客户端验证减少请求、减少带宽、减少服务器压力、操作简单、学习成本低、浏览器界一统江湖(但是兼容支持有些微不同)、基于宿主环境，（客户端）不能操控计算机本地文件，安全。

## 3. JavaScript写在哪？

在html文件中存放在<script type='text/javascript'></script>标签中

```HTML
<script type='text/javascript'>
	alert('Hello World!');
    //在此之中不允许写<\/script>,要转义<\/script>
</script>
```

此标签可以在页面任意位置，但是通常放到body结束标签前面(执行顺序)

```html
<script type='text/javascript' src='...'></script>
```

如果是引入外部JS通常写到head里面不过现在还是写到body结束标签前面(还是因为结束标签的原因)

## 4. 理解变量

就是一个容器(不是盒子，更多得是表义，容器得名称和容器装得东西)

变量的作用： 一个自己定义并且程序能看懂的英文单词

变量的特点： 1. 可以保存任意值(默认是undefined) 2. 弱类型，没有类型的区分，爱写啥写啥 3. 使用之前需要声明，让浏览器识别这是变量

## 5. 获取标签节点

JS对页面元素进行操作，需要获取元素，类似于CSS选择器，css选择器是一种匹配规则，但是JS获取元素是真正拿到了元素(在页面的引用)。

```JS
document.getElementById("box");//返回ID名叫做box的元素
```

其中返回的元素可以直接操作，比如修改类名，但是为了方便控制需要存储到变量中。即：

```JS
let a = document.getElementById("box");
console.log(a);//打印出来a
```

通常的，获取标签的方法有很多(html5以前)

```JS
document.getElementById("box");
document.getElementsByClassName("box");//返回类名叫box的元素的·集合·
document.getElementsByTagName("li");//返回标签名叫li的元素的·集合·
document.getElementsByName("box");//返回name名叫box的元素的·集合·
```

注意大小写，理解是否有s，当找不到的时候会返回null，理解为啥都没有

其中注意获取标签节点的document，它是文档对象模型DOM，可以替换成任何标签节点。

新加

```js
document.querySelector(".box");//用CSS的选择器选择方式返回满足条件的第一个元素
document.querySelectorAll(".box li");//用CSS的选择器选择方式返回满足条件的所有的元素集合
```

```js
document.documentElement;//返回html元素
document.title；//返回页面标题
document.body;//返回body元素
//...等等，不一而足，并且可以用上面的方法选中
```

## 6. 声明关键字(声明变量)

当我们使用变量的时候需要告诉浏览器我要使用一个词语指代这个变量，可以是中文(了解，不推荐)，最好是有意义的英文字母，类似于给元素起名字(类比class，id)，在当前（页面的）环境生效，通常有三种,写法： 

```js
var a;
let b;
const c;
```

### var

	声明变量，以前常用，在ES6之前是唯一的声明方式，存在缺点于不足，变量提升。(不推荐)

### let

	ES6新出，声明变量方式，非常好用，几乎没有缺点(推荐)

### const

	ES新出，声明常量，不能修改它的值(推荐)。常量名推荐全大写，比如： const NAME;

可以一次性声明多个变量，用英文逗号分隔。比如： var a,b,c;或者let x,y,z;

可以在声明的过程中赋值。

大小写敏感

变量命名规范： 变量采用驼峰命名法： oBox, aList

常量命名规范： 常量采用全字母大写加下划线拼接： MAX_NUMBER, FIRST_LINE

## 7. 外部JS的加载与延迟加载

外部JS的引入方式和link引入外部css相似，但是要用script标签和结束标签

```html
<script type='text/javascript' src='path'></script>
```

此时JS标签的位置决定了JS代码的加载顺序。浏览器是从上到下依次执行的

当页面读取到script标签的时候，会阻塞进程，立刻请求读取内容，执行代码，所以可能存在页面元素还没有构造的可能。通常情况下JS的代码需要延迟到页面的元素加载完全后执行。

方法1： 添加defer属性，不阻塞进程，延迟到页面加载完成执行

```html
<script type='text/javascript' src='path' defer></script>
```

方法2： 添加async属性，不阻塞进程，加载完成立即执行(不推荐)

```html
<script type='text/javascript' src='path' async></script>
```

## 8. 事件绑定window.onload和元素点击事件document.onclick

页面中无时不刻都在发生各种事件，比如页面加载完成这件事，图片加载完成这件事，初恋这件事(逃)，鼠标点击，移动，键盘按下等等各种事情。那在这些事情发生的时候我们就可以乘机进行一些操作。比如点击之后让页面弹出‘讨厌别点我’.... 

为了解决javascript执行的时候可能页面还没有加载的问题，我们有如下操作:

```js
window.onload = function(){console.log("页面已经加载完了")}；
```

尝试翻译下： 浏览器加载完成之后执行一个操作，在控制台打印“页面已经加载完成了”

上面的翻译是错的，正确的翻译是：

翻译成中文就是，浏览器加载完成这个事件上绑定了一个操作，在控制太打印“页面已经加载完成了”。

页面获取到的元素可以绑定点击事件。

```js
let box = document.getElementById("box");
box.onclick = function(){
    console.log("box正在被点击中");
}
```

所以等号是什么呢。

## 9. 等号操作符

	赋值操作，将等号右边的值复制给等号的左边的变量

```js
let a,b = 3;//声明变量a，b并且b赋值为3，
a = b;
```

	在以上代码中,等号左边查询容器a，等号右边找到容器b的值(或者内容)，将b的值直接放到a容器中，a容器原先的内容将消失。

## 10. JS修改样式

通过 .style的方式访问css样式表

​	可以通过 .cssText修改原本的样式，也可以通过.style.color这种来修改

```js
let box = document.getElementById("box");
box.style.cssText = "background-color: red;color: blue";
//或者
box.style.backgroundColor = "red";
box.style.color = "blue";
```

注意第二种写法要用**驼峰命名法**：

​	带减号连字符的注意去掉减号连字符，第二个单词以及后面的单词首字母大写。

## 11. 修改标签内的内容

通过 .innerHTML或者innerText

innerHTML: 支持标签

innerText： 不支持标签

可支持读取和修改

```js
let box = document.getElementById("box");
console.log(box.innerHTML);//读取
box.innerHTML = box.innerHTML + 1;//修改
```









