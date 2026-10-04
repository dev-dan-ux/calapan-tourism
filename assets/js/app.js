/* =========================================================
   Calapan Tourism - native JS (walang PHP, walang database)
   Ang accounts at bookings ay naka-save sa localStorage ng browser,
   kaya para sa demo/presentation lang ito at hindi totoong server.
   ========================================================= */
(function () {
  var K_USERS = "ct_users", K_SESSION = "ct_session", K_BOOKINGS = "ct_bookings";

  function read(key, fallback) {
    try { var v = JSON.parse(localStorage.getItem(key)); return v == null ? fallback : v; }
    catch (e) { return fallback; }
  }
  function write(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {} }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function peso(n) {
    return "₱" + Number(n || 0).toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : ""; }
  function shortDate(d) {
    var dt = new Date(d); if (isNaN(dt)) return "";
    return dt.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
  }
  function today() { var d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().split("T")[0]; }
  function param(name) { return new URLSearchParams(location.search).get(name); }
  function safeRedirect(url) { return url && /^[a-z0-9\-_]+\.html(\?[a-z0-9=&\-_]*)?$/i.test(url) ? url : "index.html"; }

  function hash(pw) {
    // simpleng hash lang (demo). Walang tunay na seguridad sa client-side lang.
    var h = 5381; for (var i = 0; i < pw.length; i++) h = ((h << 5) + h + pw.charCodeAt(i)) | 0;
    return "h" + (h >>> 0).toString(16) + "_" + pw.length;
  }

  var CT = {
    esc: esc, peso: peso, cap: cap, shortDate: shortDate, today: today, param: param,

    /* ---------- Auth ---------- */
    currentUser: function () { return read(K_SESSION, null); },

    register: function (f) {
      var users = read(K_USERS, []);
      var email = f.email.trim().toLowerCase(), username = f.username.trim().toLowerCase();
      if (f.password !== f.confirm) return { ok: false, msg: "Passwords do not match" };
      if (users.some(function (u) { return u.email === email || u.username === username; }))
        return { ok: false, msg: "Email or username already exists" };
      users.push({
        id: Date.now(), full_name: f.full_name.trim(), username: username, email: email,
        phone: (f.phone || "").trim(), password: hash(f.password)
      });
      write(K_USERS, users);
      return { ok: true, msg: "Registration successful! You can now login." };
    },

    login: function (email, password) {
      var u = read(K_USERS, []).filter(function (x) {
        return x.email === email.trim().toLowerCase() && x.password === hash(password);
      })[0];
      if (!u) return { ok: false, msg: "Invalid email or password" };
      write(K_SESSION, { id: u.id, name: u.full_name, email: u.email });
      return { ok: true };
    },

    logout: function () {
      try { localStorage.removeItem(K_SESSION); } catch (e) {}
      location.href = "index.html?bye=1";
    },

    /* Nilalagay sa navbar ang Login/Register o My Bookings + Logout */
    renderNav: function () {
      var slot = document.getElementById("nav-auth");
      if (!slot) return;
      var page = location.pathname.split("/").pop() || "index.html";
      var u = CT.currentUser();
      if (u) {
        slot.outerHTML =
          '<li><a href="my-bookings.html" class="' + (page === "my-bookings.html" ? "active" : "") + '">My Bookings</a></li>' +
          '<li class="dropdown"><a href="#"><span>' + esc(u.name) + '</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>' +
          '<ul><li><a href="#" id="nav-logout">Logout</a></li></ul></li>';
        var lo = document.getElementById("nav-logout");
        if (lo) lo.addEventListener("click", function (e) { e.preventDefault(); CT.logout(); });
      } else {
        slot.outerHTML =
          '<li><a href="login.html" class="btn-login ' + (page === "login.html" ? "active" : "") + '">Login</a></li>' +
          '<li><a href="register.html" class="btn-register ' + (page === "register.html" ? "active" : "") + '">Register</a></li>';
      }
    },

    /* ---------- Establishments ---------- */
    all: function () { return window.ESTABLISHMENTS || []; },
    find: function (id) {
      id = Number(id);
      return CT.all().filter(function (e) { return e.id === id; })[0] || null;
    },

    /* ---------- Bookings ---------- */
    bookings: function () {
      var u = CT.currentUser(); if (!u) return [];
      return read(K_BOOKINGS, []).filter(function (b) { return b.user_id === u.id; })
        .sort(function (a, b) { return b.created_at < a.created_at ? -1 : 1; });
    },
    addBooking: function (b) {
      var all = read(K_BOOKINGS, []);
      b.id = Date.now(); b.created_at = new Date().toISOString(); b.status = "pending";
      all.push(b); write(K_BOOKINGS, all); return b;
    },
    cancelBooking: function (id) {
      var u = CT.currentUser(); if (!u) return;
      var all = read(K_BOOKINGS, []);
      all.forEach(function (b) { if (b.id === id && b.user_id === u.id && b.status === "pending") b.status = "cancelled"; });
      write(K_BOOKINGS, all);
    }
  };

  window.CT = CT;
})();
