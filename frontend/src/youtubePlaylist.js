var lastTime = 0;
var vendors = ['ms', 'moz', 'webkit', 'o'];
for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                               || window[vendors[x]+'CancelRequestAnimationFrame'];
}

if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
        timeToCall);
      lastTime = currTime + timeToCall;
      return id;
  };
}

window.addEventListener('load', (event) => {
  window.setTimeout(function() {    
    // 2. This code loads the IFrame Player API code asynchronously.
    const tag = document.createElement('script');

    tag.src = "//www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }, 150);
});

const setUpPlayList = (element) => () => {
  const playlistId = element.getAttribute('data-playlist');
  const shuffle = element.getAttribute('data-shuffle') === 'true';
  const maxNum = element.getAttribute('data-length') || 7;

  const numPl = Math.floor((Math.random() * parseInt(maxNum)) + 1);

  // eslint-disable-next-line no-undef
  new YT.Player(element, {
    height: '315',
    width: '560',
    playerVars: {
      listType: 'playlist',
      list: playlistId,
      autoplay: 0,
      index: numPl,
    },
    events: {
      'onReady': function (event) {
        window.requestAnimationFrame(function() {
          event.target.setShuffle({'shufflePlaylist' : shuffle});
        });
      },
    }
  });
};

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
window.onYouTubeIframeAPIReady = () => {
  const elements = Array.from(document.querySelectorAll('.youtube-playlist'));
  const ln = elements.length;

  for(let i = 0; i < ln; i++) {
    window.requestAnimationFrame(setUpPlayList(elements[i]));    
  }    
};
