(function () {
  function initNtbNav() {
    var menuToggle = document.querySelector("[data-ntb-menu-toggle]");
    var navMenu = document.querySelector("[data-ntb-nav-menu]");
    if (!menuToggle || !navMenu) return;

    var menuIcon = menuToggle.querySelector("i");

    function setOpen(isOpen) {
      navMenu.classList.toggle("open", isOpen);
      document.body.classList.toggle("ntb-menu-open", isOpen);
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");

      if (menuIcon) {
        menuIcon.classList.toggle("fa-bars", !isOpen);
        menuIcon.classList.toggle("fa-xmark", isOpen);
      }
    }

    menuToggle.addEventListener("click", function () {
      setOpen(!navMenu.classList.contains("open"));
    });

    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setOpen(false);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setOpen(false);
    });

    document.addEventListener("click", function (event) {
      if (!navMenu.classList.contains("open")) return;
      var target = event.target;
      if (!target) return;
      if (navMenu.contains(target) || menuToggle.contains(target)) return;
      setOpen(false);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) setOpen(false);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNtbNav);
  } else {
    initNtbNav();
  }
})();

