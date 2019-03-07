# [JS30] Day11: Custom HTML Video Player

###### tags: `JS30` `HTML5` `video player`

## 任務摘要
製作一個客製化的撥放器，學習HTML5播放器的事件和屬性操作

## HTML 5 Video Player
Html5的語意標籤`<video>`可以執行瀏覽器搭載的播放影片功能，有多個屬性可操作：
```javascript=
<video autoplay controls muted 
height="300" width="240"
src="http://www.html5videoplayer.net/videos/toystory.mp4"></video>

- autoplay: 自動播放
- controls: 出現瀏覽器預設的播放器
- loop: 重複播放
- muted: 播放時預設靜音
- src: 影片連結
- height: 設定高度px（不能設定百分比）
- width: 設定寬度px（不能設定百分比）
```
更多關於[video標籤屬性](https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element/video) 

若沒有要客制化播放器的話，直接在`<video>`標籤加上 controls 就可以使用瀏覽器內建的播放器了。

## JS 操作video屬性/方法
HTML5 Video Element 主要繼承自[HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement)，可以操作的屬性包含：

```javascript=
const video = doucment.querySelector('video')

// 屬性（property）  
video.paused        // 影片是否為暫停狀態，
video.muted         // 影片是否為靜音
video.volumn        // 音量大小(從 0 到 1)
video.playbackRate  // 播放速度，預設是 1.0
video.currentTime   // 影片當前播放的時間
video.duration      // 影片持續的時間

// 方法（method）
video.play()       //播放
video.pause()      //暫停

// 事件（event）
play
pause
timeupdate  // 當 video.currentTime 改變時會觸發
```
## 實作任務內容

### 播放或停止
首先把所有相關元素取出，方便後續事件處理
```javascript=
const player = document.querySelector(".player");////最外層的div
const video = player.querySelector(".viewer");//影片的div
const progress = player.querySelector(".progress");//影片播放bar的外層div
const progressBar = player.querySelector(".progress__filled");//影片播放bar的div 
const toggle = player.querySelector(".toggle");//播放按鈕的div
const skipButtons = player.querySelectorAll("[data-skip]");//兩個skip按鈕的div
const ranges = player.querySelectorAll(".player__slider");//聲音大小及撥放速度bar的div
```
接著，要設定撥放和暫停的控制，讓點擊video視窗及控制鈕(toggle)時會撥放/暫停。透過`video.paused`判定播放狀態，並使用 `video.play()` 和 `video.pause()`來控制播放或暫停：

```javascript=
// 播放或暫停影片
function togglePlay() {
    if(video.paused){
        video.play()
    }else{
        video.pause()
    }
}

video.addEventListener('click', togglePlay)
toggle.addEventListener('click', togglePlay)
```
接著，要改變按鈕的樣式。當影片播放play()或暫停pause()時會更改撥放鍵的樣式。
```javascript=
// 切換播放按鈕 icon
function switchPlayButton () {
    let icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon
}

video.addEventListener('play', switchPlayButtonIcon)
video.addEventListener('pause', switchPlayButtonIcon)
```
### 快轉與倒退

接著，要控制快轉和倒退的兩個skip按鈕。
- skip共有兩個：-10及+25，可以利用dataset方法，利用querySelectorAll選取標籤內含所有data-skip屬性的元素，並使用forEach)增加click監聽事件，觸發skip函式。取資料時可以用this.dataset.skip的方式取到該值。
- 由於取到的值是string，所以要用parseFloat()強制轉換成number。
- 使用video.currentTime取得並設定目前影片播放的時間點。

```javascript=
function skip(){
	const skip = this.dataset.skip;
	video.currentTime += parseFloat(this.dataset.skip);
}
skipButtons.forEach(button => button.addEventListener('click', skip));
```

### 調整音量和播放速度
- 利用`change`和`mouseover`監聽事件，並利用選取this.name的方式抓到音量或速度的range bar，並利用this.value抓到值。
- 利用`video.volume` 和 `video.playbackRate` 來控制播放的音量（0~1）和播放速度（預設是1.0）：

```javascript=
function handleRangeUpdate(){
	video[this.name] = this.value;
}
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mouseover', handleRangeUpdate));
```
### 播放進度條

接著，使用`video.currentTime`取當前值，並除以`video.duration`(影片全長)乘上100，得知進度條的比例位置，然後，利用`progressBar.style.flexBasis`改變進度條的長度

```javascript=
function handleProgress(){
	const percent = (video.currentTime / video.duration) *100;
	progressBar.style.flexBasis = `${percent}%`;
}
// 當 video.currentTime 改變時會觸發 timeupdate
video.addEventListener('timeupdate', handleProgress);
```
最後，處理拖拉撥放bar的效果
- 利用e.offsetX取得在當下該div的x值，除以div的全長 progress.offsetWidth可以得到百分比，乘以video.duration可以知道目前的撥放時間，並放到video.currentTime。
- 設定mousedown = false當作flag。當按下(mousedown)為true，放開時(mouseup)為false，在移動時(mouseover)判定若mousedown參數為true時執行事件(scrub)。
```javascript=
function scrub(event) {
  const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (event) => mousedown && scrub(event));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
```
參考資料：
- [HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement) @ WebAPIs MDN
- [HTMLVideoElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement) @ WebAPIs MDN
- [HTML5 Elements](https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element/video) @ MDN
- [TimeRanges](https://developer.mozilla.org/en-US/docs/Web/API/TimeRanges) @ MDN


