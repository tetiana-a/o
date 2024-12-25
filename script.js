// script.js
const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("playPauseBtn");
const seekBar = document.getElementById("seekBar");
const timeDisplay = document.getElementById("timeDisplay");
const bars = document.querySelectorAll(".bar");
const trackList = document.getElementById("trackList");

// Web Audio API setup
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioContext.createAnalyser();
const source = audioContext.createMediaElementSource(audio);

source.connect(analyser);
analyser.connect(audioContext.destination);
analyser.fftSize = 64;

const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

function updateEqualizer() {
  analyser.getByteFrequencyData(dataArray);

  bars.forEach((bar, index) => {
    const value = dataArray[index];
    const height = (value / 255) * 100;
    bar.style.height = `${height}px`;
  });

  if (!audio.paused) requestAnimationFrame(updateEqualizer);
}

// Audio controls
playPauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    audioContext.resume();
    audio.play();
    playPauseBtn.textContent = "⏸";
    updateEqualizer();
  } else {
    audio.pause();
    playPauseBtn.textContent = "▶";
  }
});

audio.addEventListener("timeupdate", () => {
  seekBar.value = audio.currentTime;
  seekBar.max = audio.duration;
  const minutes = Math.floor(audio.currentTime / 60);
  const seconds = Math.floor(audio.currentTime % 60).toString().padStart(2, "0");
  timeDisplay.textContent = `${minutes}:${seconds}`;
});

seekBar.addEventListener("input", () => {
  audio.currentTime = seekBar.value;
});

// Switch track when user selects a new track from the playlist
trackList.addEventListener("change", () => {
  const selectedTrack = trackList.value;
  audio.src = selectedTrack;
  audio.play();
  playPauseBtn.textContent = "⏸";
  updateEqualizer();
});

// Initialize Particles.js
particlesJS('particles-js', {
  "particles": {
    "number": {
      "value": 100,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#125154"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#125154"
      }
    },
    "opacity": {
      "value": 0.5,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 1,
        "opacity_min": 0
      }
    },
    "size": {
      "value": 6,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 6,
        "size_min": 0.9
      }
    },
    "line_linked": {
      "enable": false
    },
    "move": {
      "enable": true,
      "speed": 4,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false
      }
    }
  },
  "interactivity": {
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      }
    }
  },
  "retina_detect": true
});
