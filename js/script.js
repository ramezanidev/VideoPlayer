var $ = document;
var video = $.querySelector('video')
var play_stop_btn = $.querySelector('.play_stop')
var c__play_btn = $.querySelector('.c__play_btn')
var reverse = $.querySelector('.reverse')
var progress_time = $.querySelector('.progress_time')
var progress_volume = $.querySelector('.progress_volume')
var total_time = $.querySelector('.total_time')
var now_time = $.querySelector('.now_time')
var cover = $.querySelector('#cover')
var skip_real = $.querySelector('.skip_real')
var skip_front = $.querySelector('.skip_front')
var volume_off = $.querySelector('#volume_off')
var playerMenu_btn = $.querySelectorAll('.playerMenu_btn')
var fullscreen = $.querySelector('.fullscreen')
var zoom_out = $.querySelector('.zoom_out')
var zoom_title = $.querySelector('.zoom_title')
var zoom_in = $.querySelector('.zoom_in')
var speed_plus = $.querySelector('.speed_plus')
var speed_title = $.querySelector('.speed_title')
var speed_minus = $.querySelector('.speed_minus')
var repetition_Btn = $.querySelector('.repetition')
var picture_in_picture_Btn = $.querySelector('.picture_in_picture')
var c__mouse_menu = $.querySelector('.c__mouse_menu')
var resetZoom = $.querySelector('.resetZoom')
var resetSpeed = $.querySelector('.resetSpeed')
var skip_next = $.querySelector('.skip_next')
var skip_previous = $.querySelector('.skip_previous')
var download_480 = $.querySelector('.download_480')
var download_720 = $.querySelector('.download_720')
var download_1080 = $.querySelector('.download_1080')
var select_quality_480p = $.querySelector('.select_quality_480p')
var select_quality_720p = $.querySelector('.select_quality_720p')
var select_quality_1080p = $.querySelector('.select_quality_1080p')
var c__title = $.querySelector('.c__title')
var select_quality = $.querySelectorAll('.select_quality')
var videoArrey = [
    {
        title:"فیلم جلسه 1 - تست 1 - جمع بندی",
        quality_480:"https://cdn.alaatv.com/upload/vastVideos/hq/vast_alaa_3a_2.mp4",
        quality_720:"https://cdn.alaatv.com/upload/vastVideos/HD_720p/vast_alaa_3a_2.mp4",
        quality_1080:"https://cdn.alaatv.com/upload/vastVideos/hq/vast_alaa_3a_2.mp4",
    },
    {
        title:"فیلم جلسه 2 - تست 2 - جمع بندی",
        quality_480:"https://cdn.alaatv.com/media/91/240p/008.mp4",
        quality_720:"https://cdn.alaatv.com/media/91/hq/008.mp4",
        quality_1080:"https://cdn.alaatv.com/media/91/HD_720p/008.mp4",
    },
    {
        title:"فیلم جلسه 3 - تست 3 - جمع بندی",
        quality_480:"https://cdn.alaatv.com/media/953/240p/953003wkqi.mp4",
        quality_720:"https://cdn.alaatv.com/media/953/hq/953003wkqi.mp4",
        quality_1080:"https://cdn.alaatv.com/media/953/HD_720p/953003wkqi.mp4",
    }
]
var volumeNOW = 1
var fullscreenNOW = false
var isPlay = false
var volmute = false
var zoomVideo = 1
var speedVideo = 1
var repetition = false
var indexPlaying = 0
var loaded = false
var ONcurrentTime,videoWidth,videoHeight;
skip_next.addEventListener('click',()=>{
    if(videoArrey.length-1 === indexPlaying){
        indexPlaying=0
    }else{
        indexPlaying++
    }
    setValues(indexPlaying)
})
skip_previous.addEventListener('click',()=>{
    if(indexPlaying === 0){indexPlaying = videoArrey.length-1}else{indexPlaying--}setValues(indexPlaying)
})
setValues(0)
function setValues (a){
    c__title.innerHTML = videoArrey[a].title;
    download_480.setAttribute('download',videoArrey[a].quality_480)
    download_720.setAttribute('download',videoArrey[a].quality_720)
    download_1080.setAttribute('download',videoArrey[a].quality_1080)
    download_480.setAttribute('href',videoArrey[a].quality_480)
    download_720.setAttribute('href',videoArrey[a].quality_720)
    download_1080.setAttribute('href',videoArrey[a].quality_1080)
    select_quality_480p.setAttribute('data-url',videoArrey[a].quality_480)
    select_quality_720p.setAttribute('data-url',videoArrey[a].quality_720)
    select_quality_1080p.setAttribute('data-url',videoArrey[a].quality_1080)
    video.setAttribute('src',videoArrey[a].quality_720)
}


