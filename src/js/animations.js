import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Lenis from "lenis";
import { initPreloader } from "./preloader";
gsap.registerPlugin(ScrollTrigger);

export const lenis = new Lenis({
  duration: 1.7,
  smooth: true,
  direction: "vertical",
  gestureDirection: "vertical",
  smoothTouch: false,
  touchMultiplier: 2,
  wheelMultiplier: 1,
  infinite: false,
});

export function initAnimations() {
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // OUR SERVICES TITLE
  if (document.querySelector(".our-services__title")) {
    const servicesSplit = new SplitType(".our-services__title", { types: "chars" });
    gsap.set(servicesSplit.chars, { y: 100, opacity: 0 });
    gsap.to(servicesSplit.chars, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.06,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".our-services",
        start: "top 80%",
        end: "top 20%",
        scrub: true,
        once: true,
      },
    });
  }
  if (document.querySelector(".faq__title")) {
    gsap.set(".faq__title", { y: 100, opacity: 0 });
    gsap.to(".faq__title", {
      y: 0,
      opacity: 1,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".faq",
        start: "top 60%",
        end: "top 5%",
        scrub: true,
        once: true,
      },
    });
  }
  if (document.querySelector(".reviews__title")) {
    gsap.set(".reviews__title", { y: 100, opacity: 0 });
    gsap.to(".reviews__title", {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".reviews",
        start: "top 50%",
        end: "top 10%",
        scrub: true,
        once: true,
      },
    });
  }
  // SERVICES__TITLE: виїзд зліва
  if (document.querySelector(".services__title")) {
    gsap.set(".services__title", { x: -100, opacity: 0 });
    gsap.to(".services__title", {
      x: 0,
      opacity: 1,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".services",
        start: "top 40%",
        end: "top 10%",
        scrub: true,
        once: true,
      },
    });
  }
  // CONTACT__TITLE: fade-in
  if (document.querySelectorAll(".contact__title")) {
    const contactTitles = document.querySelectorAll(".contact__title");
    contactTitles.forEach((title) => {
      gsap.set(title, { opacity: 0, y: 100 });
      gsap.to(title, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".contact",
          start: "top 50%",
          end: "top 10%",
          scrub: true,
          once: true,
        },
      });
    });
  }
  // STEP: розгортання
  if (document.querySelector(".step")) {
    gsap.set(".step", { scaleY: 0.7, y: 60, opacity: 0, transformOrigin: "top center" });
    gsap.to(".step", {
      scaleY: 1,
      y: 0,
      opacity: 1,
      duration: 0.9,
      stagger: 0.35,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".how-we-work__steps",
        start: "top 35%",
        once: true,
      },
    });
  }
  // HERO SUBTITLE SCRUB WORDS
  if (document.querySelector(".hero__subtitle")) {
    const subtitle = document.querySelector(".hero__subtitle");
    subtitle.setAttribute("scrub-each-word", "");
    const subtitleSplit = new SplitType(subtitle, { types: "words" });
    gsap.set(subtitleSplit.words, { opacity: 0.2 });
    gsap
      .timeline({
        scrollTrigger: {
          trigger: subtitle,
          start: "top 90%",
          end: "top center",
          scrub: true,
          once: true,
        },
      })
      .to(subtitleSplit.words, {
        opacity: 1,
        duration: 0.2,
        ease: "power1.out",
        stagger: { each: 0.4 },
      });
  }
  // SERVICES__TEXT SCRUB WORDS
  if (document.querySelector(".services__text")) {
    const servicesText = document.querySelector(".services__text");
    servicesText.setAttribute("scrub-each-word", "");
    const servicesTextSplit = new SplitType(servicesText, { types: "words" });
    gsap.set(servicesTextSplit.words, { opacity: 0, y: 40, scale: 0.95 });
    gsap
      .timeline({
        scrollTrigger: {
          trigger: servicesText,
          start: "top 70%",
          end: "top 5%",
          scrub: true,
          once: true,
        },
      })
      .to(servicesTextSplit.words, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "back.out(1.7)",
        stagger: { each: 0.18 },
      });
  }
  // FAQ QUESTION
  if (document.querySelector(".faq__question")) {
    gsap.set(".faq__question", { y: 60, opacity: 0 });
    gsap.to(".faq__question", {
      y: 0,
      opacity: 1,
      duration: 1.5,
      stagger: 0.12,
      ease: "power2.out",
      delay: 0.6,
      scrollTrigger: {
        trigger: ".faq__questions",
        start: "top 50%",
        end: "top 10%",
        scrub: 1,
        once: true,
      },
    });
  }
  // SERVICE-CARD__IMAGE: всі виїжджають з правого боку, один ScrollTrigger
  const serviceImages = document.querySelectorAll(".service-card__image");
  serviceImages.forEach((img) => {
    gsap.set(img, { x: 120, opacity: 0 });
  });
  gsap.to(serviceImages, {
    x: 0,
    opacity: 1,
    duration: 5.2,
    ease: "power1.easeInOut",
    stagger: 1.5,
    scrollTrigger: {
      trigger: ".our-services__grid",
      start: "top 50%",
      end: "top 10%",
      scrub: 0.1,
    },
  });

  if (document.querySelector(".how-we-work__title")) {
    gsap.set(".how-we-work__title", { y: 100, opacity: 0 });
    gsap.to(".how-we-work__title", {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".how-we-work",
        start: "top 60%",
        end: "top 10%",
        scrub: true,
        once: true,
      },
    });
  }

  initPreloader();
}

export function initPortfolioAccordion() {
  const cases = document.querySelectorAll(".portfolio__cases .case");
  cases.forEach((el, i) => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: () => `top 100%`,
        end: () => `+=${el.offsetHeight}`,
        scrub: true,
        onUpdate: (self) => {
          el.style.zIndex = 10 + i + Math.round(self.progress * 10);
        },
      },
      ease: "none",
    });
  });
}
