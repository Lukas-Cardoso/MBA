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

  var app = document.getElementById("app");

  function render() {
    var hash = location.hash.replace(/^#\/?/, "");
    window.scrollTo(0, 0);
    if (!hash) return renderHome();
    var parts = hash.split("/");
    var id = parts[0];
    var node = byId[id];
    if (!node) return renderHome();
    if (node.type === "aula") return renderPlayer(node);
    return renderFolder(node);
  }

  function breadcrumbPath(node) {
    var chain = [];
    var cur = node;
    while (cur) {
      chain.unshift(cur);
      var pid = parentOf[cur.id];
      cur = pid ? byId[pid] : null;
    }
    return chain;
  }

  function renderCrumbs(node) {
    var chain = breadcrumbPath(node);
    var c = el("div", "crumbs");
    c.appendChild((function () { var a = el("a", "", "Inicio"); a.href = "#/"; return a; })());
    chain.forEach(function (n) {
      c.appendChild(el("span", "sep", "/"));
      if (n.id === node.id) {
        c.appendChild(el("span", "current", esc(n.title || n.name)));
      } else {
        var a = el("a", "", esc(n.title || n.name));
        a.href = "#/" + n.id;
        c.appendChild(a);
      }
    });
    return c;
  }

  function renderHome() {
    app.innerHTML = "";
    var page = el("div", "page");

    var totalAulas = 0, totalDone = 0;
    root.modules.forEach(function (m) {
      var p = moduleProgress(m);
      totalAulas += p.total; totalDone += p.done;
    });
    var pct = totalAulas ? Math.round((totalDone / totalAulas) * 100) : 0;

    var hero = el("div", "hero");
    hero.appendChild(el("h1", "", esc(root.title)));
    hero.appendChild(el("p", "", totalAulas + " aulas &bull; " + root.modules.length + " modulos"));
    var bar = el("div", "hero-progress");
    bar.appendChild(el("div", "hero-progress-bar")).style.width = pct + "%";
    hero.appendChild(bar);
    hero.appendChild(el("div", "hero-progress-label", totalDone + " / " + totalAulas + " aulas concluidas (" + pct + "%)"));
    page.appendChild(hero);

    var grid = el("div", "grid");
    root.modules.forEach(function (m, i) {
      grid.appendChild(moduleCard(m, i));
    });
    page.appendChild(grid);
    app.appendChild(page);
  }

  function moduleCard(node, i) {
    var p = moduleProgress(node);
    var pct = p.total ? Math.round((p.done / p.total) * 100) : 0;
    var a = el("a", "card");
    a.href = "#/" + node.id;
    var cover = el("div", "card-cover");
    cover.style.background = GRADIENTS[i % GRADIENTS.length];
    if (node.code) cover.appendChild(el("span", "card-code", node.code));
    a.appendChild(cover);
    var body = el("div", "card-body");
    body.appendChild(el("div", "card-title", esc(node.title || node.name)));
    var meta = el("div", "card-meta");
    meta.appendChild(el("span", "", p.total + " aulas"));
    if (p.done === p.total && p.total > 0) {
      meta.appendChild(el("span", "card-check", "&#10003; completo"));
    } else if (p.done > 0) {
      meta.appendChild(el("span", "", p.done + "/" + p.total));
    }
    body.appendChild(meta);
    var barWrap = el("div", "card-bar");
    var fill = el("div", "card-bar-fill");
    fill.style.width = pct + "%";
    barWrap.appendChild(fill);
    body.appendChild(barWrap);
    a.appendChild(body);
    return a;
  }

  function renderFolder(node) {
    app.innerHTML = "";
    var page = el("div", "page");
    page.appendChild(renderCrumbs(node));

    var h1 = el("h1", "", "");
    h1.style.fontFamily = "var(--font-display)";
    h1.style.fontSize = "1.5rem";
    h1.style.margin = "4px 0 4px";
    h1.textContent = node.title || node.name;
    page.appendChild(h1);

    var p = moduleProgress(node);
    if (p.total > 0) {
      page.appendChild(el("div", "player-sub", p.done + " / " + p.total + " aulas concluidas"));
    }

    var children = node.children || [];
    var folders = children.filter(function (c) { return c.type === "folder"; });
    var aulas = children.filter(function (c) { return c.type === "aula"; });
    var files = children.filter(function (c) { return c.type === "file"; });

    if (folders.length) {
      page.appendChild(el("div", "section-title", "Submodulos"));
      var grid = el("div", "grid");
      folders.forEach(function (f, i) { grid.appendChild(moduleCard(f, i)); });
      page.appendChild(grid);
    }

    if (aulas.length) {
      page.appendChild(el("div", "section-title", "Aulas"));
      var list = el("div", "list");
      aulas.forEach(function (a) { list.appendChild(aulaRow(a)); });
      page.appendChild(list);
    }

    if (files.length) {
      page.appendChild(el("div", "section-title", "Materiais"));
      var flist = el("div", "list");
      files.forEach(function (f) { flist.appendChild(fileRow(f)); });
      page.appendChild(flist);
    }

    if (!folders.length && !aulas.length && !files.length) {
      page.appendChild(el("div", "empty", "Nada por aqui ainda."));
    }

    app.appendChild(page);
  }

  function aulaRow(a) {
    var row = el(a.src ? "a" : "div", "row" + (a.src ? "" : " unavailable"));
    if (a.src) row.href = "#/" + a.id;
    var check = el("span", "check" + (isDone(a.id) ? " done" : ""), isDone(a.id) ? "&#10003;" : "");
    row.appendChild(check);
    row.appendChild(el("span", "code", a.num ? ("A" + a.num) : "&#9654;"));
    row.appendChild(el("span", "title", esc(a.name)));
    row.appendChild(el("span", "meta", a.src ? "aula" : "indisponivel"));
    return row;
  }

  function fileRow(f) {
    var row = el("a", "row");
    row.href = "." + f.path.split("/").map(encodeURIComponent).join("/");
    row.target = "_blank";
    row.appendChild(el("span", "check", ""));
    row.appendChild(el("span", "code", f.ext));
    row.appendChild(el("span", "title", esc(f.name)));
    row.appendChild(el("span", "meta", "abrir"));
    return row;
  }

  var currentPlayer = null;

  function renderPlayer(aula) {
    if (currentPlayer) { try { currentPlayer.dispose(); } catch (e) {} currentPlayer = null; }
    app.innerHTML = "";
    var page = el("div", "page player-wrap");
    var parent = byId[parentOf[aula.id]];
    page.appendChild(renderCrumbs(aula));

    if (!aula.src) {
      page.appendChild(el("div", "no-video", "Video desta aula nao esta disponivel nesta copia.<br>Tente acessar pela plataforma original."));
      app.appendChild(page);
      return;
    }

    var frame = el("div", "player-frame");
    var videoId = "vp_" + aula.id.replace(/[^a-z0-9]/gi, "_");
    frame.innerHTML =
      '<video id="' + videoId + '" class="video-js vjs-big-play-centered" controls preload="auto" ' +
      'data-setup=\'{"playbackRates":[0.5,1,1.25,1.5,1.75,2],"fluid":true}\'>' +
      '<source src="' + esc(aula.src) + '" type="application/x-mpegURL">' +
      (aula.vtt ? '<track src="' + esc(aula.vtt) + '" kind="captions" srclang="pt" label="Portugues (BR)">' : '') +
      '</video>';
    page.appendChild(frame);

    page.appendChild(el("div", "player-title", esc(aula.name)));
    page.appendChild(el("div", "player-sub", (parent ? esc(parent.title || parent.name) : "")));

    var actions = el("div", "player-actions");
    var siblings = parent ? allAulas(parent).length ? (parent.children || []).filter(function (c) { return c.type === "aula"; }) : [] : [];
    var idx = siblings.findIndex(function (s) { return s.id === aula.id; });
    var prev = idx > 0 ? siblings[idx - 1] : null;
    var next = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : null;

    var prevBtn = el("a", "btn", "&larr; Anterior");
    if (prev) prevBtn.href = "#/" + prev.id; else prevBtn.setAttribute("disabled", "true");
    actions.appendChild(prevBtn);

    var doneBtn = el("button", "btn gold" + (isDone(aula.id) ? " done" : ""), isDone(aula.id) ? "&#10003; Concluida" : "Marcar como concluida");
    doneBtn.onclick = function () {
      toggleDone(aula.id);
      doneBtn.classList.toggle("done");
      doneBtn.innerHTML = isDone(aula.id) ? "&#10003; Concluida" : "Marcar como concluida";
    };
    actions.appendChild(doneBtn);

    var nextBtn = el("a", "btn", "Proxima &rarr;");
    if (next) nextBtn.href = "#/" + next.id; else nextBtn.setAttribute("disabled", "true");
    actions.appendChild(nextBtn);

    page.appendChild(actions);

    if (siblings.length > 1) {
      page.appendChild(el("div", "section-title", "Nesta secao"));
      var list = el("div", "list");
      siblings.forEach(function (s) { list.appendChild(aulaRow(s)); });
      page.appendChild(list);
    }

    app.appendChild(page);

    setTimeout(function () {
      try {
        currentPlayer = videojs(videoId);
        if (currentPlayer.hlsQualitySelector) {
          currentPlayer.hlsQualitySelector({ displayCurrentQuality: true });
        }
        currentPlayer.on("ended", function () {
          setDone(aula.id, true);
          if (next) location.hash = "#/" + next.id;
        });
      } catch (e) { /* video.js may not be loaded yet */ }
    }, 30);
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
        var row = el("a", "row");
        row.href = "#/" + a.id;
        row.onclick = function () { input.value = ""; results.style.display = "none"; };
        row.appendChild(el("span", "check", ""));
        row.appendChild(el("span", "code", a.num ? ("A" + a.num) : "&#9654;"));
        var t = el("span", "title", esc(a.name));
        row.appendChild(t);
        row.appendChild(el("span", "meta", parent ? esc(parent.title || parent.name).slice(0, 18) : ""));
        results.appendChild(row);
      });
    });
  }

  window.addEventListener("hashchange", render);
  document.addEventListener("DOMContentLoaded", function () {
    setupSearch();
    render();
  });
  if (document.readyState !== "loading") { setupSearch(); render(); }
})();
