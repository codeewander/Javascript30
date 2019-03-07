# [JS30] Day4: Array Cardio Day 1

###### tags: `JS30` `Array`

## 任務摘要
了解操作Array的方法

## 題目內容
1. 篩選出1500~1599年間出生的inventor
2. 輸出含所有inventors姓(last name)和名(first name)的陣列
3. 依據生日先後排序inventors
4. 加總所有inventor在世的時間
5. 依據年齡大小排序所有的inventor（由大至小）
6. 列出wiki中巴黎所有含'de'的路名
7. 依據lastName排序所有people的資料
8. 計算data內每個交通工具的總數量

## JS語法/備註

### 1. filter() 
題目：篩選出1500~1599年間出生的inventor
解法：透過filter()對陣列做篩選，並將結果為true的資料組成陣列回傳

```javascript =
//第一種寫法
const fifteen = inventors.filter(function(inventor) {
    if(inventor.year >= 1500 & inventor.year <= 1600) {
        return true;
    }
});
console.log(fifteen)
//可簡化為
const fifteen2 = inventors.filter(function(inventor) {
    return inventor.year >= 1500 & inventor.year <= 1600 
    });
console.log(fifteen2)

//寫成arrow function
const fifteenˇ = inventors.filter(inventor => (inventor.year >= 1500 & inventor.year <= 1600));
console.log(fifteen3)
```
#### 進一步解析: Array.filter(function(currentValue,index,array), thisValue)
用途：過濾陣列元素
語法：arr.filter(callback[, thisArg])
callback 函式於被調用時可傳入三個參數currentValue(當前元素值), index（當前元素索引值）, array
filter()方法會創建且回傳一個新「陣列」，只要條件符合的就會放入陣列中回傳; 沒有條件符合則會回傳空陣列

參考資料：[Array.prototype.filter()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) @ MDN

### 2. map()
題目：輸出含所有inventors姓(last name)和名(first name)的陣列
解法：透過map()將firstName/lastNam組合陣列

```javascript =
//傳統寫法
const fullNames = inventors.map(function(item){
    return item.first + ' ' + item.last
})

console.table(fullNames);

//寫成Arrow function
const fullNames2 = inventors.map(inventor => `${inventor.first} ${inventor.last}`);
console.table(fullNames2);
```
#### 進一步解析: Array.prototype.map()
用途：迭代舊陣列元素產生新陣列。map()方法會為每個元素呼叫一次call back function，並傳回一個值，這些值會被丟進一個新的陣列，再藉由map方法將該陣列傳回。
語法：array.map( callbackfn [ , thisArg ] )
call back function可以有三個傳入值element(元素值)、index(元素索引值)、array（陣列）

參考資料：[Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) @MDN

### 3. sort()
題目：依據生日先後排序inventors
解法：透過sort()進行排序

```javascript=
const ordered = inventors.sort(function(a, b) {
    return a.year > b.year
});
console.table(ordered);
//利用箭頭函式及三元運算式
const ordered2 = inventors.sort((a, b) => a.year > b.year ? 1 : -1);
console.table(ordered2);
```
####進一步解析：
用途：陣列元素排序
語法：arr.sort([compareFunction])。若沒有設參數，則按照「字符編碼」順序進行排序。

參考資料：[Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) @MDN

### 4. reduce()
題目：加總所有inventor在世的時間
解法：可以使用迴圈加總或用reduce()方法
```javascript=
//使用for迴圈
let totalYears = 0;
for (let i = 0; i < inventors.length; i++) {
    let liveYear = inventors[i].passed - inventors[i].year;
    totalYears += liveYear;
}

//使用reduce()
const totalYears = inventors.reduce((total, inventor) => {
    return total + (inventor.passed - inventor.year);
}, 0);
```
### 進一步解析 Array.prototype.reduce()
語法：arr.reduce(callback[, initialValue])
用途：累加器，最後輸出單一值。reduce()適合用於數個元素的加總、乘積和找最大值。
reduce()的callback函式有4個參數：1. previousValue初始值 2.currentValue陣列中正在處理的元素 3. currentIndex陣列中正在處理元素的索引值 4. array調用reduce()方法的陣列。
initialValue 作為第一次使用callback函式傳給previousValue的值，倘若沒有設定initialValue，會從陣列的index 0開始。

```javascript=
const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

console.log(array1.reduce(reducer));//// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5));//// 5 + 1 + 2 + 3 + 4

```
## 5. sort()
題目：依據年齡大小排序所有的inventor（由大至小）
解法：排序原理同第三題，只是多一段計算年齡的部分

