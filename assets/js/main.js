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
})();
