function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if (!audio) return; //如果非指定按鍵，則跳出函式
    audio.currentTime = 0;//將播放器設回原點
    audio.play();
    if (e.keyCode >= 54) {
        key.classList.toggle('ear-scale');
    } else {
        key.classList.toggle('playing');
    }
}

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('playing')
    this.classList.remove('ear-scale')
};

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition))

window.addEventListener('keydown', playSound);