select_quality.forEach(item=>{
    item.addEventListener('click',(e)=>{
        if(isPlay){
            video.src = e.currentTarget.getAttribute('data-url');
            video.play()
            video.currentTime = ONcurrentTime;
        }else{
            video.src = e.currentTarget.getAttribute('data-url');
            video.currentTime = ONcurrentTime;
        }
    })
})
video.addEventListener('play',setVideoSize=(e)=>{
    if(videoWidth){
        videoHeight = e.srcElement.videoHeight;
        videoWidth = e.srcElement.videoWidth;
        let coverWidth = parseInt(document.defaultView.getComputedStyle(cover).width)
        let x = (videoWidth/videoHeight);
        let z = coverWidth/x
        cover.style.height = z+'px'
}})
resetZoom.addEventListener('click',()=>zoom_title.click())
resetSpeed.addEventListener('click',()=>speed_title.click())
cover.addEventListener('contextmenu',(e)=>{
    e.preventDefault()
    if(e.target.tagName === 'VIDEO'){
        c__mouse_menu.style.display = 'block';
        c__mouse_menu.style.top = e.offsetY+'px'
        c__mouse_menu.style.left = e.offsetX+'px'
        document.documentElement.addEventListener('click',CloseRightMenu=(e)=>{
            let del = true
            e.path.forEach(item=>{if(item.className === 'c__mouse_menu'){del = false}})
            if(del){
                c__mouse_menu.style.display = 'none';
                document.documentElement.removeEventListener('click',CloseRightMenu)
            }
        })
    }
})
picture_in_picture_Btn.addEventListener('click', () => video.requestPictureInPicture())
repetition_Btn.addEventListener('click', () => {
    repetition_Btn.classList.toggle('player_btn_active')
    repetition = !repetition
})

