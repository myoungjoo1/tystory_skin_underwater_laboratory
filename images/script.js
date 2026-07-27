"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const themeKey = "underwater-lab-theme";

  const root = document.documentElement;
  const themeWindow = document.querySelector("#theme-window");
  const themeHint = document.querySelector("#theme-hint");

  const menuButton = document.querySelector("#menu-button");
  const navigation = document.querySelector("#main-navigation");

  function saveTheme(theme) {
    try {
      localStorage.setItem(themeKey, theme);
    } catch (error) {
      console.warn("테마를 브라우저에 저장하지 못했습니다.");
    }
  }

  function hasSavedTheme() {
    try {
      return localStorage.getItem(themeKey) !== null;
    } catch (error) {
      return false;
    }
  }

  function applyTheme(theme, shouldSave) {
    root.dataset.theme = theme;

    const isDark = theme === "dark";

    if (themeHint) {
      themeHint.textContent = isDark
        ? "☀️ 낮의 연구실로"
        : "🌙 밤의 연구실로";
    }

    if (themeWindow) {
      themeWindow.setAttribute(
        "aria-label",
        isDark ? "낮 테마로 변경" : "밤 테마로 변경"
      );
    }

    if (shouldSave) {
      saveTheme(theme);
    }
  }

  /* 현재 HTML에 설정된 첫 테마를 화면 문구에 반영 */
  const initialTheme =
    root.dataset.theme === "dark" ? "dark" : "light";

  applyTheme(initialTheme, false);

  /* 아쿠아리움 창을 눌렀을 때 테마 변경 */
  if (themeWindow) {
    themeWindow.addEventListener("click", function () {
      const nextTheme =
        root.dataset.theme === "dark" ? "light" : "dark";

      applyTheme(nextTheme, true);
    });
  }

  /*
   * 사용자가 직접 테마를 고르지 않았을 때만
   * 컴퓨터의 라이트·다크 설정을 따라간다.
   */
  const systemTheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
  );

  systemTheme.addEventListener("change", function (event) {
    if (!hasSavedTheme()) {
      applyTheme(event.matches ? "dark" : "light", false);
    }
  });

  /* 모바일 햄버거 메뉴 */
  if (menuButton && navigation) {
    menuButton.addEventListener("click", function () {
      const isOpen = navigation.classList.toggle("is-open");

      menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuButton.setAttribute(
        "aria-label",
        isOpen ? "메뉴 닫기" : "메뉴 열기"
      );
    });

    navigation.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navigation.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "메뉴 열기");
      });
    });
  }
});