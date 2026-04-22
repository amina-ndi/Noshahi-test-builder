(function () {
  function ensureLink(rel, href, attrs) {
    var selector = "link[rel='" + rel + "']";
    var link = document.querySelector(selector);

    if (!link) {
      link = document.createElement("link");
      link.rel = rel;
      document.head.appendChild(link);
    }

    link.href = href;

    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        link.setAttribute(key, attrs[key]);
      });
    }
  }

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

  function ensureFavicon() {
    ensureLink("icon", "favicon.png", { type: "image/png", sizes: "64x64" });
    ensureLink("shortcut icon", "favicon.png", { type: "image/png" });
    ensureLink("apple-touch-icon", "favicon.png");
  }

  function initQuickActions() {
    if (document.querySelector("[data-ntb-quick-actions]")) return;

    var wrapper = document.createElement("div");
    wrapper.className = "ntb-quick-actions";
    wrapper.setAttribute("data-ntb-quick-actions", "");

    wrapper.innerHTML =
      '<button class="ntb-scroll-top" type="button" aria-label="Back to top">' +
        '<i class="fa-solid fa-angles-up"></i>' +
      '</button>' +
      '<a class="ntb-whatsapp-fab" href="https://wa.me/923281642297?text=Assalamualaikum%2C%20I%20need%20help%20with%20Noshahi%20Test%20Builder." target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">' +
        '<i class="fa-brands fa-whatsapp"></i>' +
      '</a>';

    var scrollTopButton = wrapper.querySelector(".ntb-scroll-top");

    function syncScrollButton() {
      var isVisible = window.scrollY > 160;
      scrollTopButton.classList.toggle("is-visible", isVisible);
    }

    scrollTopButton.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Home" && !event.defaultPrevented) {
        scrollTopButton.classList.add("is-visible");
      }
    });

    document.body.appendChild(wrapper);
    syncScrollButton();
    window.addEventListener("scroll", syncScrollButton, { passive: true });
  }

  function initSharedUi() {
    ensureFavicon();
    initNtbNav();
    initQuickActions();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSharedUi);
  } else {
    initSharedUi();
  }
})();
