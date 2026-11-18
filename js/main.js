(function () {
  function unset(value) {
    if (value == null) return true;
    var v = String(value).trim();
    if (!v) return true;
    // Treat leftover tokens as empty so unfinished buttons stay hidden
    if (/^(YOUR_[A-Z0-9_]+|TODO|TBD|changeme|placeholder)$/i.test(v)) return true;
    return false;
  }

  function digits(value) {
    return String(value).replace(/\D/g, "");
  }

  function whatsappUrl() {
    if (unset(window.WHATSAPP_NUMBER)) return "";
    var number = digits(window.WHATSAPP_NUMBER);
    if (!number) return "";
    var message = window.WHATSAPP_MESSAGE || "Hi, I'd like to know more about Living Water Farms";
    return "https://wa.me/" + number + "?text=" + encodeURIComponent(message);
  }

  var hrefs = {
    whatsapp: whatsappUrl(),
    instagram: window.INSTAGRAM_URL,
    facebook: window.FACEBOOK_URL,
    youtube: window.YOUTUBE_URL,
    maps: window.MAPS_URL,
    email: unset(window.EMAIL) ? "" : "mailto:" + String(window.EMAIL).trim()
  };

  document.querySelectorAll("[data-link]").forEach(function (el) {
    var href = hrefs[el.getAttribute("data-link")];
    if (unset(href)) {
      el.hidden = true;
      el.removeAttribute("href");
      return;
    }
    el.hidden = false;
    el.href = href;
  });

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
