# 第四章-流程控制

## 1.代码块的选择执行if

代码块： 一块代码，比函数简单的打包，不需要调用，用大括号括起来

```js
{//代码块，熟人打招呼
    console.log("hello!");
    console.log("nice to meet you!");
}
{//代码块，陌生人打招呼
    console.log("who are you!");
}
```

代码都是有一定完整的功能逻辑的，代码的执行过程中代码会选择性的执行。我们要对流程进行控制,用

```js
let isHappy = true
if(isHappy){
    console.log("hello!");
    console.log("nice to meet you!");
}else{
    console.log("who are you!");
}
//流程控制的时候需要逻辑翻译，如果高兴...否则...
```

其中if后面的括号里必需要添加判断,他的结果返回true/false，可以放判断，变量或者函数，第一个代码块是结果为真所执行的代码，第二个代码是结果为假执行的代码

其中else{}可以不写。如果代码块只有一条语句可以不写大括号，但是不推荐，都写上(使用代码块)，注意格式。

## 2.switch与三目运算

如果某个判断比较复杂，比如数目的多少或者范围，不是简单的真假，用switch  case

```js
let sex = getSex("yinshi");//返回这个人的性别
switch (sex){//对sex判断
    case "男"://如果不满足就寻找下一个case
    	console.log("左转");
    	break;//后续的case不需要进行判断了
    case "女":
    	console.log("右转");
    	break;
    default://以上都不满足的执行
    	console.log("何方妖孽");
}
```

翻译理解。

注意：1.switch只能对具体的值进行精确判断，不能对范围判断(比如考试在多少分段读什么学校)。2.书写格式，可读性，缩进，标点符号。3.判断顺序从上往下

在考虑范围判断的时候还是if_else使用的频率高：但是if_else的代码量很大。还有一个三目运算符能实现同样的效果：

```js
//语法: expression?sentence1:sentence2
//对表达式的express返回的值进行判断，如果为真执行:前面的语句(表达式)，如果为假执行:后面的语句(表达式)，整个表达式返回的结果是执行完成语句(表达式)返回的结果
true?2:3;//2
或者：
let words = test("yinshi")?"good":"not"+"good"
```



## 3.循环的三种写法for/while/do white

计算机的特性之一：能准确无误的完成大量重复性的工作。

在JS代码中我们可以用循环的方式多次执行同一个代码块,循环的方式有三种： 

* for循环: 通常用于控制循环次数的循环方法

```js
for(let i = 0; i < 10; i++){
	console.log(`我是第${i}次执行的`);
}
/*其中，for(A;B;C){
	D;
}
A: 循环开始前的初始化操作
B: 循环的结束条件判断，如果是真，则继续循环，如果是假则退出循环
C: 单次循环完成之后的状态叠加或者改变
D: 可以填写若干条被循环的代码
*/
```

注意：

​	在for循环中最重要的部分是B: 循环结束条件判断，如过不注意会陷入死循环(页面卡死警告)

​	执行顺序： A;B;D;C;B;D;C...其中A执行一次，每次执行开始是判断结束条件，然后是代码块最后是叠加

```js
let i = 5;
for(;i<10;){
    console.log(i);
    i=i+1；
}//合法代码，但是不推荐
```

* while

和for循环的本质是一样的，但是没有循环开始的初始化操作和循环的状态的改变。

```js
while (isNotDeadLine()){
    struggle("一下");
}//如果截至日期还没到，挣扎一下。完事了再来
/*其中 while(A){
	B;
}
A: 每次(包括第一次)循环开始的判断
B: 循环的若干代码
*/
```

注意： while可以转换成for循环

* do while

和 while几乎一模一样，唯一区别是判断和循环交换顺序

```js
do{
    struggle("一下下")
}while(isNotDeadLine())
    //翻译一下：先挣扎一下，再看看还可不可以有时间在挣扎一次，可以就再来
    /*其中 do{
    	B;
    } while(A);
    B: 循环的若干代码
    A: 每次(包括第一次)循环开始的判断
*/
```



## 4.循环的关键字

* continue;

跳出此次循环，此次循环后续的代码不需要执行，下次循环依旧执行

```js
for(let i = 0;i < 5;i++){
    console.log(i);
    if(i==3) continue;
    console.log(i);
}// 0 0 1 1 2 2 3 4 4 
```

 其中：for循环前面可以添加循环名(标签)，通过continue 循环名的方式跳过指定循环体

```js
forA: for(let i = 0;i < 10;i++){
	if(i==3) continue forA;
    forB: for(let j = 0; j < 10;j++){
        if(j==5) continue forB;
        console.log(i,j)
    }
}//i=4不会打印且j=5不会打印
```

* break

和continue类似，但是不是跳过此次循环，而是结束当前循环

```js
for(let i = 0;i < 5;i++){
    console.log(i);
    if(i==3) break;
    console.log(i);
}// 0 0 1 1 2 2 3
```

同continue可以添加循环名(标签)

```js
forA: for(let i = 0;i < 10;i++){
	if(i==3) break forA;
    forB: for(let j = 0; j < 10;j++){
        if(j==5) break forB;
        console.log(i,j)
    }
}//i>=4不会打印且j>=5不会打印
```