```javascript=
const oldest = inventors.sort(function (a, b) {
    const lastInventor = a.passed - a.year;
    const nextInventor = b.passed - b.year;
    return lastInventor > nextInventor ? -1 : 1;
});
console.table(oldest)
```

## 6. map() + filter() +includes()
題目：列出wiki中巴黎所有含'de'的路名
```jacascript=
const category = document.querySelector('.mw-category');
    const links = Array.from(category.querySelectorAll('a'));
    const de = links
               .map(link => link.textContent)
               .filter(streetName => streetName.includes('de'));
```
Array.from可以將nodeList轉成Array，才能用map()操作(因為map是Array的方法，nodeList無法使用)

### 進一步解析 Array.prototype.includes()
用途：判斷陣列是否有特定值，回傳boolean值
語法：
arr.includes(searchElement)
arr.includes(searchElement, fromIndex)

```javascript=
//判斷陣列是否含2
[1, 2, 3].includes(2);     // true

//第2個參數為index值。判斷index為3的元素是否含3
[1, 2, 3].includes(3, 3);  // false

//若index值為負，搜尋的位置會是陣列長度＋fromIndex值;若值小於0，則搜尋整個陣列
//陣列長度3 + fromIndex -1等於2。判斷index為2的值是否含3
[1, 2, 3].includes(3, -1); // true
//判斷是否含NaN。注意：indexOf()方法無法找NaN
[1, 2, NaN].includes(NaN); // true
```

參考資料：[Array.prototype.includes()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes) @MDN

## 7. sort() + split()
題目：依據lastName排序所有people的資料

```javascript=
const people = ['Beck, Glenn', 'Becker, Carl', 'Beckett, Samuel', 'Beddoes, Mick', 'Beecher, Henry', 'Beethoven, Ludwig', 'Begin, Menachem', 'Belloc, Hilaire', 'Bellow, Saul', 'Benchley, Robert', 'Benenson, Peter', 'Ben-Gurion, David', 'Benjamin, Walter', 'Benn, Tony', 'Bennington, Chester', 'Benson, Leana', 'Bent, Silas', 'Bentsen, Lloyd', 'Berger, Ric', 'Bergman, Ingmar', 'Berio, Luciano', 'Berle, Milton', 'Berlin, Irving', 'Berne, Eric', 'Bernhard, Sandra', 'Berra, Yogi', 'Berry, Halle', 'Berry, Wendell', 'Bethea, Erin', 'Bevan, Aneurin', 'Bevel, Ken', 'Biden, Joseph', 'Bierce, Ambrose', 'Biko, Steve', 'Billings, Josh', 'Biondo, Frank', 'Birrell, Augustine', 'Black Elk', 'Blair, Robert', 'Blair, Tony', 'Blake, William'];

const alpha = people.sort((lastOne, nextOne) => {
    const [aLast, aFirst] = lastOne.split(', ');
    const [bLast, bFirst] = nextOne.split(', ');
    return aLast > bLast ? 1 : -1;
});
```
由於people的資料都是['Beck, Glenn’]的逗點字串，要取得lastName就比需要使用split()切開，並存在陣列[aLast, aFirst]中，接著再進行排序

### 進一步解析 String.prototype.split()
用途：切割字串。原始字串不改變
語法：str.split([separator[, limit]])
```javascript=
//limit為3（限制輸出3組值）
var str="How are you doing today?";
var n=str.split(" ",3);

//分隔每個字符：參數為空值
var str="How are you doing today?";
var n=str.split("");
//輸出：H,o,w, ,a,r,e, ,y,o,u, ,d,o,i,n,g, ,t,o,d,a,y,?
```
參考資料：[String.prototype.split()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)@MDN

## 8. reduce()
題目：計算data內每個交通工具的總數量
```javascript=
const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck', 'pogostick'];

    const transportation = data.reduce(function (obj, item) {
      if (!obj[item]) {
        obj[item] = 0;
      }
      obj[item]++;
      return obj;
    }, {});
```
設置一個object用來存每一類的數量，callback的第二個參數是當前處理的元素。若obj[item]不存在，則將其值初始化為0，否則則將值加1，最後回傳object。
有一點需要注意的reduce（）方法的第二個參數要設定初始值，由於此方法創建了一個自定義的object，因此初始值要設空物件{}。