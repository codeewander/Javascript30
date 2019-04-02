const nav = document.querySelector("#main")
const topOfNav = nav.offsetTop;
const heightOfNav = nav.offsetHeight


console.log(heightOfNav)
function stickyNav() {
  if (window.scrollY >= topOfNav) {
    document.body.classList.add('sticky-nav')
    document.body.style.paddingTop = heightOfNav + 'px'
  } else {
    document.body.style.paddingTop = 0
    document.body.classList.remove('sticky-nav')
  }
}

//設定滾動監聽事件
window.addEventListener('scroll', stickyNav)