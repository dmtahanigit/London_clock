let player;

// This function creates an <iframe> (and YouTube player) after the API code downloads
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: 'WKGK_hYnlGE', // London live stream ID
        playerVars: {
            autoplay: 1,
            mute: 1,
            controls: 0,
            rel: 0,
            showinfo: 0,
            modestbranding: 1,
            iv_load_policy: 3,
            loop: 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': onPlayerError
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        player.playVideo(); // Restart the video if it ends
    }
}

function onPlayerError(event) {
    console.error('YouTube Player Error:', event.data);
    document.getElementById('video-background').style.backgroundColor = '#1a1a1a'; // Dark fallback color
}

// Mute/Unmute functionality
const muteToggle = document.getElementById('mute-toggle');
muteToggle.addEventListener('click', function() {
    if (player.isMuted()) {
        player.unMute();
        this.textContent = 'Mute';
    } else {
        player.mute();
        this.textContent = 'Unmute';
    }
});

// Clock functionality
function updateClock() {
    const options = {
        timeZone: 'Europe/London',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
    };

    const londonTime = new Intl.DateTimeFormat('en-GB', options).format(new Date());
    document.getElementById('clock').textContent = londonTime;
}

// Update clock immediately and then every second
updateClock();
setInterval(updateClock, 1000);