video.addEventListener('leavepictureinpicture',()=>{
    isPlay ? video.play() : null
    console.log(5);
})
video.addEventListener('ended', () => {
    repetition ? repetitionVideo() : pauseANDplay()
    function repetitionVideo(){ video.currentTime = 0; video.play() }
})
speed_title.addEventListener('click', () => {
    video.playbackRate = 1
    speedVideo = 1
    speed_title.innerHTML = 'speed'
})
speed_plus.addEventListener('click', () => {
    video.playbackRate = video.playbackRate + .5
    speedVideo = video.playbackRate
    speed_title.innerHTML = speedVideo + 'X'
})
speed_minus.addEventListener('click', () => {
    if (speedVideo !== .5) {
        video.playbackRate = video.playbackRate - .5
        speedVideo = video.playbackRate
        speed_title.innerHTML = speedVideo + 'X'
    }
})
video.addEventListener('mousedown', (e) => {
    if (zoomVideo !== 1) {
        video.style.cursor = 'grabbing'
        let startX = e.clientX;
        let startY = e.clientY;
        let DefTop = parseInt(document.defaultView.getComputedStyle(video).top);
        let DefLeft = parseInt(document.defaultView.getComputedStyle(video).left);
        document.documentElement.addEventListener('mousemove', moveVideo = (e) => {
            let onX = e.clientX;
            let onY = e.clientY;
            video.style.left = DefLeft + (onX - startX) + 'px';
            video.style.top = DefTop + (onY - startY) + 'px';
        })
        document.documentElement.addEventListener('mouseup', () => { document.documentElement.removeEventListener('mousemove', moveVideo); video.style.cursor = 'default' })
    }
})
zoom_title.addEventListener('click', () => {
    zoomVideo = 1;
    zoom_title.innerHTML = zoomVideo * 100 + '%';
    video.style.transform = 'scale(' + zoomVideo + ')';
    video.style.top = 0;
    video.style.left = 0;
})
zoom_in.addEventListener('click', () => {
    zoomVideo++
    zoom_title.innerHTML = zoomVideo * 100 + '%'
    video.style.transform = 'scale(' + zoomVideo + ')'
})
zoom_out.addEventListener('click', () => {
    if (zoomVideo !== 1) { zoomVideo-- }
    zoom_title.innerHTML = zoomVideo * 100 + '%'
    video.style.transform = 'scale(' + zoomVideo + ')'
})
volume_off.addEventListener('click', (e) => {
    volmute = !volmute
    if (volmute) {
        volume_off.querySelector('i').innerHTML = 'volume_off'
        e.currentTarget.classList.toggle('player_btn_active')
        video.volume = 0
    } else {
        volume_off.querySelector('i').innerHTML = 'volume_up'
        e.currentTarget.classList.toggle('player_btn_active')
        video.volume = volumeNOW
    }
})
video.addEventListener('load',()=>loaded=true)
fullscreen.addEventListener('click', () => {
    if (fullscreenNOW) {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
        }
        fullscreen.querySelector('i').innerHTML = 'fullscreen'
        fullscreen.classList.toggle('player_btn_active')

    } else {
        if (cover.requestFullscreen) {
            cover.requestFullscreen()
        } else if (cover.webkitRequestFullscreen) {
            cover.webkitRequestFullscreen()
        }
        else if (cover.msRequestFullscreen) {
            cover.msRequestFullscreen()
        }
        fullscreen.querySelector('i').innerHTML = 'fullscreen_exit'
        fullscreen.classList.toggle('player_btn_active')
    }
    fullscreenNOW = !fullscreenNOW
})
var MouseLocationVideoCover, MouseLocationVideoCoverOn;
cover.addEventListener('mousemove', (e) => {
    MouseLocationVideoCover = (e.clientY * e.clientX)
    cover.classList = 'cover cover_hover';
    setTimeout(() => {
        MouseLocationVideoCoverOn = e.clientY * e.clientX;
        if (MouseLocationVideoCover === MouseLocationVideoCoverOn) {
            cover.classList = 'cover'
        }
    }, 3000)
})
progress_time.addEventListener('click', setProgress)
progress_volume.addEventListener('click', setProgress)
skip_real.addEventListener('click', () => { video.currentTime = video.currentTime - 10; videoPlay(); isPlay = true })
skip_front.addEventListener('click', () => { video.currentTime = video.currentTime + 10; videoPlay(); isPlay = true })
reverse.addEventListener('click', (event) => { video.classList.toggle('reverse'); event.currentTarget.classList.toggle('player_btn_active') })
play_stop_btn.addEventListener('click', pauseANDplay = () => {
    isPlay = !isPlay
    isPlay ? videoPlay() : videoPause()
})
function setProgress(e) {
    var el = e.currentTarget;
    var el_span = e.currentTarget.querySelector('span');
    el_span.style.width = (e.offsetX / parseInt($.defaultView.getComputedStyle(el).width)) * 100 + '%';
    switch (el.id) {
        case 'progress_volume':
            volume = parseInt(el_span.style.width) / 100;
            video.volume = volume;
            volumeNOW = volume;
            break;
        case 'progress_time':
            musicTimenow = (video.duration * parseInt(el_span.style.width)) / 100;
            video.currentTime = musicTimenow;
    }
}
video.addEventListener('progress', (e) => {
    if(loaded){
        loadTime = (e.srcElement.buffered.end(0) / e.srcElement.duration) * 100
        progress_time.querySelector('div').style.width = loadTime + '%'
    }
})

videoPlay = () => {
    video.play()
    c__play_btn.classList += ' c__play_btn_hiden';
    play_stop_btn.querySelector('i').innerHTML = 'pause'
}
videoPause = () => {
    video.pause()
    c__play_btn.classList.remove('c__play_btn_hiden');
    play_stop_btn.querySelector('i').innerHTML = '&#xe037'

}
video.addEventListener('timeupdate', (e) => {
    setVideoSize(e)
    if (isPlay) {
        let currentTime = e.srcElement.currentTime;
        let duration = e.srcElement.duration;
        ONcurrentTime = currentTime
        let durationMin = Math.floor(duration / 60);
        let durationSec = Math.floor(duration % 60);
        if (durationSec < 10) { durationSec = "0" + durationSec }
        if (durationSec) { total_time.innerHTML = durationMin + ":" + durationSec }
        let currentMin = Math.floor(currentTime / 60);
        let currentSec = Math.floor(currentTime % 60);
        if (currentSec < 10) { currentSec = "0" + currentSec }
        now_time.innerHTML = currentMin + ":" + currentSec;
        progress_time.querySelector('span').style.width = (currentTime / duration) * 100 + '%';
        progress_volume.querySelector('span').style.width = e.srcElement.volume * 100 + '%';
    }
})
c__play_btn.addEventListener('click', () => isPlay ? null : pauseANDplay())
