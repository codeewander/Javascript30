# [JS30] - Day 24: sticky nav

## 任務目標
透過CSS的position:fixed與JavaScript的classList來製作網站常見的置頂選單。

## 語法/屬性使用
- HTMLElement.offsetHeight: 元素的高度(含padding和border)
- HTMLElement.offsetTop: 元素距離offsetParent的距離。offsetParent會指向離指定元素最近且含有定位資訊(position不等於static)的祖先元素。此題的offsetParent為body。

## 步驟
1. 取得Nav並偵測Nav到網頁頂部的高度
```javascript=
// 取得nav元素
const nav = document.querySelector('#main');
// 透過offsetTop取得nav頂部到整個網頁的頂部距離
const topOfNav = nav.offsetTop;
//透過offsetHeight取得nav元素的高度
const heightOfNav = nav.offsetHeight;
```
2. 監聽滾動事件
```javascript=
function stickyNav() {
    // code
}
window.addEventListener('scroll', stickyNav);
```
3. 偵測滾動距離，決定是否變更選單樣式
```javascript=
function fixNav() {
  // 如果滾動距離大於nav距離頂部的距離，改變nav樣式
  if (window.scrollY >= topOfNav) {
    document.body.classList.add('sticky-nav');
  } else {
    document.body.classList.remove('sticky-nav');
  }
}
```
```css=
/* 當有fixed-nav時，把nav改為fixed並加上陰影*/
.sticky-nav nav {
  position: fixed;
  box-shadow: 0 5px rgba(0,0,0,0.1);
}
```
3. 此時，會有一個狀況：當nav變成sticky的瞬間，下方的文字區塊會突然往上跑動，為什麼呢？這是因為當nav變成position:fixed時，它會浮起來，因此，下方的文字區塊便會補它的位置。因此，我們要把 nav 的高度加回去在 body 的 padding-top
```javascript=
function fixNav() {
  if (window.scrollY >= topOfNav) {
    ...
    document.body.style.paddingTop = heightOfNav + 'px';
  } else {
    ...
    document.body.style.paddingTop = 0px;
  }
}
```

4. 最後，可以加上logo效果和文字區塊放大效果
```javascript=
.fixed-nav .logo {
    max-width: 500px;
}

.fixed-nav .site-wrap {
    transform: scale(1);
}
```
原本的logo max-width等於0，設定之後，當nav固定時，logo也會跟著出現了，同時，下方的文字區塊放大。