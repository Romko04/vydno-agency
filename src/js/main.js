import "../css/styles.css";
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "../components/header/header.js";
import "swiper/css";
import "swiper/css/navigation";

const reviewsSlider = new Swiper(".reviews-slider", {
  modules: [Navigation],
  slidesPerView: 1,
  spaceBetween: 33,
  loop: true,
  navigation: {
    nextEl: ".reviews__control--next",
    prevEl: ".reviews__control--prev",
  },
  breakpoints: {
    1024: {
      slidesPerView: 2,
    },
  },
});

// Управління попапами
document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");
  let unlock = true;
  const timeout = 500;

  // Функція блокування скролу
  function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
    body.style.paddingRight = lockPaddingValue;
    body.classList.add("body--lock");
    unlock = false;
    setTimeout(() => {
      unlock = true;
    }, timeout);
  }

  // Функція розблокування скролу
  function bodyUnlock() {
    setTimeout(() => {
      body.style.paddingRight = "0px";
      body.classList.remove("body--lock");
    }, timeout);
    unlock = false;
    setTimeout(() => {
      unlock = true;
    }, timeout);
  }

  // Обробка кліків на кнопки відкриття попапів
  document.querySelectorAll(".review-card__action").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const action = button.getAttribute("data-action");
      const data = button.getAttribute("data-src");

      if (action === "video") {
        const popup = document.querySelector(".popup--video");
        const video = popup.querySelector("video");
        video.src = data;
        popup.classList.add("active");
        bodyLock();
        video.play();
      } else if (action === "stats") {
        const popup = document.querySelector(".popup--stats");
        const img = popup.querySelector("img");
        img.src = data;
        popup.classList.add("active");
        bodyLock();
      }
    });
  });

  // Закриття попапів
  document.querySelectorAll(".popup__close").forEach((closeBtn) => {
    closeBtn.addEventListener("click", () => {
      const popup = closeBtn.closest(".popup");
      const video = popup.querySelector("video");

      if (video) {
        video.pause();
        video.currentTime = 0;
      }

      popup.classList.remove("active");
      bodyUnlock();
    });
  });

  // Закриття попапу при кліку на затемнений фон
  document.querySelectorAll(".popup").forEach((popup) => {
    popup.addEventListener("click", (e) => {
      if (!e.target.closest(".popup__content")) {
        const video = popup.querySelector("video");
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
        popup.classList.remove("active");
        bodyUnlock();
      }
    });
  });

  // FAQ Accordion
  document.querySelectorAll(".faq__question").forEach((question) => {
    question.addEventListener("click", function () {
      // Знімаємо active з усіх, якщо потрібно тільки один відкритий
      // document.querySelectorAll('.faq__question').forEach(q => {
      //   if (q !== question) q.classList.remove('active');
      //   let panel = q.querySelector('.faq__answer');
      //   if (panel) panel.style.maxHeight = null;
      // });

      this.classList.toggle("active");
      let panel = this.querySelector(".faq__answer");
      if (panel) {
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
          panel.style.padding = "0";
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
          panel.style.padding = "2.4rem 0";
        }
      }
    });
  });
});
