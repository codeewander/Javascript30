# [JS30] Day1: JavaScript Drum Kit

###### tags: `JS30` `audio`

## 任務摘要
透過JS讓鍵盤按下後播放出對應按鍵的聲音，並同時產生特效

## 學習內容
- 用Javascript找到HTML的DOM元素
- 用Javascript為元素增加／移除 class
- Window監聽事件、偵測鍵盤keydown事件、transitionend事件
- HTML的Audio標籤、播放音樂

## 任務步驟拆解
Step1 : 加鍵盤監聽事件：在window上增加鍵盤keydown事件
Step2 : 對應事件的處理函式(抓到keycode、DOM元素)並處理(播放音檔、增加class)
Step3 : 為元素加上transitionend監聽事件
Step4 : 為元素增加/移除class

為了讓練習更好玩一點，我在codepen上找到了純CSS的小怪獸作品，並嘗試用這隻小怪獸的牙齒作為音樂鍵盤，讓牙齒隨著聲音播放而有互動。

### Step1 : Window監聽事件，偵測鍵盤按鍵

window有很多事件屬性，其中包含了鍵盤事件(keyboard events)。下面的語法會將事件監聽器掛在window上，並監測鍵盤按下動作，一有動作便觸發playSound函式。
```javascript=
window.addEventListener('keydown', playSound);
```

### Step2 : 對應事件的處理函式
在playSound函式裡面，首先，先用DOM元素選擇器抓到相對應鍵盤keycode的音樂檔以及牙齒鍵盤，並使用play()方法播放音檔。

```javascript=
function playSound(e){
  //抓到相對應鍵盤keycode的Audio音檔
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  //抓到相對應鍵盤keycode的牙齒鍵盤
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  if(!audio) return; //如果非指定按鍵，則跳出函式
  audio.currentTime = 0;//將播放器設回原點
  audio.play();
  //若按到鍵盤數字6以上，則牙齒加上ear-scale的class; 鍵盤數字5以下則加上playing的class
  if(e.keyCode >= 54){
    key.classList.toggle('ear-scale');
  } else{
    key.classList.toggle('playing');
  }
}
```
上面那段程式碼，解決了幾個難點：
1. 鍵盤連續按時，可以馬上響起連續的聲音
```javascript=
//每次播放音檔之前，將播放時間戳設為0
var audio = document.getElementById("video"); 
audio.currentTime = 0;
audio.play();
```
2. 將鍵盤按鍵和頁面的DOM元素連結起來
連結的幫手是keydown事件中的keycode屬性。在HTML文檔中將DOM元素和Audio標籤都加了屬性data-key來儲存對應的keycode，如此，觸發鍵盤事件後便可以取得keycode屬性並操作相對應的DOM元素和音檔。
```javascript=
const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
```

### Step 3 : 為元素加上transitionend監聽事件
利用transitionend事件，監聽所有含 transition CSS 屬性的牙齒，並且透過 propertyName 來判斷是哪個 css 屬性

```javascript=
const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition))

function removeTransition(e){
  if(e.propertyName !== 'transform') return;
  this.classList.remove('playing')  
  this.classList.remove('ear-scale') 
};
```
值得一提的是，在監聽牙齒時不能多個元素一起監聽，像是：
```javascript=
//多個一起偵聽會出現錯誤
keys .addEventListener('transitionend', removeTransition)
```
### Step 4 : 為元素增加／移除 class

利用 key.classList.add/remove/toggle 來為元素添加／移除／切換 class：

```javascript=
function playSound(){
    ...
    //若按到鍵盤數字6以上，則牙齒加上ear-scale的class; 鍵盤數字5以下則加上playing的class
    if (e.keyCode >= 54) {
        key.classList.toggle('ear-scale');
    } else {
        key.classList.toggle('playing');
    }
}
```

## JS語法學習/備註

### element.classList
```javascript= 
classList.add('aaa', 'bbb', 'ccc'); //新增多個class，如果已經存在/不存在的className則會被忽略
classList.remove('aaa', 'bbb', 'ccc'); //移除多個class，如果已經存在/不存在的className則會被忽略
classList.toggle('aaa', 'bbb', 'ccc'); //存在則刪除class，不存在則新增class
classList.contains('aaa', 'bbb', 'ccc'); // 偵測是否存在多個class，返回true/false
```
參考資料：[Element.classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList) ＠MDN

### 箭頭函式(Arrow Function)
箭頭函式是ES6的新語法，使用方式如下
```javascript = 
//E56之前的寫法
let func1 = function(arg) { console.log('Hi, ' + arg); };
//箭頭函式寫法
let func2 = arg => console.log('Hi, ' + arg);
//補充:如果該function沒有參數要傳，使用空括號
let func3 = () => console.log('Hi');
```
參考資料：[Arrow functions](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Functions/Arrow_functions) ＠MDN

### template literals
同樣也是ES6的新語法。利用` - 反引號(back-tick)或稱重音符(grave accent)來組合字串，
在範圍內可利用${}加上變數操作。
```javascript=
//傳統寫法
let str = '<div data-key="' + key + '">' +
         '<button>click</button>' +
         '</div>';
//template literals寫法
let str = `<div data-key="${key}">
         <button>click</button>
         </div>`;

```
參考資料：[template literals](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Template_literals)@ MDN

### forEach 
forEach是陣列的一種方法，通常用來迴圈遍歷陣列
```javascript=
let datas = ['data1', 'data2', 'data3'];

//for迴圈寫法
for (let i = 0; i < datas.length; i++) {
    console.log(datas[i]);
}
//forEach寫法
datas.forEach(function(data){
    console.log(data);
});

//都會輸出
//data1
//data2
//data3

datas.forEach(console.log);
//如果透過上面直接console.log來看到結果是：
//data1 0 ["data1", "data2", "data3"]
//data2 1 ["data1", "data2", "data3"]
//data3 2 ["data1", "data2", "data3"]
//回傳結果分別是value, index, array本身內容
```

參考資料：[Array.prototype.forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)



