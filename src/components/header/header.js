import "./header.css";
import { lenis } from "../../js/animations";
document.addEventListener("DOMContentLoaded", () => {
  function toggleMenu() {
    document.querySelector(".header__burger").classList.toggle("active");
    document.querySelector("header .menu__body").classList.toggle("active");
    document.body.classList.toggle("body--lock");
  }

  // Тогл меню по кліку на бургер
  document.querySelector(".header__burger").addEventListener("click", function () {
    document.querySelector(".header__burger").classList.toggle("active");
    document.querySelector(".menu__body").classList.toggle("active");
    document.body.classList.toggle("body--lock");
  });

  // Плавний скрол до секцій через Lenis
  document.querySelectorAll(".header__menu-items a").forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = link.getAttribute("href");
      const beforeHash = href.split("#")[1];
      if (beforeHash) {
        const target = document.querySelector(`#${beforeHash}`);
        if (target && lenis) {
          e.preventDefault();
          if (window.innerWidth <= 991.98) {
            toggleMenu();
          }
          lenis.scrollTo(target);
        }
      }
    });
  });
});
