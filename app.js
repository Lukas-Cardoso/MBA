(function () {
  "use strict";

  var GRADIENTS = [
    "linear-gradient(135deg,#1a2540,#2d3a5c)",
    "linear-gradient(135deg,#2a2010,#5c4420)",
    "linear-gradient(135deg,#16201c,#244236)",
    "linear-gradient(135deg,#241828,#402a48)",
    "linear-gradient(135deg,#1c2230,#33415c)",
    "linear-gradient(135deg,#2a1c18,#4a2e22)"
  ];

  function svgIcon(inner) {
    return '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.1" ' +
      'stroke-linecap="round" stroke-linejoin="round">' + inner + '</svg>';
  }

  // one line-art illustration per module, thematically matched to its subject
  var MODULE_ICONS = [
    svgIcon('<path d="M10 24 L20 24 M14 18 L20 24 L14 30" /><rect x="24" y="8" width="16" height="32" rx="2"/><path d="M30 24h4"/>'), // Onboarding: entrando pela porta
    svgIcon('<path d="M8 20 L24 8 L40 20" /><path d="M8 20h32" /><path d="M12 20v16 M20 20v16 M28 20v16 M36 20v16" /><path d="M6 40h36" />'), // Economia/Politica: predio classico
    svgIcon('<rect x="7" y="7" width="34" height="34" rx="2"/><path d="M7 17h34 M7 27h34 M17 7v34 M27 7v34"/><path d="M14 32l4-6 5 4 6-9" stroke-width="2.4"/>'), // Excel/Matematica: planilha com grafico
    svgIcon('<rect x="10" y="8" width="28" height="32" rx="2"/><path d="M16 16h16 M16 22h16 M16 28h10"/><circle cx="32" cy="33" r="5"/><path d="M32 30.5v5l3 2"/>'), // Renda Fixa: certificado com prazo
    svgIcon('<circle cx="18" cy="20" r="10"/><circle cx="30" cy="24" r="10"/><path d="M14 36h20"/>'), // Fundos: cotas agrupadas
    svgIcon('<path d="M8 24 L24 10 L40 24"/><path d="M12 24v16h24V24"/><path d="M20 40v-10h8v10"/>'), // Imoveis/FII: casa
    svgIcon('<path d="M24 6l14 6v10c0 10-6 17-14 20-8-3-14-10-14-20V12z"/><circle cx="24" cy="24" r="6"/><path d="M24 21v3l2 2"/>'), // Previdencia: escudo com relogio
    svgIcon('<path d="M6 34l9-10 7 5 11-15 9 6"/><path d="M32 14h10v10"/>'), // Mercado de Acoes: tendencia de alta
    svgIcon('<path d="M8 12h32M8 12v26h32V12" /><path d="M14 30h8M14 24h14M14 18h20"/><circle cx="34" cy="30" r="6"/><path d="M31 30h6M34 27v6"/>'), // Contabilidade: livro + balanco
    svgIcon('<path d="M10 30l8-9 6 4 8-11" stroke-width="2.4"/><circle cx="27" cy="27" r="10"/><path d="M34.5 34.5L42 42"/>'), // Analise Fundamentalista: lupa sobre grafico
    svgIcon('<path d="M24 6c3 3 5 5 5 9a5 5 0 0 1-10 0c0-4 2-6 5-9z"/><path d="M16 40h16"/><path d="M18 40c0-6 2-10 6-13 4 3 6 7 6 13"/>'), // Acoes Estrategias: peao de xadrez
    svgIcon('<rect x="8" y="20" width="5" height="14"/><rect x="17" y="14" width="5" height="20"/><rect x="26" y="22" width="5" height="12"/><path d="M33 20l8-8 M41 12h-6v6"/>'), // Analise Tecnica: candles + seta
    svgIcon('<path d="M24 8a12 12 0 0 1 8 21c-1 2-1 3-1 5H17c0-2 0-3-1-5A12 12 0 0 1 24 8z"/><path d="M19 40h10"/><path d="M20 22a4 4 0 0 1 8 0"/>'), // Financas Comportamentais: mente
    svgIcon('<circle cx="24" cy="24" r="16"/><path d="M8 24h32M24 8c4 4 6 10 6 16s-2 12-6 16c-4-4-6-10-6-16s2-12 6-16z"/>'), // Investimentos Internacionais Private: globo
    svgIcon('<circle cx="20" cy="26" r="13"/><path d="M9 26h22M20 13c3 3 4.5 8 4.5 13s-1.5 10-4.5 13c-3-3-4.5-8-4.5-13s1.5-10 4.5-13z"/><path d="M30 16l10 4-4 3-2 5-4-12z"/>'), // Internac. Acoes/BDR/ETF/REIT: globo + aviao
    svgIcon('<ellipse cx="24" cy="14" rx="10" ry="4"/><path d="M14 14v8c0 2.2 4.5 4 10 4s10-1.8 10-4v-8"/><path d="M14 22v8c0 2.2 4.5 4 10 4s10-1.8 10-4v-8"/><path d="M18 38l6-8 6 8"/>'), // Alternativos: pilha de moedas com alta
    svgIcon('<rect x="12" y="6" width="20" height="26" rx="2"/><path d="M17 14h10M17 19h10M17 24h6"/><path d="M28 32l6 6M40 26a6 6 0 1 1-12 0 6 6 0 0 1 12 0z"/>'), // Derivativos Opcoes/COE: contrato + balanca
    svgIcon('<path d="M24 40V16"/><path d="M24 16c0-6-4-10-8-10 0 6 3 10 8 10z"/><path d="M24 22c0-6 4-10 8-10 0 6-3 10-8 10z"/><path d="M14 40h20"/>'), // Derivativos Futuros: espiga/commodity
    svgIcon('<circle cx="24" cy="24" r="16"/><path d="M24 6v4M24 38v4M6 24h4M38 24h4"/><path d="M30 18l-4 9-9 4 4-9z" stroke-linejoin="round"/>'), // Asset Allocation: bussola
    svgIcon('<path d="M10 18h16 M22 13l4 5-4 5"/><path d="M38 30H22 M26 25l-4 5 4 5"/>'), // Gestao de caixa/hedge/swap: troca
    svgIcon('<path d="M24 8l16 7-16 7-16-7z"/><path d="M14 18v9c0 3 5 6 10 6s10-3 10-6v-9"/><path d="M40 15v11"/>'), // Certificacoes: capelo
    svgIcon('<path d="M24 6c5 4 8 11 8 18 0 5-2 9-4 11l-4 3-4-3c-2-2-4-6-4-11 0-7 3-14 8-18z"/><path d="M19 33l-5 7h4M29 33l5 7h-4"/><circle cx="24" cy="20" r="3"/>'), // Alta Performance: foguete
    svgIcon('<rect x="16" y="6" width="16" height="30" rx="3"/><path d="M22 32h4"/><circle cx="8" cy="16" r="4"/><circle cx="40" cy="16" r="4"/><circle cx="8" cy="32" r="4"/><path d="M12 16h4M36 16h-4M12 30l4-6"/>') // Redes sociais: celular + rede
  ];

  var LAST_AULA_KEY = "mba-last-aula-v1";
  function setLastAula(id) { try { localStorage.setItem(LAST_AULA_KEY, id); } catch (e) {} schedulePush(); }
  function getLastAula() { try { return localStorage.getItem(LAST_AULA_KEY); } catch (e) { return null; } }

  var byId = {};
  var parentOf = {};
  var root = COURSE_DATA;

  function indexTree(node, parentId) {
    if (node.id) {
      byId[node.id] = node;
      parentOf[node.id] = parentId;
    }
    (node.children || []).forEach(function (c) { indexTree(c, node.id || null); });
  }
  root.modules.forEach(function (m) { indexTree(m, null); });

  var moduleIdSet = {};
  root.modules.forEach(function (m) { moduleIdSet[m.id] = true; });

  function allAulas(node) {
    var out = [];
    (node.children || []).forEach(function (c) {
      if (c.type === "aula") out.push(c);
      else if (c.type === "folder") out = out.concat(allAulas(c));
    });
    return out;
  }

  // ---- progress (localStorage) ----
  var PROGRESS_KEY = "mba-progress-v1";
  function loadProgress() {
    try { return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {}; }
    catch (e) { return {}; }
  }
  function saveProgress(p) {
    try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(p)); } catch (e) {}
    schedulePush();
  }
  var progress = loadProgress();
  function isDone(aulaId) { return !!progress[aulaId]; }
  function toggleDone(aulaId) {
    if (progress[aulaId]) delete progress[aulaId];
    else progress[aulaId] = true;
    saveProgress(progress);
  }
  function setDone(aulaId, val) {
    if (val) progress[aulaId] = true; else delete progress[aulaId];
    saveProgress(progress);
  }

  function moduleProgress(mod) {
    var aulas = allAulas(mod).filter(function (a) { return a.src; });
    var done = aulas.filter(function (a) { return isDone(a.id); }).length;
    return { done: done, total: aulas.length };
  }

  // ---- cloud sync (Firebase Auth + Firestore) ----
  // Optional: if firebase-config.js still has placeholder values, the site keeps working
  // with progress saved only in this browser (same behaviour as before login was added).
  var cloudUser = null;
  var fbAuth = null, fbDb = null;
  var pushTimer = null;

  function firebaseReady() {
    var cfg = window.FIREBASE_CONFIG;
    return !!(window.firebase && cfg && cfg.apiKey && cfg.apiKey.indexOf("YOUR_") !== 0);
  }

  function schedulePush() {
    if (!cloudUser || !fbDb) return;
    clearTimeout(pushTimer);
    pushTimer = setTimeout(pushCloudProgress, 500);
  }

  function pushCloudProgress() {
    if (!cloudUser || !fbDb) return;
    fbDb.collection("progress").doc(cloudUser.uid).set({
      done: progress,
      lastAula: getLastAula() || null,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(function (e) { console.warn("Falha ao sincronizar progresso na nuvem:", e); });
  }

  function loadCloudProgress(uid) {
    fbDb.collection("progress").doc(uid).get().then(function (snap) {
      if (snap.exists) {
        var data = snap.data() || {};
        progress = data.done || {};
        try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress)); } catch (e) {}
        if (data.lastAula) { try { localStorage.setItem(LAST_AULA_KEY, data.lastAula); } catch (e) {} }
      } else {
        pushCloudProgress();
      }
      setTopbarVisible(true);
      buildApp();
    }).catch(function (e) {
      console.warn("Falha ao carregar progresso da nuvem:", e);
      setTopbarVisible(true);
      buildApp();
    });
  }

  function updateAuthUI(user) {
    var openBtn = document.getElementById("btn-open-auth");
    var chip = document.getElementById("user-chip");
    var avatar = document.getElementById("user-avatar");
    var name = document.getElementById("user-name");
    if (!openBtn || !chip) return;
    if (user) {
      openBtn.style.display = "none";
      chip.style.display = "flex";
      if (avatar) avatar.src = user.photoURL || "";
      if (name) name.textContent = user.displayName || user.email || "";
    } else {
      openBtn.style.display = "flex";
      chip.style.display = "none";
    }
  }

  function setTopbarVisible(visible) {
    var topbar = document.querySelector(".topbar");
    if (topbar) topbar.style.display = visible ? "flex" : "none";
  }

  var GOOGLE_ICON_SVG = '<svg viewBox="0 0 18 18" width="16" height="16"><path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84c-.21 1.13-.85 2.09-1.81 2.73v2.27h2.92c1.71-1.57 2.69-3.88 2.69-6.64z"/><path fill="#34A853" d="M9 18c2.43 0 4.47-.81 5.96-2.18l-2.92-2.27c-.81.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.71H.96v2.33C2.44 15.98 5.48 18 9 18z"/><path fill="#FBBC05" d="M3.97 10.7A5.4 5.4 0 0 1 3.68 9c0-.59.1-1.17.29-1.7V4.97H.96A8.99 8.99 0 0 0 0 9c0 1.45.35 2.83.96 4.03l3.01-2.33z"/><path fill="#EA4335" d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.97l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z"/></svg>';

  function signInGoogle(onError, onSuccess) {
    if (!firebaseReady()) { onError && onError("Login ainda nao foi configurado neste site (veja firebase-config.js)."); return; }
    fbAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(function () { onSuccess && onSuccess(); })
      .catch(function (e) { onError && onError(authTranslateError(e)); });
  }

  function renderAuthGate() {
    setTopbarVisible(false);
    app.innerHTML = "";
    var wrap = el("div", "auth-gate");
    var card = el("div", "auth-gate-card");
    card.appendChild(el("div", "auth-modal-logo", '<img src="Imagens/logo-mba.png" alt="' + esc(root.title) + '" class="auth-logo-img auth-gate-logo-img">'));
    card.appendChild(el("p", "auth-gate-sub", "Faca login com sua conta Google para acessar o curso e acompanhar seu progresso."));
    var errBox = el("div", "auth-message");
    errBox.style.display = "none";
    card.appendChild(errBox);
    var googleBtn = el("button", "btn-google btn-google-full", GOOGLE_ICON_SVG + " Continuar com Google");
    googleBtn.onclick = function () {
      errBox.style.display = "none";
      signInGoogle(function (msg) { errBox.textContent = msg; errBox.style.display = "block"; });
    };
    card.appendChild(googleBtn);
    wrap.appendChild(card);
    app.appendChild(wrap);
  }

  // ---- login modal (Google) ----
  function authTranslateError(err) {
    var code = (err && err.code) || "";
    var map = {
      "auth/popup-closed-by-user": "Login cancelado.",
      "auth/too-many-requests": "Muitas tentativas. Aguarde um momento e tente novamente."
    };
    return map[code] || "Nao foi possivel completar a acao. Tente novamente.";
  }

  function showAuthError(msg) {
    var errBox = document.getElementById("auth-error");
    if (errBox) { errBox.textContent = msg; errBox.style.display = "block"; }
  }
  function clearAuthMessages() {
    var errBox = document.getElementById("auth-error");
    var okBox = document.getElementById("auth-success");
    if (errBox) errBox.style.display = "none";
    if (okBox) okBox.style.display = "none";
  }

  function openAuthModal() {
    var modal = document.getElementById("auth-modal");
    if (!modal) return;
    clearAuthMessages();
    if (!firebaseReady()) {
      showAuthError("Login ainda nao foi configurado neste site (veja firebase-config.js).");
    }
    modal.style.display = "flex";
  }
  function closeAuthModal() {
    var modal = document.getElementById("auth-modal");
    if (modal) modal.style.display = "none";
    clearAuthMessages();
  }

  function initAuth() {
    var openBtn = document.getElementById("btn-open-auth");
    var signoutBtn = document.getElementById("btn-signout");
    var closeBtn = document.getElementById("auth-modal-close");
    var backdrop = document.getElementById("auth-modal-backdrop");
    var googleBtn = document.getElementById("auth-google-btn");

    if (openBtn) openBtn.onclick = openAuthModal;
    if (closeBtn) closeBtn.onclick = closeAuthModal;
    if (backdrop) backdrop.onclick = closeAuthModal;
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeAuthModal();
    });
    if (signoutBtn) signoutBtn.onclick = function () { if (fbAuth) fbAuth.signOut(); };

    if (googleBtn) {
      googleBtn.onclick = function () {
        clearAuthMessages();
        signInGoogle(showAuthError, closeAuthModal);
      };
    }

    if (!firebaseReady()) { buildApp(); return; }
    try {
      firebase.initializeApp(window.FIREBASE_CONFIG);
      fbAuth = firebase.auth();
      fbDb = firebase.firestore();
    } catch (e) { console.warn("Firebase indisponivel:", e); buildApp(); return; }

    app.innerHTML = '<div class="auth-loading">Carregando...</div>';
    fbAuth.onAuthStateChanged(function (user) {
      cloudUser = user;
      updateAuthUI(user);
      if (user) {
        loadCloudProgress(user.uid);
      } else {
        disposePlayer();
        renderAuthGate();
      }
    });
  }

  // ---- helpers ----
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }
  function esc(s) {
    return (s || "").replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function scrollToEl(node) {
    try { node.scrollIntoView({ behavior: "smooth", block: "start" }); } catch (e) {}
  }

  var app = document.getElementById("app");

  // ---- live UI refs (updated in place so progress changes don't tear down an active player) ----
  var moduleRowRefs = {}; // moduleId -> { row, body, node, barFillEl, metaEl }
  var heroRefs = null;

  function updateTopbarPill() {
    var pill = document.getElementById("progress-pill");
    if (!pill) return;
    var totalAulas = 0, totalDone = 0;
    root.modules.forEach(function (m) {
      var p = moduleProgress(m);
      totalAulas += p.total; totalDone += p.done;
    });
    var pct = totalAulas ? Math.round((totalDone / totalAulas) * 100) : 0;
    pill.textContent = totalDone + " / " + totalAulas + " · " + pct + "%";
  }

  function refreshProgressBars() {
    updateTopbarPill();
    var totalAulas = 0, totalDone = 0;
    root.modules.forEach(function (m) {
      var p = moduleProgress(m);
      totalAulas += p.total; totalDone += p.done;
      var ref = moduleRowRefs[m.id];
      if (ref) {
        var pct = p.total ? Math.round((p.done / p.total) * 100) : 0;
        ref.barFillEl.style.width = pct + "%";
        ref.metaEl.textContent = p.total + " aulas" + (p.done ? " · " + p.done + "/" + p.total + " concluidas" : "");
      }
    });
    if (heroRefs) {
      var pct2 = totalAulas ? Math.round((totalDone / totalAulas) * 100) : 0;
      heroRefs.doneEl.textContent = String(totalDone);
      heroRefs.pctEl.textContent = pct2 + "%";
      heroRefs.barFillEl.style.width = pct2 + "%";
      heroRefs.labelEl.textContent = totalDone + " / " + totalAulas + " aulas concluidas (" + pct2 + "%)";
    }
  }

  // ---- inline video player (single active instance, mounted wherever the user is) ----
  var currentPlayer = null;
  var currentPlayerHost = null;

  function disposePlayer() {
    if (currentPlayer) { try { currentPlayer.dispose(); } catch (e) {} }
    currentPlayer = null;
    currentPlayerHost = null;
  }

  function playAula(aula, siblings, playerSlot, cardEls) {
    if (!aula.src) return;
    disposePlayer();
    Object.keys(cardEls).forEach(function (id) {
      cardEls[id].classList.toggle("playing", id === aula.id);
    });
    setLastAula(aula.id);

    playerSlot.innerHTML = "";
    var frame = el("div", "player-frame");
    var videoId = "vp_" + aula.id.replace(/[^a-z0-9]/gi, "_") + "_" + Date.now();
    frame.innerHTML =
      '<video id="' + videoId + '" class="video-js vjs-big-play-centered" controls preload="auto" ' +
      'data-setup=\'{"playbackRates":[0.5,1,1.25,1.5,1.75,2],"fluid":true}\'>' +
      '<source src="' + esc(aula.src) + '" type="application/x-mpegURL">' +
      (aula.vtt ? '<track src="' + esc(aula.vtt) + '" kind="captions" srclang="pt" label="Portugues (BR)">' : '') +
      '</video>';
    playerSlot.appendChild(frame);
    playerSlot.appendChild(el("div", "player-title", esc(aula.name)));

    var actions = el("div", "player-actions");
    var idx = siblings.findIndex(function (s) { return s.id === aula.id; });
    var prev = idx > 0 ? siblings[idx - 1] : null;
    var next = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : null;

    var prevBtn = el("button", "btn", "&larr; Anterior");
    if (!prev) prevBtn.disabled = true;
    else prevBtn.onclick = function () { playAula(prev, siblings, playerSlot, cardEls); scrollToEl(playerSlot); };
    actions.appendChild(prevBtn);

    var doneBtn = el("button", "btn gold" + (isDone(aula.id) ? " done" : ""), isDone(aula.id) ? "&#10003; Concluida" : "Marcar como concluida");
    doneBtn.onclick = function () {
      toggleDone(aula.id);
      doneBtn.classList.toggle("done");
      doneBtn.innerHTML = isDone(aula.id) ? "&#10003; Concluida" : "Marcar como concluida";
      markCardDone(cardEls[aula.id], aula.id);
      refreshProgressBars();
    };
    actions.appendChild(doneBtn);

    var nextBtn = el("button", "btn", "Proxima &rarr;");
    if (!next) nextBtn.disabled = true;
    else nextBtn.onclick = function () { playAula(next, siblings, playerSlot, cardEls); scrollToEl(playerSlot); };
    actions.appendChild(nextBtn);

    playerSlot.appendChild(actions);
    currentPlayerHost = playerSlot;

    setTimeout(function () {
      try {
        currentPlayer = videojs(videoId);
        if (currentPlayer.hlsQualitySelector) {
          currentPlayer.hlsQualitySelector({ displayCurrentQuality: true });
        }
        currentPlayer.on("ended", function () {
          setDone(aula.id, true);
          markCardDone(cardEls[aula.id], aula.id);
          refreshProgressBars();
          if (next) playAula(next, siblings, playerSlot, cardEls);
        });
      } catch (e) { /* video.js may not be loaded yet */ }
    }, 30);
  }

  function markCardDone(cardEl, aulaId) {
    if (!cardEl) return;
    var check = cardEl.querySelector(".aula-card-check");
    if (!check) return;
    var done = isDone(aulaId);
    check.classList.toggle("done", done);
    check.innerHTML = done ? "&#10003;" : "";
  }

  // ---- aula cards + carousel ----
  function buildAulaCard(a) {
    var card = el("div", "aula-card" + (a.src ? "" : " unavailable"));
    card.appendChild(el("span", "aula-card-check" + (isDone(a.id) ? " done" : ""), isDone(a.id) ? "&#10003;" : ""));
    card.appendChild(el("span", "aula-card-code", a.num ? ("Aula " + a.num) : "▶"));
    card.appendChild(el("div", "aula-card-title", esc(a.name)));
    if (!a.src) card.appendChild(el("div", "aula-card-meta", "indisponivel"));
    return card;
  }

  function buildAulasSection(containerNode, aulas) {
    var wrap = el("div", "aulas-wrap");
    wrap.appendChild(el("div", "section-title", "Aulas"));
    var playerSlot = el("div", "player-slot");
    var track = el("div", "carousel-track aulas-track");
    var cardEls = {};
    aulas.forEach(function (a) {
      var card = buildAulaCard(a);
      cardEls[a.id] = card;
      if (a.src) card.onclick = function () { playAula(a, aulas, playerSlot, cardEls); scrollToEl(playerSlot); };
      track.appendChild(card);
    });
    wrap.appendChild(playerSlot);
    wrap.appendChild(track);
    containerNode._aulaRefs = { playerSlot: playerSlot, cardEls: cardEls, aulas: aulas };
    return wrap;
  }

  // ---- materials (files) carousel — shown before the aulas, per request ----
  function buildMaterialChip(f) {
    var a = el("a", "material-chip");
    a.href = "." + f.path.split("/").map(encodeURIComponent).join("/");
    a.target = "_blank";
    a.appendChild(el("span", "material-ext", (f.ext || "arq").replace(/^\./, "").toUpperCase()));
    a.appendChild(el("span", "material-name", esc(f.name)));
    return a;
  }

  function buildMaterialsCarousel(files) {
    var wrap = el("div", "materials-wrap");
    wrap.appendChild(el("div", "section-title", "Material de apoio"));
    var track = el("div", "carousel-track materials-track");
    files.forEach(function (f) { track.appendChild(buildMaterialChip(f)); });
    wrap.appendChild(track);
    return wrap;
  }

  // ---- submodule (folder) card + panel ----
  function buildSubmoduleCard(f, idx) {
    var p = moduleProgress(f);
    var pct = p.total ? Math.round((p.done / p.total) * 100) : 0;
    var card = el("div", "card carousel-card");
    var cover = el("div", "card-cover");
    cover.style.background = GRADIENTS[idx % GRADIENTS.length];
    if (f.code) cover.appendChild(el("span", "card-code", f.code));
    card.appendChild(cover);
    var body = el("div", "card-body");
    body.appendChild(el("div", "card-title", esc(f.title || f.name)));
    var meta = el("div", "card-meta");
    meta.appendChild(el("span", "", p.total + " aulas"));
    if (p.done === p.total && p.total > 0) meta.appendChild(el("span", "card-check", "&#10003; completo"));
    else if (p.done > 0) meta.appendChild(el("span", "", p.done + "/" + p.total));
    body.appendChild(meta);
    var barWrap = el("div", "card-bar");
    var fill = el("div", "card-bar-fill");
    fill.style.width = pct + "%";
    barWrap.appendChild(fill);
    body.appendChild(barWrap);
    card.appendChild(body);
    return card;
  }

  function buildFolderPanel(folder) {
    var panel = el("div", "folder-panel");
    var materialFolders = (folder.children || []).filter(function (c) { return c.type === "folder"; });
    var files = [];
    materialFolders.forEach(function (mf) {
      (mf.children || []).forEach(function (file) { if (file.type === "file") files.push(file); });
    });
    var aulas = (folder.children || []).filter(function (c) { return c.type === "aula"; });
    var p = moduleProgress(folder);

    var header = el("div", "folder-panel-header");
    header.appendChild(el("div", "folder-panel-title", esc(folder.title || folder.name)));
    if (p.total) header.appendChild(el("div", "folder-panel-meta", p.done + " / " + p.total + " aulas concluidas"));
    panel.appendChild(header);

    if (files.length) panel.appendChild(buildMaterialsCarousel(files));
    if (aulas.length) panel.appendChild(buildAulasSection(folder, aulas));
    if (!files.length && !aulas.length) panel.appendChild(el("div", "empty", "Nada por aqui ainda."));
    return panel;
  }

  function toggleFolderPanel(folder, panelSlot, cardEls, forceOpen) {
    var openId = panelSlot.dataset.openId || "";
    if (openId === folder.id && !forceOpen) {
      if (currentPlayerHost && panelSlot.contains(currentPlayerHost)) disposePlayer();
      panelSlot.innerHTML = "";
      panelSlot.dataset.openId = "";
      cardEls[folder.id] && cardEls[folder.id].classList.remove("active");
      return;
    }
    if (openId === folder.id && forceOpen) return;
    if (currentPlayerHost && panelSlot.contains(currentPlayerHost)) disposePlayer();
    Object.keys(cardEls).forEach(function (id) { cardEls[id].classList.toggle("active", id === folder.id); });
    panelSlot.innerHTML = "";
    panelSlot.appendChild(buildFolderPanel(folder));
    panelSlot.dataset.openId = folder.id;
  }

  // ---- module body (opens inline below the module row header) ----
  function buildModuleBody(node) {
    var wrap = el("div", "module-body-inner");
    var folders = (node.children || []).filter(function (c) { return c.type === "folder"; });
    var directAulas = (node.children || []).filter(function (c) { return c.type === "aula"; });
    var directFiles = (node.children || []).filter(function (c) { return c.type === "file"; });

    if (folders.length) {
      wrap.appendChild(el("div", "section-title", "Submodulos"));
      var track = el("div", "carousel-track");
      var panelSlot = el("div", "folder-panel-slot");
      var cardEls = {};
      folders.forEach(function (f, idx) {
        var card = buildSubmoduleCard(f, idx);
        cardEls[f.id] = card;
        card.onclick = function () { toggleFolderPanel(f, panelSlot, cardEls); scrollToEl(panelSlot); };
        track.appendChild(card);
      });
      wrap.appendChild(track);
      wrap.appendChild(panelSlot);
      node._panelSlot = panelSlot;
      node._cardEls = cardEls;
    }

    if (directFiles.length) wrap.appendChild(buildMaterialsCarousel(directFiles));
    if (directAulas.length) wrap.appendChild(buildAulasSection(node, directAulas));

    if (!folders.length && !directAulas.length && !directFiles.length) {
      wrap.appendChild(el("div", "empty", "Nada por aqui ainda."));
    }
    return wrap;
  }

  function toggleModuleRow(node, row, body, forceOpen) {
    var isOpen = row.classList.contains("open");
    if (isOpen && !forceOpen) {
      if (currentPlayerHost && body.contains(currentPlayerHost)) disposePlayer();
      row.classList.remove("open");
      body.innerHTML = "";
      return;
    }
    if (isOpen && forceOpen) return;
    row.classList.add("open");
    body.innerHTML = "";
    body.appendChild(buildModuleBody(node));
  }

  // ---- module row (one per line, stacked) ----
  function buildModuleRow(node, i) {
    var row = el("div", "module-row");
    var body = el("div", "module-row-body");

    var header = el("div", "module-row-header");
    var thumb = el("div", "module-thumb");
    thumb.style.background = GRADIENTS[i % GRADIENTS.length];
    thumb.appendChild(el("div", "module-thumb-icon", MODULE_ICONS[i % MODULE_ICONS.length]));
    header.appendChild(thumb);

    var info = el("div", "module-row-info");
    var topline = el("div", "module-row-topline");
    if (node.code) topline.appendChild(el("span", "module-row-code", node.code));
    topline.appendChild(el("span", "module-row-title", esc(node.title || node.name)));
    info.appendChild(topline);
    var p = moduleProgress(node);
    var metaEl = el("div", "module-row-meta", p.total + " aulas" + (p.done ? " · " + p.done + "/" + p.total + " concluidas" : ""));
    info.appendChild(metaEl);
    header.appendChild(info);

    var barWrap = el("div", "module-row-bar");
    var barFill = el("div", "module-row-bar-fill");
    var pct = p.total ? Math.round((p.done / p.total) * 100) : 0;
    barFill.style.width = pct + "%";
    barWrap.appendChild(barFill);
    header.appendChild(barWrap);
    header.appendChild(el("div", "module-chevron", "&#9662;"));

    header.onclick = function () { toggleModuleRow(node, row, body); };

    row.appendChild(header);
    row.appendChild(body);

    moduleRowRefs[node.id] = { row: row, body: body, node: node, barFillEl: barFill, metaEl: metaEl };
    return row;
  }

  // ---- reveal a specific aula from search / continue-watching (opens everything inline) ----
  function revealAula(aulaId) {
    var aula = byId[aulaId];
    if (!aula) return;
    var directParentId = parentOf[aula.id];
    var moduleId, folder;
    if (moduleIdSet[directParentId]) { moduleId = directParentId; folder = null; }
    else { folder = byId[directParentId]; moduleId = parentOf[folder.id]; }

    var refs = moduleRowRefs[moduleId];
    if (!refs) return;
    if (!refs.row.classList.contains("open")) toggleModuleRow(refs.node, refs.row, refs.body, true);

    if (folder) {
      var panelSlot = refs.node._panelSlot;
      var cardEls = refs.node._cardEls;
      if (!panelSlot || !cardEls) return;
      toggleFolderPanel(folder, panelSlot, cardEls, true);
      var aRefs = folder._aulaRefs;
      if (aRefs) playAula(aula, aRefs.aulas, aRefs.playerSlot, aRefs.cardEls);
    } else {
      var aRefs2 = refs.node._aulaRefs;
      if (aRefs2) playAula(aula, aRefs2.aulas, aRefs2.playerSlot, aRefs2.cardEls);
    }
    scrollToEl(refs.row);
  }

  // ---- hero ----
  function buildHero() {
    var totalAulas = 0, totalDone = 0;
    root.modules.forEach(function (m) {
      var p = moduleProgress(m);
      totalAulas += p.total; totalDone += p.done;
    });
    var pct = totalAulas ? Math.round((totalDone / totalAulas) * 100) : 0;

    var hero = el("div", "hero");
    hero.appendChild(el("div", "kicker", "Plataforma de estudos"));
    hero.appendChild(el("h1", "", esc(root.title)));
    hero.appendChild(el("p", "", "Trilha completa de investimentos, alocacao de ativos e mercado de capitais"));

    var stats = el("div", "hero-stats");
    var s1 = el("div", "stat-card");
    s1.appendChild(el("div", "stat-value", String(root.modules.length)));
    s1.appendChild(el("div", "stat-label", "Modulos"));
    var s2 = el("div", "stat-card");
    s2.appendChild(el("div", "stat-value", String(totalAulas)));
    s2.appendChild(el("div", "stat-label", "Aulas"));
    var s3 = el("div", "stat-card");
    var doneEl = el("div", "stat-value", String(totalDone));
    s3.appendChild(doneEl);
    s3.appendChild(el("div", "stat-label", "Concluidas"));
    var s4 = el("div", "stat-card");
    var pctEl = el("div", "stat-value", pct + "%");
    s4.appendChild(pctEl);
    s4.appendChild(el("div", "stat-label", "Progresso"));
    stats.appendChild(s1); stats.appendChild(s2); stats.appendChild(s3); stats.appendChild(s4);
    hero.appendChild(stats);

    var bar = el("div", "hero-progress");
    var barFill = el("div", "hero-progress-bar");
    barFill.style.width = pct + "%";
    bar.appendChild(barFill);
    hero.appendChild(bar);
    var label = el("div", "hero-progress-label", totalDone + " / " + totalAulas + " aulas concluidas (" + pct + "%)");
    hero.appendChild(label);

    heroRefs = { doneEl: doneEl, pctEl: pctEl, barFillEl: barFill, labelEl: label };

    var lastId = getLastAula();
    var lastAula = lastId ? byId[lastId] : null;
    if (lastAula && lastAula.src) {
      var parent = byId[parentOf[lastAula.id]];
      var cc = el("div", "continue-card");
      cc.appendChild(el("div", "cc-play", isDone(lastAula.id) ? "&#10003;" : "▶"));
      var body = el("div", "cc-body");
      body.appendChild(el("div", "cc-label", "Continuar assistindo"));
      body.appendChild(el("div", "cc-title", esc(lastAula.name)));
      body.appendChild(el("div", "cc-sub", parent ? esc(parent.title || parent.name) : ""));
      cc.appendChild(body);
      cc.appendChild(el("div", "cc-arrow", "&rarr;"));
      cc.onclick = function () { revealAula(lastAula.id); };
      hero.appendChild(cc);
    }
    return hero;
  }

  // ---- boot ----
  function buildApp() {
    app.innerHTML = "";
    var page = el("div", "page");
    page.appendChild(buildHero());

    var heading = el("div", "section-heading");
    heading.appendChild(el("h2", "", "Modulos do curso"));
    heading.appendChild(el("span", "", root.modules.length + " modulos"));
    page.appendChild(heading);

    var list = el("div", "module-list");
    root.modules.forEach(function (m, i) { list.appendChild(buildModuleRow(m, i)); });
    page.appendChild(list);

    app.appendChild(page);
    updateTopbarPill();
  }

  // ---- search ----
  function buildSearchIndex() {
    var idx = [];
    function walk(node) {
      (node.children || []).forEach(function (c) {
        if (c.type === "aula" && c.src) idx.push(c);
        else if (c.type === "folder") walk(c);
      });
    }
    root.modules.forEach(walk);
    return idx;
  }
  var searchIndex = buildSearchIndex();

  function setupSearch() {
    var input = document.getElementById("search-input");
    var results = document.getElementById("search-results");
    if (!input) return;
    input.addEventListener("input", function () {
      var q = input.value.trim().toLowerCase();
      results.innerHTML = "";
      if (q.length < 2) { results.style.display = "none"; return; }
      var matches = searchIndex.filter(function (a) {
        return a.name.toLowerCase().indexOf(q) !== -1;
      }).slice(0, 12);
      if (!matches.length) {
        results.style.display = "block";
        results.innerHTML = '<div class="row" style="cursor:default">Nada encontrado</div>';
        return;
      }
      results.style.display = "block";
      matches.forEach(function (a) {
        var parent = byId[parentOf[a.id]];
        var row = el("div", "row");
        row.onclick = function () {
          input.value = "";
          results.style.display = "none";
          revealAula(a.id);
        };
        row.appendChild(el("span", "check", ""));
        row.appendChild(el("span", "code", a.num ? ("A" + a.num) : "▶"));
        row.appendChild(el("span", "title", esc(a.name)));
        row.appendChild(el("span", "meta", parent ? esc(parent.title || parent.name).slice(0, 18) : ""));
        results.appendChild(row);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    setupSearch();
    initAuth();
  });
  if (document.readyState !== "loading") { setupSearch(); initAuth(); }
})();
