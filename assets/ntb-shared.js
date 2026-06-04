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

    scrollTopButton.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    document.body.appendChild(wrapper);
  }

  function initChatWidget() {
    if (document.querySelector(".ntb-chat-widget")) return;

    var chatHtml =
      '<div class="ntb-chat-widget">' +
        '<div class="ntb-chat-header">' +
          '<div class="ntb-chat-header-info">' +
            '<div class="ntb-chat-avatar"><i class="fa-solid fa-headset"></i></div>' +
            '<div class="ntb-chat-header-text">' +
              '<h3>Support Agent</h3>' +
              '<span>Online</span>' +
            '</div>' +
          '</div>' +
          '<button class="ntb-chat-close" aria-label="Close Chat"><i class="fa-solid fa-xmark"></i></button>' +
        '</div>' +
        '<div class="ntb-chat-body">' +
          '<div class="ntb-chat-msg bot">Hello! Welcome to Noshahi Test Builder. How can we help you today?</div>' +
        '</div>' +
        '<div class="ntb-chat-footer">' +
          '<form class="ntb-chat-input-wrap">' +
            '<input type="text" placeholder="Type your message..." aria-label="Message">' +
            '<button type="submit" class="ntb-chat-send"><i class="fa-solid fa-paper-plane"></i></button>' +
          '</form>' +
          '<a href="https://wa.me/923281642297" target="_blank" class="ntb-chat-whatsapp-cta">' +
            '<i class="fa-brands fa-whatsapp"></i> Chat on WhatsApp' +
          '</a>' +
        '</div>' +
      '</div>';

    document.body.insertAdjacentHTML("beforeend", chatHtml);

    var widget = document.querySelector(".ntb-chat-widget");
    var closeBtn = widget.querySelector(".ntb-chat-close");
    var form = widget.querySelector(".ntb-chat-footer form");
    var input = form.querySelector("input");
    var body = widget.querySelector(".ntb-chat-body");

    function toggleChat(force) {
      widget.classList.toggle("is-open", force);
    }

    closeBtn.addEventListener("click", function() { toggleChat(false); });

    form.addEventListener("submit", function(e) {
      e.preventDefault();
      var text = input.value.trim();
      if (!text) return;

      var userMsg = document.createElement("div");
      userMsg.className = "ntb-chat-msg user";
      userMsg.textContent = text;
      body.appendChild(userMsg);
      input.value = "";
      body.scrollTop = body.scrollHeight;

      setTimeout(function() {
        var botMsg = document.createElement("div");
        botMsg.className = "ntb-chat-msg bot";
        botMsg.textContent = "Thank you for your message! An agent will get back to you shortly. For a faster response, please use the WhatsApp button below.";
        body.appendChild(botMsg);
        body.scrollTop = body.scrollHeight;
      }, 1000);
    });

    // Handle "Start Live Chat" buttons
    document.querySelectorAll('a, button').forEach(function(el) {
      if (el.textContent.trim() === "Start Live Chat") {
        el.addEventListener("click", function(e) {
          e.preventDefault();
          toggleChat(true);
        });
      }
    });
  }

  function initFooterSubscription() {
    var footerForms = document.querySelectorAll(".footer-form");
    footerForms.forEach(function(form) {
      form.addEventListener("submit", function(e) {
        e.preventDefault();
        var input = form.querySelector("input");
        var button = form.querySelector("button");
        var email = input.value.trim();

        if (!email) return;

        // Visual feedback
        var originalButtonContent = button.innerHTML;
        button.innerHTML = '<i class="fa-solid fa-check"></i>';
        button.style.background = "#22c55e";
        button.style.color = "white";
        input.value = "Subscribed!";
        input.disabled = true;
        form.style.borderColor = "#22c55e";

        setTimeout(function() {
          input.value = "";
          input.disabled = false;
          button.innerHTML = originalButtonContent;
          button.style.background = "";
          button.style.color = "";
          form.style.borderColor = "";
        }, 3000);
      });
    });
  }

  function initSharedUi() {
    ensureFavicon();
    initNtbNav();
    initQuickActions();
    initChatWidget();
    initFooterSubscription();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSharedUi);
  } else {
    initSharedUi();
  }
})();
