/* =====================================================================
   A TO Z — A CHENNAI LOVE STORY · interactions
   ===================================================================== */
(function () {
  "use strict";
  document.documentElement.classList.add("js");

  const D = window.INVITE;
  if (!D) return;
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. inject couple + event text ---------------------- */
  const brideShort = D.couple.brideShort || D.couple.bride;
  $$(".js-bride").forEach(el => (el.textContent = brideShort));   // big cover
  const bride2 = $(".js-bride2"); if (bride2) bride2.textContent = brideShort; // handwritten closing
  $$(".js-bride-full").forEach(el => (el.textContent = D.couple.bride)); // formal full name
  document.title = `A to Z — A Chennai Love Story · ${D.couple.groom} & ${D.couple.bride}`;

  const tamil = $(".cover__tamil"); if (tamil) tamil.textContent = D.couple.tamilAccent;
  $(".js-datebig") && ($(".js-datebig").textContent = D.event.dateBig);

  $(".js-when-date") && ($(".js-when-date").textContent = D.event.dateBig);
  $(".js-when-time") && ($(".js-when-time").textContent = D.event.time);
  $(".js-venue")     && ($(".js-venue").textContent     = D.event.venueName);
  $(".js-venue-city")&& ($(".js-venue-city").textContent= D.event.venueCity);
  $(".js-dress")     && ($(".js-dress").textContent     = D.event.dressCode);
  const dw = $(".closing__date"); if (dw) dw.textContent = D.event.dateWords;

  const mapA = $(".js-map");
  if (mapA && D.event.mapUrl) { mapA.href = D.event.mapUrl; mapA.target = "_blank"; mapA.rel = "noopener"; mapA.hidden = false; }

  [".js-rsvp", ".js-rsvp2"].forEach(sel => {
    const a = $(sel);
    if (a && D.event.rsvpUrl) { a.href = D.event.rsvpUrl; a.target = "_blank"; a.rel = "noopener"; a.hidden = false; }
  });

  /* ---------- 2. build the A–Z trail ----------------------------- */
  const list = $(".js-trail");
  if (list) {
    list.innerHTML = D.trail.map(t => `
      <li class="trail__item${t.locked ? " trail__item--locked" : ""}">
        <span class="trail__letter">${t.letter}</span>
        <div class="trail__body">
          <p class="trail__place">${t.place}${t.locked ? '<span class="trail__lock">🔒</span>' : ""}</p>
          <p class="trail__area">${t.area}</p>
          <p class="trail__note">${t.note}</p>
        </div>
      </li>`).join("");
  }

  /* ---------- 3. build the gallery ------------------------------- */
  const grid = $(".js-gallery");
  if (grid) {
    grid.innerHTML = D.photos.gallery.map((src, i) => `
      <figure><img src="${src}" alt="Mithun & ${D.couple.bride}, moment ${i + 1}" loading="lazy" /></figure>
    `).join("");
  }

  /* ---------- 4. countdown --------------------------------------- */
  const target = new Date(D.event.dateISO).getTime();
  const elD = $(".js-cd-d"), elH = $(".js-cd-h"), elM = $(".js-cd-m"), elS = $(".js-cd-s");
  const pad = n => String(n).padStart(2, "0");
  function tick() {
    if (!elD) return;
    let diff = Math.max(0, target - Date.now());
    const day = Math.floor(diff / 86400000); diff -= day * 86400000;
    const hr  = Math.floor(diff / 3600000);  diff -= hr  * 3600000;
    const min = Math.floor(diff / 60000);     diff -= min * 60000;
    const sec = Math.floor(diff / 1000);
    elD.textContent = day; elH.textContent = pad(hr); elM.textContent = pad(min); elS.textContent = pad(sec);
  }
  tick(); setInterval(tick, 1000);

  /* ---------- 5. add-to-calendar (.ics download) ----------------- */
  const calBtn = $(".js-cal");
  if (calBtn) {
    calBtn.addEventListener("click", () => {
      const start = new Date(D.event.dateISO);
      const end = new Date(start.getTime() + 4 * 3600000); // 4-hour event
      const fmt = dt => dt.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
      const ics = [
        "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//AtoZ//Invite//EN",
        "BEGIN:VEVENT",
        `UID:${Date.now()}@atoz-invite`,
        `DTSTAMP:${fmt(new Date())}`,
        `DTSTART:${fmt(start)}`,
        `DTEND:${fmt(end)}`,
        `SUMMARY:${D.couple.groom} & ${D.couple.bride} — Wedding`,
        `LOCATION:${D.event.venueName}, ${D.event.venueCity}`,
        "DESCRIPTION:A to Z — A Chennai Love Story. Come help us close the loop.",
        "END:VEVENT", "END:VCALENDAR",
      ].join("\r\n");
      const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
      const a = document.createElement("a");
      a.href = url; a.download = "mithun-wedding.ics"; a.click();
      URL.revokeObjectURL(url);
    });
  }

  /* ---------- 6. progress rail ----------------------------------- */
  const fill = $(".rail__fill");
  function railUpdate() {
    if (!fill) return;
    const h = document.documentElement.scrollHeight - innerHeight;
    fill.style.height = (h > 0 ? (scrollY / h) * 100 : 0) + "%";
  }
  addEventListener("scroll", railUpdate, { passive: true });
  addEventListener("resize", railUpdate);
  railUpdate();

  /* ---------- 7. petals ------------------------------------------ */
  if (!reduce) {
    const wrap = $(".petals");
    const N = innerWidth < 640 ? 7 : 12;
    for (let i = 0; i < N; i++) {
      const p = document.createElement("i");
      p.style.left = Math.random() * 100 + "vw";
      p.style.animationDuration = 9 + Math.random() * 11 + "s";
      p.style.animationDelay = -Math.random() * 14 + "s";
      const s = 7 + Math.random() * 12;
      p.style.width = s + "px"; p.style.height = s + "px";
      p.style.opacity = .35 + Math.random() * .4;
      wrap.appendChild(p);
    }
  }

  /* ---------- 8. GSAP scroll reveals ----------------------------- */
  if (window.gsap && window.ScrollTrigger && !reduce) {
    gsap.registerPlugin(ScrollTrigger);

    // cover intro (load)
    const cov = gsap.timeline({ defaults: { ease: "power3.out" } });
    $$("#cover [data-rise]")
      .sort((a, b) => (+a.dataset.d || 0) - (+b.dataset.d || 0))
      .forEach((el, i) => cov.to(el, { opacity: 1, y: 0, duration: 1 }, i === 0 ? 0.2 : "-=0.72"));

    // subtle cover parallax
    gsap.to(".cover__bg", {
      yPercent: 14, scale: 1.16, ease: "none",
      scrollTrigger: { trigger: "#cover", start: "top top", end: "bottom top", scrub: true },
    });

    // generic reveals per section
    $$("section:not(#cover)").forEach(sec => {
      const items = $$("[data-rise]", sec);
      if (!items.length) return;
      gsap.set(items, { opacity: 0, y: 28 });
      ScrollTrigger.create({
        trigger: sec, start: "top 78%",
        onEnter: () => gsap.to(items, {
          opacity: 1, y: 0, duration: .9, ease: "power3.out",
          stagger: 0.08,
        }),
      });
    });

    // trail rows stagger in on their own
    gsap.set(".trail__item", { opacity: 0, y: 30 });
    ScrollTrigger.batch(".trail__item", {
      start: "top 88%",
      onEnter: b => gsap.to(b, { opacity: 1, y: 0, duration: .7, ease: "power2.out", stagger: .07 }),
    });

    // gallery pop
    ScrollTrigger.batch(".gallery__grid figure", {
      start: "top 92%",
      onEnter: b => gsap.fromTo(b, { opacity: 0, y: 24, scale: .96 },
        { opacity: 1, y: 0, scale: 1, duration: .6, ease: "power2.out", stagger: .06 }),
    });

    // countdown gentle pulse on the seconds
    gsap.to(".js-cd-s", { scale: 1.12, duration: .12, yoyo: true, repeat: -1, repeatDelay: .88, ease: "power1.inOut", transformOrigin: "center" });

    ScrollTrigger.refresh();
  } else {
    // no GSAP → make sure everything is visible
    $$("[data-rise]").forEach(el => { el.style.opacity = 1; el.style.transform = "none"; });
  }

  /* ---------- 8b. dress-code randomiser game --------------------- */
  (function dressGame() {
    const fam = $(".js-family");
    const spin = $(".js-spin");
    if (!fam) return;

    // Curated designer outfits — each top+bottom is a single harmonious pairing
    // (tonal / earthy / quiet-luxury). No random clashing.
    const COMBOS = [
      { top: { name: "Burnt Apricot", hex: "#C8754D" }, bottom: { name: "Toasted Almond", hex: "#B2967A" } },
      { top: { name: "Sage Mist", hex: "#A7B49A" },     bottom: { name: "Moss Ink", hex: "#4B5742" } },
      { top: { name: "Rosewater", hex: "#E6C5C0" },     bottom: { name: "Mulberry", hex: "#5C3142" } },
      { top: { name: "Ecru", hex: "#E7DDC6" },          bottom: { name: "Espresso", hex: "#4A382B" } },
      { top: { name: "Ochre Sun", hex: "#D29B47" },     bottom: { name: "Deep Olive", hex: "#565030" } },
      { top: { name: "Powder Sky", hex: "#B6C3CB" },    bottom: { name: "Slate Teal", hex: "#3E565F" } },
      { top: { name: "Plaster Pink", hex: "#E2C2B2" },  bottom: { name: "Cocoa", hex: "#5D463A" } },
      { top: { name: "Pistachio Cream", hex: "#C9D2A4" }, bottom: { name: "Bottle Forest", hex: "#2C4438" } },
      { top: { name: "Marigold Dust", hex: "#DEAC5A" }, bottom: { name: "Aubergine", hex: "#432B3D" } },
      { top: { name: "Oat Milk", hex: "#E5DBC7" },      bottom: { name: "Petrol Blue", hex: "#2C4A54" } },
      { top: { name: "Apricot Haze", hex: "#E5B68E" },  bottom: { name: "Rust Umber", hex: "#8A4B33" } },
      { top: { name: "Lavender Ash", hex: "#B8AEC1" },  bottom: { name: "Indigo Night", hex: "#2F3457" } },
      { top: { name: "Champagne", hex: "#E2D2A8" },     bottom: { name: "Garnet", hex: "#6D2734" } },
      { top: { name: "Fennel", hex: "#BEC1A0" },        bottom: { name: "Charcoal Olive", hex: "#3B3B2E" } },
      { top: { name: "Sand Dune", hex: "#D6C29C" },     bottom: { name: "Teal Spruce", hex: "#2F564F" } },
      { top: { name: "Coral Blush", hex: "#D8866B" },   bottom: { name: "Mahogany", hex: "#5D3326" } },
    ];
    const SKINS = ["#E7B68F", "#D69A6E", "#C98A57", "#B5764A"];
    const MEMBERS = [
      { role: "You", kind: "adult" },
      { role: "Your plus-one", kind: "adult" },
      { role: "Little one", kind: "kid" },
      { role: "Tiny one", kind: "kid" },
    ];
    const pick = a => a[Math.floor(Math.random() * a.length)];
    const isLight = hex => {
      const c = parseInt(hex.slice(1), 16);
      return (0.299 * (c >> 16) + 0.587 * ((c >> 8) & 255) + 0.114 * (c & 255)) > 150;
    };
    const ink = hex => (isLight(hex) ? "#2a211a" : "#f6efe3");

    function personSVG(top, bottom, skin) {
      return `<svg viewBox="0 0 80 124" class="person" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="40" cy="118" rx="20" ry="3.5" fill="rgba(0,0,0,.12)"/>
        <path d="M26,72 L21,111 L33,111 L40,80 L47,111 L59,111 L54,72 Z" fill="${bottom}"/>
        <rect x="20" y="108" width="13" height="6" rx="3" fill="#3a2c22"/>
        <rect x="47" y="108" width="13" height="6" rx="3" fill="#3a2c22"/>
        <path d="M22,46 Q40,35 58,46 L56,76 L24,76 Z" fill="${top}"/>
        <path d="M23,46 L14,72 L20,74 L28,52 Z" fill="${top}"/>
        <path d="M57,46 L66,72 L60,74 L52,52 Z" fill="${top}"/>
        <circle cx="17" cy="73" r="3.6" fill="${skin}"/>
        <circle cx="63" cy="73" r="3.6" fill="${skin}"/>
        <rect x="36" y="33" width="8" height="11" fill="${skin}"/>
        <circle cx="40" cy="24" r="13" fill="${skin}"/>
        <path d="M26,23 Q27,7 40,7 Q53,7 54,23 Q48,15 40,15 Q32,15 26,23 Z" fill="#22150f"/>
      </svg>`;
    }

    function render() {
      // give each family member a distinct curated outfit
      const deck = [...COMBOS].sort(() => Math.random() - 0.5);
      fam.innerHTML = MEMBERS.map((m, idx) => {
        const c = deck[idx % deck.length];
        const top = c.top, bottom = c.bottom;
        const skin = pick(SKINS);
        return `<div class="member member--${m.kind}">
          <div class="member__fig">${personSVG(top.hex, bottom.hex, skin)}</div>
          <p class="member__role">${m.role}</p>
          <div class="member__combo">
            <span class="swatch" style="background:${top.hex};color:${ink(top.hex)}">Top · ${top.name}</span>
            <span class="swatch" style="background:${bottom.hex};color:${ink(bottom.hex)}">Bottom · ${bottom.name}</span>
          </div>
        </div>`;
      }).join("");

      if (window.gsap && !reduce) {
        gsap.fromTo(fam.querySelectorAll(".member"),
          { y: 16, opacity: 0, scale: 0.94 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)", stagger: 0.08 });
        gsap.fromTo(fam.querySelectorAll(".person"),
          { rotation: -8 }, { rotation: 0, duration: 0.6, ease: "elastic.out(1,0.5)", stagger: 0.08 });
      }
    }

    if (spin) {
      spin.addEventListener("click", () => {
        spin.classList.add("is-spinning");
        render();
        setTimeout(() => spin.classList.remove("is-spinning"), 550);
      });
    }
    render(); // initial fit on load
  })();

  /* ---------- 9. cute gallery jumble (every 2s, while in view) ----- */
  if (window.gsap && window.Flip && !reduce && grid) {
    gsap.registerPlugin(Flip);
    const rand = (a, b) => a + Math.random() * (b - a);

    function jumble() {
      const nodes = [...grid.children];
      if (nodes.length < 3) return;
      const state = Flip.getState(nodes);
      // gentle: trade a couple of random pairs (not a full scramble)
      for (let k = 0; k < 2; k++) {
        const i = Math.floor(Math.random() * nodes.length);
        const j = Math.floor(Math.random() * nodes.length);
        if (i !== j) { const t = nodes[i]; nodes[i] = nodes[j]; nodes[j] = t; }
      }
      nodes.forEach(n => grid.appendChild(n));
      Flip.from(state, {
        duration: 0.8,
        ease: "back.out(1.3)",   // bouncy = cute
        scale: true,
        stagger: { amount: 0.18, from: "random" },
      });
    }

    let timer = null;
    const galSec = $("#gallery");
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && !timer) {
          timer = setInterval(() => { if (!document.hidden) jumble(); }, 2000);
        } else if (!e.isIntersecting && timer) {
          clearInterval(timer); timer = null;
        }
      });
    }, { threshold: 0.15 });
    if (galSec) io.observe(galSec);
  }

  /* ---------- 10. critters: peeking cats + Night Fury fly-by ------- */
  if (window.gsap && !reduce) {
    const layer = $(".critters");
    if (layer) {
      const R = gsap.utils.random;

      // — a couple of cats peek up from the bottom corners —
      function makeCat(side) {
        const cat = document.createElement("span");
        cat.className = "critter critter--cat";
        cat.textContent = Math.random() < 0.5 ? "🐈" : "🐱";
        cat.style[side] = "clamp(8px, 5vw, 56px)";
        layer.appendChild(cat);
        gsap.set(cat, { yPercent: 125, rotation: side === "left" ? -10 : 10 });

        (function peek() {
          gsap.timeline({ onComplete: () => gsap.delayedCall(R(4, 11), peek) })
            .to(cat, { yPercent: 16, duration: 0.7, ease: "back.out(1.7)" })
            .to(cat, { rotation: side === "left" ? 8 : -8, duration: 0.45, yoyo: true, repeat: 1, ease: "sine.inOut" }, "-=0.2")
            .to(cat, { yPercent: 125, duration: 0.55, ease: "back.in(1.4)" }, "+=" + R(0.9, 2.4));
        })();
      }
      gsap.delayedCall(R(2, 5), () => makeCat("left"));
      gsap.delayedCall(R(3, 7), () => makeCat("right"));
    }
  }
})();
