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
  initPreloader();

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // UNIVERSAL SECTION TITLE ANIMATION
  const sectionTitles = document.querySelectorAll(".section-title");
  sectionTitles.forEach((title) => {
    // Split only if not already split
    if (!title.classList.contains("split-initialized")) {
      const split = new SplitType(title, { types: "chars" });
      title.classList.add("split-initialized");
      // Detect mobile
      const isMobile = window.innerWidth <= 991.98;
      if (isMobile) {
        gsap.set(split.chars, { x: -100, opacity: 0 });
        gsap.to(split.chars, {
          x: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.02,
          ease: "power2.out",
          scrollTrigger: {
            trigger: title,
            start: "top 80%",
            end: "top 20%",
            once: true,
          },
        });
      } else {
        gsap.set(split.chars, { y: 100, opacity: 0 });
        gsap.to(split.chars, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: title,
            start: "top 80%",
            end: "top 20%",
            scrub: true,
            once: true,
          },
        });
      }
    }
  });

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
          start: "top 80%",
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

  if (document.querySelector(".services__title")) {
    const servicesTitle = document.querySelector(".services__title");
    servicesTitle.setAttribute("scrub-each-word", "");
    const servicesTitleSplit = new SplitType(servicesTitle, { types: "words" });
    gsap.set(servicesTitleSplit.words, { opacity: 0, left: 100 });
    gsap
      .timeline({
        scrollTrigger: {
          trigger: servicesTitle,
          start: "top 80%",
          end: "top 5%",
          scrub: true,
          once: true,
        },
      })
      .to(servicesTitleSplit.words, {
        opacity: 1,
        left: 0,
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

  // Анімація для .services__questions
  if (document.querySelector(".services__questions")) {
    const questions = document.querySelectorAll(".services__question");
    const isMobile = window.innerWidth <= 991.98;
    gsap.set(questions, { y: 80, opacity: 0, scale: 0.97 });
    gsap.to(questions, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.7,
      ease: "back.out(1.7)",
      stagger: 0.15,
      scrollTrigger: {
        trigger: ".services__questions",
        start: "top 60%",
        end: "top 10%",
        ...(isMobile ? { once: true } : { scrub: true, once: true }),
      },
    });
  }
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
