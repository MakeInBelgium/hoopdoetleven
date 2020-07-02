// 2. This code loads the IFrame Player API code asynchronously.
const tag = document.createElement('script');

tag.src = "//www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
window.onYouTubeIframeAPIReady = () => {
  const elements = Array.from(document.querySelectorAll('.youtube-playlist'));
  const ln = elements.length;

  for(let i = 0; i < ln; i++) {
    const element = elements[i];

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
          setTimeout(function() {
            event.target.setShuffle({'shufflePlaylist' : shuffle});
          }, 100);
        },
      }
    });
  }    
};
