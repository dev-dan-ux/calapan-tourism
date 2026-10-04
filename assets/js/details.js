/* Destination details page: kinukuha ang data sa assets/js/data.js gamit ang ?id= sa URL */
(function () {
  var E = CT.esc, id = CT.param("id");
  var dest = CT.find(id);
  var root = document.getElementById("detail-root");
  var user = CT.currentUser();

  if (!dest) { location.replace("destinations.html"); return; }
  document.title = dest.name + " - Calapan Tourism";
  document.getElementById("crumb-name").textContent = dest.name;

  var isRestaurant = dest.type === "restaurant";
  var isStay = (dest.type === "hotel" || dest.type === "resort") && dest.rooms.length > 0;
  var priceText = dest.price_from > 0 ? CT.peso(dest.price_from) : "Free";
  var h = "";

  /* ---- Hero ---- */
  h += '<div class="detail-card"><img src="' + E(dest.image) + '" alt="' + E(dest.name) + '" class="hero-image">' +
    '<div class="detail-content"><div class="row"><div class="col-lg-8">' +
    '<h1 class="display-4">' + E(dest.name) + '</h1><div class="mb-4">' +
    '<span class="info-badge"><i class="bi bi-tag"></i> ' + E(CT.cap(dest.type)) + '</span>' +
    (dest.featured ? ' <span class="info-badge" style="background:#ffd700;color:#333;"><i class="bi bi-star-fill"></i> Featured</span>' : '') +
    '</div><p class="lead">' + E(dest.description) + '</p><div class="row mt-4">' +
    '<div class="col-md-6"><h5><i class="bi bi-geo-alt-fill text-primary"></i> Location</h5><p>' + E(dest.address) + '</p></div>' +
    (dest.hours ? '<div class="col-md-6"><h5><i class="bi bi-clock-fill text-primary"></i> Operating Hours</h5><p>' + E(dest.hours) + '</p></div>' : '') +
    ((dest.phone || dest.email) ? '<div class="col-md-6"><h5><i class="bi bi-telephone-fill text-primary"></i> Contact</h5><p>' +
      (dest.phone ? '<i class="bi bi-phone"></i> ' + E(dest.phone) + '<br>' : '') +
      (dest.email ? '<i class="bi bi-envelope"></i> ' + E(dest.email) : '') + '</p></div>' : '') +
    '</div></div><div class="col-lg-4"><div class="text-center p-4" style="background:#f8f9fa;border-radius:15px;">' +
    '<div class="price-highlight">' + priceText + '</div><p class="text-muted">Starting Price</p>' +
    (user
      ? '<a href="#booking-section" class="btn btn-book"><i class="bi bi-calendar-check"></i> Book Now</a>'
      : '<a href="login.html?redirect=' + encodeURIComponent("destination-details.html?id=" + dest.id) + '" class="btn btn-book"><i class="bi bi-box-arrow-in-right"></i> Login to Book</a>') +
    '</div></div></div></div></div>';

  /* ---- Gallery ---- */
  if (dest.gallery.length) {
    h += '<div class="detail-card"><div class="detail-content"><h2 class="section-title"><i class="bi bi-images"></i> Photo Gallery</h2><div class="gallery-grid">' +
      dest.gallery.map(function (g) {
        return '<div class="gallery-item"><a href="' + E(g.image) + '" class="glightbox" data-gallery="gallery1"><img src="' + E(g.image) + '" alt="' + E(g.caption) + '"></a></div>';
      }).join("") + '</div></div></div>';
  }

  /* ---- Services ---- */
  if (dest.services.length) {
    h += '<div class="detail-card"><div class="detail-content"><h2 class="section-title"><i class="bi bi-star"></i> Services &amp; Amenities</h2><div class="services-grid">' +
      dest.services.map(function (s) {
        var p = s.split("|");
        return '<div class="service-card"><div class="service-icon"><i class="bi bi-' + E(p[0]) + '"></i></div><h5>' + E(p[1]) + '</h5></div>';
      }).join("") + '</div></div></div>';
  }

  /* ---- Menu ---- */
  if (isRestaurant && dest.menu && dest.menu.length) {
    var cats = {};
    dest.menu.forEach(function (m) { (cats[m.category] = cats[m.category] || []).push(m); });
    h += '<div class="detail-card"><div class="detail-content"><h2 class="section-title"><i class="bi bi-cup-hot"></i> Our Menu</h2>';
    Object.keys(cats).forEach(function (c) {
      h += '<div class="menu-category"><h3 class="text-primary mb-4">' + E(c) + '</h3><div class="row">' +
        cats[c].map(function (m) {
          return '<div class="col-lg-4 col-md-6 mb-4"><div class="menu-item-card">' +
            '<div class="menu-item-img" style="background:linear-gradient(135deg,#ab3000 0%,#981d05 100%);display:flex;align-items:center;justify-content:center;"><i class="bi bi-image" style="font-size:3rem;color:white;"></i></div>' +
            '<div class="menu-item-body"><h5>' + E(m.name) + '</h5><p class="text-muted small">' + E(m.description) + '</p>' +
            '<div class="d-flex justify-content-between align-items-center"><span class="menu-price">' + CT.peso(m.price) + '</span>' +
            (user ? '<input type="checkbox" class="menu-checkbox" value="' + m.id + '" data-price="' + m.price + '" data-name="' + E(m.name) + '">' : '') +
            '</div></div></div></div>';
        }).join("") + '</div></div>';
    });
    h += '</div></div>';
  }

  /* ---- Accommodation ---- */
  if (isStay) {
    h += '<div class="detail-card"><div class="detail-content"><h2 class="section-title"><i class="bi bi-house-door"></i> Accommodation Options</h2>' +
      dest.rooms.map(function (a) {
        return '<div class="accom-card"><div class="row g-0"><div class="col-md-5">' +
          '<div class="accom-img" style="background:linear-gradient(135deg,#ab3000 0%,#981d05 100%);display:flex;align-items:center;justify-content:center;"><i class="bi bi-building" style="font-size:4rem;color:white;"></i></div>' +
          '</div><div class="col-md-7"><div class="accom-details"><div class="d-flex justify-content-between align-items-start"><div>' +
          '<h3>' + E(a.name) + '</h3><p class="text-muted"><i class="bi bi-people"></i> Max ' + a.guests + ' Guests</p></div>' +
          '<div class="text-end"><div class="h2 text-primary mb-0">' + CT.peso(a.price) + '</div><small class="text-muted">per night</small></div></div>' +
          '<p class="mt-3">' + E(a.description) + '</p><div class="mt-3"><strong>Amenities:</strong><br>' +
          a.amenities.split(",").map(function (x) { return '<span class="amenity-badge">' + E(x.trim()) + '</span>'; }).join("") + '</div>' +
          (user ? '<div class="mt-3"><label class="d-flex align-items-center" style="cursor:pointer;"><input type="radio" name="selected_accommodation" class="accom-radio" value="' + a.id + '" data-price="' + a.price + '" data-name="' + E(a.name) + '"><span>Select this room</span></label></div>' : '') +
          '</div></div></div></div>';
      }).join("") + '</div></div>';
  }

  /* ---- Map ---- */
  var q = encodeURIComponent(dest.address || (dest.name + ", Calapan City"));
  h += '<div class="detail-card"><div class="detail-content"><h2 class="section-title"><i class="bi bi-map"></i> Location &amp; Directions</h2>' +
    '<p class="text-muted">From Calapan Pier to ' + E(dest.name) + '</p><div style="border-radius:15px;overflow:hidden;">' +
    '<iframe width="100%" height="450" style="border:0" allowfullscreen loading="lazy" src="https://www.google.com/maps?q=' + encodeURIComponent(dest.name + ", Calapan City, Oriental Mindoro") + '&output=embed"></iframe></div>' +
    '<p class="mt-3"><a href="https://www.google.com/maps/dir/?api=1&origin=' + encodeURIComponent("Calapan Pier, Calapan City") + '&destination=' + q + '" target="_blank" rel="noopener" class="btn btn-outline-primary"><i class="bi bi-box-arrow-up-right"></i> Open in Google Maps</a></p></div></div>';

  /* ---- Booking form ---- */
  if (user) {
    h += '<div id="booking-section" class="booking-section"><h2 class="text-white mb-4"><i class="bi bi-calendar-check"></i> Make Your Reservation</h2>' +
      '<p class="text-white-50">Fill in the details below to complete your booking</p><div class="booking-form"><form id="bookingForm">';
    if (isRestaurant) {
      h += '<div class="alert alert-info"><i class="bi bi-info-circle"></i> Please select menu items from above, then fill in your reservation details here.</div>' +
        '<div class="row"><div class="col-md-6 mb-3"><label class="form-label fw-bold">Reservation Date *</label><input type="date" class="form-control form-control-lg" name="check_in_date" min="' + CT.today() + '" required></div>' +
        '<div class="col-md-6 mb-3"><label class="form-label fw-bold">Reservation Time *</label><input type="time" class="form-control form-control-lg" name="reservation_time" required></div></div>';
    } else if (isStay) {
      h += '<div class="alert alert-info"><i class="bi bi-info-circle"></i> Please select an accommodation type from above, then complete your booking details here.</div>' +
        '<div class="row"><div class="col-md-6 mb-3"><label class="form-label fw-bold">Check-in Date *</label><input type="date" class="form-control form-control-lg" name="check_in_date" id="check_in_date" min="' + CT.today() + '" required></div>' +
        '<div class="col-md-6 mb-3"><label class="form-label fw-bold">Check-out Date *</label><input type="date" class="form-control form-control-lg" name="check_out_date" id="check_out_date" required></div></div>';
    } else {
      h += '<div class="mb-3"><label class="form-label fw-bold">Visit Date *</label><input type="date" class="form-control form-control-lg" name="check_in_date" min="' + CT.today() + '" required></div>';
    }
    h += '<div class="mb-3"><label class="form-label fw-bold">Number of Guests *</label><input type="number" class="form-control form-control-lg" name="number_of_guests" min="1" value="1" required></div>' +
      '<div class="mb-3"><label class="form-label fw-bold">Special Requests (Optional)</label><textarea class="form-control" name="special_requests" rows="4" placeholder="Any dietary restrictions, accessibility needs, or special occasions..."></textarea></div>' +
      '<div class="mb-4"><label class="form-label fw-bold">Payment Option *</label><select name="payment_option" class="form-select form-select-lg" required><option value="pay_at_venue">Pay at Venue</option><option value="pay_now">Pay Now (Simulation)</option></select></div>' +
      '<div class="alert alert-light" id="estimatedTotal" style="display:none;"><h5>Estimated Total: <span class="text-primary" id="totalAmount">₱0.00</span></h5></div>' +
      '<button type="submit" class="btn btn-book"><i class="bi bi-check-circle"></i> Confirm Reservation</button></form></div></div>';
  }

  root.innerHTML = h;
  if (window.GLightbox) GLightbox({ selector: ".glightbox" });

  if (!user) return;

  /* ---- Booking behaviour ---- */
  var form = document.getElementById("bookingForm");
  var cin = document.getElementById("check_in_date"), cout = document.getElementById("check_out_date");
  var link = document.querySelector('a[href="#booking-section"]');
  if (link) link.addEventListener("click", function (e) { e.preventDefault(); document.getElementById("booking-section").scrollIntoView({ behavior: "smooth" }); });

  function nights() {
    if (!cin || !cin.value || !cout.value) return 0;
    return Math.max(0, Math.ceil((new Date(cout.value) - new Date(cin.value)) / 86400000));
  }
  function guests() { return Math.max(1, parseInt(form.number_of_guests.value, 10) || 1); }
  function total() {
    if (isRestaurant) {
      var t = 0; document.querySelectorAll(".menu-checkbox:checked").forEach(function (c) { t += parseFloat(c.dataset.price); });
      return t;
    }
    if (isStay) {
      var r = document.querySelector(".accom-radio:checked");
      return r ? parseFloat(r.dataset.price) * nights() : 0;
    }
    return dest.price_from * guests();
  }
  function update() {
    var t = total(), box = document.getElementById("estimatedTotal");
    document.getElementById("totalAmount").textContent = CT.peso(t);
    box.style.display = t > 0 ? "block" : "none";
  }

  document.querySelectorAll(".menu-checkbox").forEach(function (c) { c.addEventListener("change", update); });
  document.querySelectorAll(".accom-radio").forEach(function (r) {
    r.addEventListener("change", function () {
      document.querySelectorAll(".accom-card").forEach(function (c) { c.classList.remove("selected"); });
      this.closest(".accom-card").classList.add("selected");
      update();
    });
  });
  if (cin && cout) {
    var plusOne = function (v) { var d = new Date(v); d.setDate(d.getDate() + 1); return d.toISOString().split("T")[0]; };
    var d1 = new Date(); d1.setDate(d1.getDate() + 1); cout.min = d1.toISOString().split("T")[0];
    cin.addEventListener("change", function () {
      cout.min = plusOne(this.value);
      if (cout.value && new Date(cout.value) <= new Date(this.value)) cout.value = cout.min;
      update();
    });
    cout.addEventListener("change", update);
  }
  form.number_of_guests.addEventListener("input", update);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var menuPicked = [], room = null;
    if (isRestaurant) {
      document.querySelectorAll(".menu-checkbox:checked").forEach(function (c) { menuPicked.push(c.dataset.name); });
      if (!menuPicked.length) { alert("Please select at least one menu item."); return; }
    }
    if (isStay) {
      var r = document.querySelector(".accom-radio:checked");
      if (!r) { alert("Please select an accommodation type."); return; }
      room = r.dataset.name;
      if (nights() < 1) { alert("Check-out must be after check-in."); return; }
    }
    CT.addBooking({
      user_id: user.id, establishment_id: dest.id, name: dest.name, type: dest.type, image: dest.image,
      phone: dest.phone || "", check_in_date: form.check_in_date.value,
      check_out_date: cout ? cout.value : "", reservation_time: form.reservation_time ? form.reservation_time.value : "",
      guests: guests(), room: room, menu: menuPicked, total: total(),
      special_requests: form.special_requests.value.trim(),
      payment_status: form.payment_option.value === "pay_now" ? "paid" : "unpaid"
    });
    location.href = "my-bookings.html?booked=1";
  });
})();
