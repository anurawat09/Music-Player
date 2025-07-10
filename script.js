// JavaScript for Music Player
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const volumeSlider = document.getElementById('volume');
const playlist = document.getElementById('playlist');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const upload = document.getElementById('upload-audio');

let currentSongIndex = 0;
let songs = Array.from(playlist.getElementsByTagName('li'));

function updatePlayButton(isPlaying) {
  const icon = playBtn.querySelector('i');
  icon.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
}

function loadSong(songElement) {
  audio.src = songElement.getAttribute('data-src');
  title.textContent = songElement.getAttribute('data-title');
  artist.textContent = songElement.getAttribute('data-artist');
}

function playSong() {
  audio.play();
  updatePlayButton(true);
}

function pauseSong() {
  audio.pause();
  updatePlayButton(false);
}

playBtn.addEventListener('click', () => {
  audio.paused ? playSong() : pauseSong();
});

nextBtn.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(songs[currentSongIndex]);
  playSong();
});

prevBtn.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(songs[currentSongIndex]);
  playSong();
});

audio.addEventListener('timeupdate', () => {
  if (!isNaN(audio.duration)) {
    progress.value = (audio.currentTime / audio.duration) * 100;
  }
});

progress.addEventListener('input', () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
});

songs.forEach((song, index) => {
  song.addEventListener('click', () => {
    currentSongIndex = index;
    loadSong(song);
    playSong();
  });
});

upload.addEventListener('change', function () {
  const file = this.files[0];
  if (file) {
    const url = URL.createObjectURL(file);
    const li = document.createElement('li');

    li.textContent = file.name;
    li.setAttribute('data-src', url);
    li.setAttribute('data-title', file.name);
    li.setAttribute('data-artist', 'You');

    playlist.appendChild(li);
    songs.push(li);

    li.addEventListener('click', () => {
      currentSongIndex = songs.length - 1;
      loadSong(li);
      playSong();
    });
  }
});

// Initialize with first song
loadSong(songs[currentSongIndex]);
updatePlayButton(false);
