/* CVT Treinamentos — interações da página */
(function () {
  "use strict";

  var CFG = window.CVT_CONFIG || { whatsapp: [] };
  var doc = document.documentElement;
  doc.classList.add("js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Utilitários ---------- */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  function waLink(sector, subject) {
    var msg;
    if (sector.message) msg = sector.message;
    else if (subject) msg = CFG.subjectMessage.replace("{assunto}", subject);
    else msg = CFG.defaultMessage;
    return "https://api.whatsapp.com/send/?phone=%2B" + sector.phone + "&text=" + encodeURIComponent(msg);
  }

  function icon(id, cls) {
    return '<svg class="ico ' + (cls || "") + '" aria-hidden="true"><use href="#' + id + '"/></svg>';
  }

  /* ---------- Cards de setores (seção Contato) ---------- */
  var sectorList = $("#sector-list");
  if (sectorList) {
    sectorList.innerHTML = CFG.whatsapp.map(function (s) {
      return '<li><a class="sector" href="' + waLink(s) + '" target="_blank" rel="noopener">' +
        '<span class="sector-label">' + s.label + "</span>" +
        '<span class="sector-desc">' + s.desc + "</span>" +
        '<span class="sector-phone">' + s.display + "</span>" +
        '<span class="sector-cta">' + icon("i-wa") + "Conversar no WhatsApp</span>" +
        "</a></li>";
    }).join("");
  }

  /* ---------- Diálogo de atendimento ---------- */
  var dialog = $("#wa-dialog");
  var dialogList = $("#wa-dialog-list");
  var dialogSubject = $("#wa-subject");
  var dialogTitle = $("#wa-dialog-title");
  var dialogDesc = $("#wa-desc");
  var dialogHint = $(".wa-hint");
  var lastTrigger = null;

  function renderDialog(subject, title, desc) {
    dialogList.innerHTML = CFG.whatsapp.map(function (s) {
      return '<li><a class="sector" href="' + waLink(s, subject) + '" target="_blank" rel="noopener">' +
        '<span class="sector-icon">' + icon("i-wa") + "</span>" +
        '<span class="sector-body"><span class="sector-label">' + s.label + "</span>" +
        '<span class="sector-phone">' + s.display + "</span></span>" +
        icon("i-arrow", "sector-arrow") +
        "</a></li>";
    }).join("");
    if (title && desc) {
      // Aberto a partir de um treinamento: nome, descrição e, em seguida, os contatos
      dialogTitle.textContent = title;
      dialogDesc.textContent = desc;
      dialogDesc.hidden = false;
      dialogSubject.hidden = true;
      dialogHint.textContent = "Solicite informações pelo WhatsApp:";
    } else {
      dialogTitle.textContent = "Atendimento pelo WhatsApp";
      dialogDesc.hidden = true;
      dialogHint.textContent = "Escolha um setor. A conversa abre em uma nova aba com a mensagem pronta.";
      if (subject) {
        dialogSubject.textContent = "Assunto: " + subject;
        dialogSubject.hidden = false;
      } else {
        dialogSubject.hidden = true;
      }
    }
  }

  function openDialog(subject, trigger) {
    lastTrigger = trigger || null;
    renderDialog(subject, trigger && trigger.getAttribute("data-title"), trigger && trigger.getAttribute("data-desc"));
    closeMenu();
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      // Navegadores muito antigos: abre o primeiro atendimento
      window.open(waLink(CFG.whatsapp[0], subject), "_blank", "noopener");
    }
  }

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-wa-open]");
    if (t) {
      e.preventDefault();
      openDialog(t.getAttribute("data-subject"), t);
    }
  });

  if (dialog) {
    dialogList.addEventListener("click", function (e) {
      if (e.target.closest("a")) setTimeout(function () { dialog.close(); }, 150);
    });
    dialog.addEventListener("close", function () {
      if (lastTrigger && document.contains(lastTrigger)) lastTrigger.focus({ preventScroll: true });
    });
  }

  // Fechar diálogos: botão ou clique fora
  $$("dialog").forEach(function (d) {
    d.addEventListener("click", function (e) {
      if (e.target.closest("[data-dialog-close]")) { d.close(); return; }
      if (e.target === d) {
        var r = d.getBoundingClientRect();
        var inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
        if (!inside || d.classList.contains("lightbox")) d.close();
      }
    });
  });

  /* ---------- Cabeçalho e menu mobile ---------- */
  var header = $(".site-header");
  var toggle = $(".menu-toggle");
  var nav = $("#menu");

  function closeMenu() {
    if (!nav.classList.contains("is-open")) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
  }
  toggle.addEventListener("click", function () {
    var open = !nav.classList.contains("is-open");
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  });
  nav.addEventListener("click", function (e) { if (e.target.closest("a")) closeMenu(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
  document.addEventListener("click", function (e) {
    if (!e.target.closest("#menu") && !e.target.closest(".menu-toggle")) closeMenu();
  });

  function onScroll() { header.classList.toggle("is-scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Abas de treinamentos ---------- */
  var tabs = $$('[role="tab"]');
  function selectTab(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      $("#" + t.getAttribute("aria-controls")).hidden = !on;
    });
    if (focus) tab.focus();
  }
  tabs.forEach(function (tab, i) {
    tab.addEventListener("click", function () { selectTab(tab); });
    tab.addEventListener("keydown", function (e) {
      var dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (dir) { e.preventDefault(); selectTab(tabs[(i + dir + tabs.length) % tabs.length], true); }
    });
  });
  if (tabs.length) selectTab(tabs[0]);

  /* ---------- Vídeo do hero ---------- */
  var heroVideo = $("#hero-video");
  var videoBtn = $(".video-toggle");
  function setVideoState(playing) {
    videoBtn.dataset.state = playing ? "playing" : "paused";
    videoBtn.setAttribute("aria-label", playing ? "Pausar vídeo" : "Reproduzir vídeo");
  }
  if (heroVideo) {
    if (reduceMotion) { heroVideo.removeAttribute("autoplay"); heroVideo.pause(); setVideoState(false); }
    videoBtn.addEventListener("click", function () {
      if (heroVideo.paused) { heroVideo.play(); setVideoState(true); }
      else { heroVideo.pause(); setVideoState(false); }
    });
    heroVideo.addEventListener("pause", function () { setVideoState(false); });
    heroVideo.addEventListener("play", function () { setVideoState(true); });
  }

  /* ---------- Galeria (lightbox) ---------- */
  var lightbox = $("#lightbox");
  var lbImg = $("#lightbox-img");
  var lbCap = $("#lightbox-caption");
  $$(".gallery-item").forEach(function (item) {
    item.addEventListener("click", function () {
      var img = $("img", item);
      lbImg.src = item.dataset.full;
      lbImg.alt = img.alt;
      lbCap.textContent = item.dataset.caption || "";
      if (typeof lightbox.showModal === "function") lightbox.showModal();
    });
  });

  /* ---------- Copiar e-mail ---------- */
  $$("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var text = btn.getAttribute("data-copy");
      var done = function () {
        btn.setAttribute("aria-label", "E-mail copiado");
        btn.title = "Copiado!";
        setTimeout(function () { btn.setAttribute("aria-label", "Copiar e-mail"); btn.title = ""; }, 2000);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { selectEmail(); });
      } else { selectEmail(); }
    });
  });
  function selectEmail() {
    var el = $("[data-email]");
    var r = document.createRange(); r.selectNodeContents(el);
    var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
  }

  /* ---------- Facebook (só aparece se configurado) ---------- */
  var fb = $("[data-facebook]");
  if (fb && CFG.facebook) { fb.href = CFG.facebook; fb.hidden = false; }

  /* ---------- Ano no rodapé ---------- */
  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- Observadores: animações, botão flutuante, menu ativo ---------- */
  if ("IntersectionObserver" in window) {
    // Animação de entrada apenas para o que está abaixo da dobra
    var vh = window.innerHeight;
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.remove("is-pending"); revealObs.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    if (!reduceMotion) {
      $$(".reveal").forEach(function (el) {
        if (el.getBoundingClientRect().top > vh) { el.classList.add("is-pending"); revealObs.observe(el); }
      });
    }

    // Botão flutuante: aparece após o hero e some na seção de contato
    var fab = $(".wa-fab");
    var heroVisible = true, contactVisible = false;
    function updateFab() { fab.classList.toggle("is-visible", !heroVisible && !contactVisible); }
    new IntersectionObserver(function (en) { heroVisible = en[0].isIntersecting; updateFab(); }, { threshold: 0.15 }).observe($(".hero"));
    new IntersectionObserver(function (en) { contactVisible = en[0].isIntersecting; updateFab(); }, { threshold: 0.2 }).observe($("#contato"));

    // Link ativo no menu
    var links = $$(".main-nav a");
    var navObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (a) { a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id); });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    $$("main section[id]").forEach(function (s) { navObs.observe(s); });

    // Pausa o vídeo do hero fora da tela (economia de bateria/dados)
    if (heroVideo && !reduceMotion) {
      new IntersectionObserver(function (en) {
        if (videoBtn.dataset.userPaused) return;
        if (en[0].isIntersecting) { var p = heroVideo.play(); if (p && p.catch) p.catch(function () {}); }
        else heroVideo.pause();
      }).observe(heroVideo);
      videoBtn.addEventListener("click", function () {
        if (heroVideo.paused) videoBtn.dataset.userPaused = "1"; else delete videoBtn.dataset.userPaused;
      });
    }
  }
})();
