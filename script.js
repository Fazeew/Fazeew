/* =========================================================
   НАСТРОЙКИ — меняй здесь под себя
   ========================================================= */

// Дата, с которой вы вместе.
// Формат: год, месяц (0-11), день, час, минута, секунда
// Сейчас стоит: 1 июня, 05:13:22 (месяц 5 = июнь, т.к. месяцы считаются с 0)
const startDate = new Date(2026, 5, 1, 5, 13, 22);

// Список "за что я тебя люблю" — добавляй/меняй строки как хочешь
const reasons = [
  "За твою улыбку, от которой у меня внутри становится тепло",
  "За то, как ты умеешь поддержать в любой момент",
  "За то, что рядом с тобой я становлюсь лучше",
  "За наши разговоры, которые никогда не надоедают",
  "За то, что ты понимаешь меня без слов",
  "За то, что ты - самый родной для меня человек",
];

/* =========================================================
   Ниже можно не трогать
   ========================================================= */

// ---------- Таймер ----------
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function updateCounter() {
  const now = new Date();
  let diff = Math.max(0, now - startDate); // в миллисекундах

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * (1000 * 60 * 60 * 24);
  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * (1000 * 60 * 60);
  const minutes = Math.floor(diff / (1000 * 60));
  diff -= minutes * (1000 * 60);
  const seconds = Math.floor(diff / 1000);

  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
}

updateCounter();
setInterval(updateCounter, 1000);

// ---------- Список причин ----------
const reasonsList = document.getElementById("reasonsList");
reasons.forEach((text) => {
  const li = document.createElement("li");
  li.textContent = text;
  reasonsList.appendChild(li);
});

// Плавное появление причин при прокрутке
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), i * 120);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);
document.querySelectorAll(".reasons__list li").forEach((li) => observer.observe(li));

// ---------- Кнопка-сюрприз ----------
const loveBtn = document.getElementById("loveBtn");
const loveMessage = document.getElementById("loveMessage");

loveBtn.addEventListener("click", () => {
  loveMessage.hidden = false;
  burstHearts();
});

// ---------- Плавающие сердечки на фоне ----------
const heartsBg = document.querySelector(".hearts-bg");
const heartChars = ["\u2764", "\uD83D\uDC95", "\uD83D\uDC96", "\uD83E\uDE77"];

function spawnHeart() {
  const heart = document.createElement("span");
  heart.className = "heart-float";
  heart.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = 1 + Math.random() * 1.4 + "rem";
  const duration = 8 + Math.random() * 7;
  heart.style.animationDuration = duration + "s";
  heartsBg.appendChild(heart);
  setTimeout(() => heart.remove(), duration * 1000);
}

// Не запускаем анимацию, если пользователь просил уменьшить движение
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduceMotion) {
  setInterval(spawnHeart, 1200);
}

// Всплеск сердечек при нажатии кнопки
function burstHearts() {
  if (reduceMotion) return;
  for (let i = 0; i < 18; i++) {
    setTimeout(spawnHeart, i * 60);
  }
}
