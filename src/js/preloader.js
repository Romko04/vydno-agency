export function initPreloader() {
  debugger;
  const preloader = document.querySelector(".preloader");
  const percentText = document.querySelector(".preloader__percent");
  const logo = document.querySelector(".preloader__logo");
  const body = document.body;

  if (!preloader || !percentText || !logo) return;

  // Блокуємо скролл
  body.classList.add("body--lock");

  // Якщо лого не завантажилось — показати заглушку
  logo.onerror = function () {
    logo.outerHTML = '<div class="preloader__logo-fallback">⚠️</div>';
  };

  let progress = 0;
  let fakeProgress = 0;
  let interval;

  // Ефект насиченості лого
  function setProgress(percent) {
    console.log("setProgress", percent);
    percentText.textContent = `${Math.round(percent)}%`;
    // Лого стає яскравішим по мірі завантаження
    const minOpacity = 0.2;
    const maxOpacity = 1;
    const opacity = minOpacity + (maxOpacity - minOpacity) * (percent / 100);
    logo.style.opacity = opacity;
    // Додаємо фільтр для ще більш wow-ефекту
    logo.style.filter = `grayscale(${1 - percent / 100}) blur(${3 - 2.5 * (percent / 100)}px)`;
  }

  // Фейковий прогрес для плавності
  function startFakeProgress() {
    interval = setInterval(() => {
      if (fakeProgress < 90) {
        fakeProgress += Math.random() * 3;
        if (fakeProgress > 90) fakeProgress = 90;
        setProgress(fakeProgress);
      }
    }, 60);
  }

  // Обновляем прогресс при загрузке ресурсов
  function updateProgress() {
    progress += 1;
    const percent = Math.min(90, (progress / total) * 90);
    setProgress(percent);
  }

  // Считаем все изображения и видео
  const resources = [...document.images, ...Array.from(document.querySelectorAll("video"))];
  const total = resources.length || 1;

  if (total > 0) {
    resources.forEach((res) => {
      if (res.complete) {
        updateProgress();
      } else {
        res.addEventListener("load", updateProgress);
        res.addEventListener("error", updateProgress);
      }
    });
  }

  // Запускаем фейковый прогресс
  startFakeProgress();

  // Когда все ресурсы и страница загружены
  window.addEventListener("load", () => {
    clearInterval(interval);
    setProgress(100);

    // Плавное исчезновение прелоадера
    setTimeout(() => {
      preloader.classList.add("hide");
      body.classList.remove("body--lock");
    }, 700); // Совпадает с transition в CSS
  });
}
