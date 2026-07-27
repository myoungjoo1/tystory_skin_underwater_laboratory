"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.querySelector("#menu-button");
  const navigation = document.querySelector("#main-navigation");

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