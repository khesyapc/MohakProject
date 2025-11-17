document.body.addEventListener("click", () => {
  let test = new Audio("music/lagusurprise.mp3");
  test.volume = 1.0;
  test.play();
  console.log("Tes mulai");
}, { once: true });

// ======================================================
// SLIDESHOW
// ======================================================
let slideIndex = 0;

function showSlides() {
  const slides = document.getElementsByClassName("slide");
  for (let s of slides) s.style.display = "none";

  slideIndex = (slideIndex % slides.length) + 1;
  slides[slideIndex - 1].style.display = "block";

  setTimeout(showSlides, 3000);
}
showSlides();


// ======================================================
// CONFETTI
// ======================================================
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function drawConfetti() {
  for (let i = 0; i < 200; i++) {
    ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 75%)`;
    ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 5, 5);
  }
}


// ======================================================
// HEART FLOATING
// ======================================================
const heartsContainer = document.createElement("div");
heartsContainer.classList.add("hearts-container");
document.body.appendChild(heartsContainer);

setInterval(() => {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = 3 + Math.random() * 2 + "s";
  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 5000);
}, 300);


// ======================================================
// COUNTDOWN
// ======================================================
const timer = document.getElementById("timer");
const targetDate = new Date("Nov 18, 2025 00:54:00").getTime();

let countdown = setInterval(() => {
  const now = Date.now();
  const diff = targetDate - now;

  if (diff < 0) {
    clearInterval(countdown);
    runSurprise();
    return;
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((diff % (1000 * 60)) / 1000);

  timer.innerHTML = `${d} Hari ${h} Jam ${m} Menit ${s} Detik`;
}, 1000);


// ======================================================
// AUDIO SYSTEM
// ======================================================
let audioUnlocked = false;

const mainMusic = document.getElementById("mainMusic");

let bgMusic = new Audio("music/lagusurprise.mp3");
let voice1 = new Audio("media/suara1.mp3");
let voice2 = new Audio("media/suara2.mp3");

bgMusic.volume = 1.0;
bgMusic.loop = true;

voice1.volume = 1.0;
voice2.volume = 1.0;

// Disable main music fully
if (mainMusic) {
  mainMusic.pause();
  mainMusic.volume = 0;
  mainMusic.currentTime = 0;
}

// Unlock audio on user interaction
function unlockAudio() {
  audioUnlocked = true;
}
document.body.addEventListener("click", unlockAudio, { once: true });
document.body.addEventListener("touchstart", unlockAudio, { once: true });

// Safe play
function safePlay(audioObj) {
  if (!audioUnlocked) return;
  audioObj.play().catch(err => console.log("Audio blocked:", err));
}


// ======================================================
// SURPRISE
// ======================================================
function runSurprise() {

  // Stop main music completely
  if (mainMusic) {
    mainMusic.pause();
    mainMusic.currentTime = 0;
    mainMusic.volume = 0;
  }

  // Dark overlay
  const overlay = document.createElement("div");
  overlay.className = "surprise-dark";
  document.body.appendChild(overlay);
  setTimeout(() => overlay.style.opacity = "50", 150);

  // Surprise text
  const text = document.createElement("div");
  text.className = "surprise-text";
  text.innerHTML = "SURPRISE SAYANGKU💖";
  document.body.appendChild(text);
  setTimeout(() => text.style.opacity = "50", 900);

  // Play surprise music
  setTimeout(() => safePlay(bgMusic), 1500);

  // Voice sequence
  setTimeout(() => {
    safePlay(voice1);
    voice1.onended = () => safePlay(voice2);
  }, 6500);

  // VIDEO LOOP 100% NO STUCK
  setTimeout(() => {
    const video = document.createElement("video");
    video.src = "media/video_kita.mp4";
    video.autoplay = true;
    video.muted = true;
    video.controls = false;

    // Mobile support
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.setAttribute("muted", "");
    video.setAttribute("loop", ""); // normal loop

    video.classList.add("surprise-video");
    document.body.appendChild(video);

    // Backup loop to avoid freeze
    video.addEventListener("ended", () => {
      video.currentTime = 0;
      video.play();
    });
  }, 5000);
}


// ======================================================
// LOVE LETTER
// ======================================================
const loveButton = document.querySelector(".love-button");

if (loveButton) {
  loveButton.addEventListener("click", () => {
    const overlay = document.createElement("div");
    overlay.classList.add("letter-overlay");

    overlay.innerHTML = `
      <div class="letter-container">
        <div class="envelope">
          <div class="flap"></div>
          <div class="letter-content">
            <h2>Untukmu, Sayang💖</h2>
            <p>
              Khesya bersyukur setiap hari karena punya Tania.
              Kamu adalah alasan Khesya tersenyum.
              Terima kasih sudah hadir dalam hidup Khesya.
              I love you sayangku 💞
            </p>
            <button class="close-letter">Tutup 💌</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    overlay.querySelector(".close-letter").addEventListener("click", () => {
      overlay.remove();
    });
  });
}


// Envelope animation
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("love-button")) {
    setTimeout(() => {
      const flap = document.querySelector(".flap");
      const letter = document.querySelector(".letter-content");

      if (flap && letter) {
        flap.style.animation = "openFlap 1s forwards";
        setTimeout(() => {
          letter.style.animation = "slideUp 1s forwards";
        }, 700);
      }
    }, 100);
  }
});
