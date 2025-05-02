import Lenis from "lenis";

export default function initPopups() {
  let unlockPopup = true;
  const body = document.querySelector("body");
  const timeout = 500;
  const buttons = document.querySelectorAll("[data-popup]");

  // Lenis instance (reuse global if exists)
  let lenis = window.lenis;
  if (!lenis) {
    lenis = new Lenis({
      duration: 1.2,
      smooth: true,
      direction: "vertical",
      gestureDirection: "vertical",
      smoothTouch: false,
      touchMultiplier: 2,
      wheelMultiplier: 1,
      infinite: false,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    window.lenis = lenis;
  }

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const popupClass = button.getAttribute("data-popup");
      const popup = document.querySelector(popupClass);

      if (unlockPopup) {
        lenis.stop();
        popup.classList.add("active");
        popup.addEventListener("click", (e) => {
          if (!e.target.closest(".popup__content") || e.target.closest(".popup__close")) {
            e.preventDefault();
            popup.classList.remove("active");
            lenis.start();
          }
        });
      }
    });
  });
}
