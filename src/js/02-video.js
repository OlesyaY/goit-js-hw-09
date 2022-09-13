import Player from '@vimeo/player'
import throttle from 'lodash.throttle'

const iframe = document.querySelector('iframe')
const player = new Player(iframe)

player.on(
    'timeupdate',
    throttle((data) => {
        localStorage.setItem('videoplayer-current-time', data.seconds)
    }, 1000)
)

const handleOnLoad = () => {
    const lastTime = localStorage.getItem('videoplayer-current-time')
    if (lastTime) {
        player.setCurrentTime(lastTime)
        player.play()
    }
}

window.addEventListener('load', handleOnLoad)
