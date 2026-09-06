document.addEventListener("DOMContentLoaded", function () {
  /* ---------------------------------------------------------
     1. Store hours + open/closed status
     --------------------------------------------------------- */
  // 0 = Sunday ... 6 = Saturday
  const HOURS = {
    0: { open: 7 * 60, close: 14 * 60, label: "7:00 AM – 2:00 PM" },        // Sunday
    1: { open: 7 * 60, close: 21 * 60 + 30, label: "7:00 AM – 10:00 PM" },   // Monday
    2: { open: 7 * 60, close: 21 * 60 + 30, label: "7:00 AM – 10:00 PM" },
    3: { open: 7 * 60, close: 21 * 60 + 30, label: "7:00 AM – 10:00 PM" },
    4: { open: 7 * 60, close: 21 * 60 + 30, label: "7:00 AM – 10:00 PM" },
    5: { open: 7 * 60, close: 21 * 60 + 30, label: "7:00 AM – 10:00 PM" },   // Friday
    6: { open: 7 * 60, close: 21 * 60 + 30, label: "7:00 AM – 10:00 PM" }   // Saturday (assumed same as weekdays)
  };

  function updateStatus() {
    const now = new Date();
    const day = now.getDay();
    const minutesNow = now.getHours() * 60 + now.getMinutes();
    const today = HOURS[day];
    const isOpen = minutesNow >= today.open && minutesNow < today.close;

    const pill = document.getElementById("status-pill");
    const text = document.getElementById("status-text");
    const contactToday = document.getElementById("contact-today");

    if (pill && text) {
      pill.classList.remove("open", "closed");
      pill.classList.add(isOpen ? "open" : "closed");
      text.textContent = isOpen ? "Open now" : "Closed now";
    }
    if (contactToday) {
      contactToday.textContent = today.label + (isOpen ? " · Open now" : " · Closed now");
    }

    // Highlight today's row in the timing table
    document.querySelectorAll(".timing-row").forEach(function (row) {
      row.classList.toggle("today", Number(row.dataset.day) === day);
    });
  }
  updateStatus();
  setInterval(updateStatus, 60 * 1000);

  /* ---------------------------------------------------------
     2. Footer year
     --------------------------------------------------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------------------------------------------------
     3. Gallery slider — real store photos first, then
        placeholder slots for anything you add later.
        To add more: drop files into images/gallery/ named
        gallery-1.jpg, gallery-2.jpg, ... (see README.md).
        Until a real file exists at that path, the placeholder
        graphic is shown automatically via the onerror fallback.
     --------------------------------------------------------- */
  const REAL_PHOTOS = [
    { src: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWnUEjPW96KaJ-s0eb-pt--sSTIC9C4pu5lu5zKwfntcK3C6Nxtd8t8HH3MwISPXloMZxh3PWoBBHhkYSMpMIr8Yyr9TkrNYwbvg1qK79CWaSKAd_u5UBDb73jp3CD-3jLohzxrR1A=w500-h358-n-k-no-nu", caption: "Store shelves" },
    { src: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWn5s_unskPTgnwGBKSlxSpxmCKO51Aq2HezpGU0x57QvgBuPtnGMeNEzzS0SpUKN_XI0WTPaIGX9EiapI5I3B7_U9Y2UuFM6f-Lm2tSy0I1GRULcgLCMU6XUnt-lS4MF6TYtzFQqA=w500-h626-n-k-no-nu", caption: "Grocery aisle" },
    { src: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWnKeSepePiWzZxSZqPvo238fYkDKTE2v2L3-WiTnqo7Euv2Py7LPDHqx1iWFFt-bOa5VhVNDzbpyueHeyjR1JeJt56ApsFFbU7xMykNeYTrA68_3WkLEhVQ04qZuOZjggDOEZUY=w500-h626-n-k-no-nu", caption: "Packed shelves" },
    { src: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmz_nzR0xhdypbKieUAAYyXPNJGZAPK-aFlRtXUepc3FJw-gE4zJHw8MqmnxXLrRlgODB556k1GrqXZWPGF6Js5Fx3LE7LbzPtLLey9ay4WaLMdI79L-5mPAOJJSlIZ0q3G_ak0=w500-h626-n-k-no-nu", caption: "Daily provisions" },
    { src: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWkSEEpJxYJiAnJR0vESWDuXDU1RfB1zWUeK_VM81ZM-up_0BOcrFKRLOk8iD8MhUBdqIcaDq66Ak0pAvn2OYA9GXbruf8RlH1lld0n9au10TfRsFzulVk60BqZp5khKf0BoQS8=w500-h418-n-k-no-nu", caption: "Store front" },
    { src: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWlj_MIsg-U4b_ylf5H-Q2Rt87ki9azPKYHb-dSFmqTGW0adHNK6uKpHG0PXX30bgmKeijWLgpjuujKuh8sepa0O2OjvuUwRZTptJLzKn27TwCLqX0Th04RacMhVp5os4kez141K=w500-h836-n-k-no-nu", caption: "Inside the store" },
    { src: "https://c8.alamy.com/comp/2P5MP93/toiletries-soap-toothpaste-shampoo-toothbrush-2P5MP93.jpg", caption: "Soaps & Toiletries" }
  ];

/*   const PLACEHOLDER_COUNT = 7; // extra empty slots waiting for images/gallery/gallery-N.jpg
  const placeholderCaptions = [
    "Snacks aisle", "Beverages section", "Instant foods", "Toiletries rack", "Front counter", "Store entrance"
  ];  */

  const galleryTrack = document.getElementById("galleryTrack");
  const gallerySlider = document.getElementById("gallerySlider");

  if (galleryTrack) {
    REAL_PHOTOS.forEach(function (photo) {
      galleryTrack.appendChild(buildGalleryItem(photo.src, photo.caption, null));
    });
    /* for (let i = 1; i <= PLACEHOLDER_COUNT; i++) {
      const caption = placeholderCaptions[i - 1] || ("Store photo " + i);
      galleryTrack.appendChild(buildGalleryItem("images/gallery/gallery-" + i + ".jpg", caption, "images/placeholder-photo.svg"));
    } */
  }

  function buildGalleryItem(src, caption, fallbackSrc) {
    const btn = document.createElement("button");
    btn.className = "gallery-item";
    btn.type = "button";
    btn.setAttribute("aria-label", "View photo: " + caption);

    const img = document.createElement("img");
    img.src = src;
    img.alt = "Saraswathy Store — " + caption;
    img.loading = "lazy";
    if (fallbackSrc) {
      img.onerror = function () {
        this.onerror = null;
        this.src = fallbackSrc;
      };
    }

    const cap = document.createElement("span");
    cap.className = "cap";
    cap.textContent = caption;

    btn.appendChild(img);
    btn.appendChild(cap);
    btn.addEventListener("click", function () {
      if (!btn.dataset.dragged) openLightbox(img.src, img.alt);
    });

    return btn;
  }

  /* ---- Auto-slide, prev/next controls, and drag-to-scroll ---- */
  if (gallerySlider && galleryTrack) {
    const prevBtn = document.getElementById("galleryPrev");
    const nextBtn = document.getElementById("galleryNext");
    const STEP = 276; // item width (260px) + gap (16px)
    let autoTimer = null;

    function scrollByStep(direction) {
      const maxScroll = gallerySlider.scrollWidth - gallerySlider.clientWidth;
      if (direction > 0 && gallerySlider.scrollLeft >= maxScroll - 4) {
        gallerySlider.scrollTo({ left: 0, behavior: "smooth" });
      } else if (direction < 0 && gallerySlider.scrollLeft <= 4) {
        gallerySlider.scrollTo({ left: maxScroll, behavior: "smooth" });
      } else {
        gallerySlider.scrollBy({ left: STEP * direction, behavior: "smooth" });
      }
    }

    function startAutoplay() {
      stopAutoplay();
      autoTimer = setInterval(function () { scrollByStep(1); }, 3200);
    }
    function stopAutoplay() {
      if (autoTimer) clearInterval(autoTimer);
    }

    if (prevBtn) prevBtn.addEventListener("click", function () { scrollByStep(-1); startAutoplay(); });
    if (nextBtn) nextBtn.addEventListener("click", function () { scrollByStep(1); startAutoplay(); });

    gallerySlider.addEventListener("mouseenter", stopAutoplay);
    gallerySlider.addEventListener("mouseleave", startAutoplay);
    gallerySlider.addEventListener("focusin", stopAutoplay);
    gallerySlider.addEventListener("focusout", startAutoplay);

    // Pointer drag-to-scroll (desktop mouse)
    let isDown = false, startX = 0, startScroll = 0, moved = false;
    gallerySlider.addEventListener("pointerdown", function (e) {
      isDown = true;
      moved = false;
      gallerySlider.classList.add("dragging");
      startX = e.clientX;
      startScroll = gallerySlider.scrollLeft;
      stopAutoplay();
    });
    window.addEventListener("pointermove", function (e) {
      if (!isDown) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 5) moved = true;
      gallerySlider.scrollLeft = startScroll - dx;
    });
    window.addEventListener("pointerup", function () {
      if (!isDown) return;
      isDown = false;
      gallerySlider.classList.remove("dragging");
      if (moved) {
        galleryTrack.querySelectorAll(".gallery-item").forEach(function (item) {
          item.dataset.dragged = "1";
          setTimeout(function () { delete item.dataset.dragged; }, 50);
        });
      }
      startAutoplay();
    });

    startAutoplay();
  }

  /* ---------------------------------------------------------
     4. Lightbox
     --------------------------------------------------------- */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxClose = document.getElementById("lightboxClose");

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }
  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLightbox();
  });

  /* ---------------------------------------------------------
     5. Back-to-top button
     --------------------------------------------------------- */
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    window.addEventListener("scroll", function () {
      backToTop.classList.toggle("show", window.scrollY > 500);
    });
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------------------------------------------------------
     6. Close the mobile nav after tapping a link
     --------------------------------------------------------- */
  const navLinks = document.querySelectorAll("#navMain .nav-link");
  const navMain = document.getElementById("navMain");
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (navMain.classList.contains("show")) {
        const collapse = bootstrap.Collapse.getOrCreateInstance(navMain);
        collapse.hide();
      }
    });
  });
});
