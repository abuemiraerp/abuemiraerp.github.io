/* ============================================================
   Abu Emira Portfolio — Main JavaScript
   Version: 1.0.0
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ── PROJECT FILTER ── */
  const filterBtns = document.querySelectorAll(".fbtn");
  const projCards  = document.querySelectorAll(".proj-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      projCards.forEach(card => {
        card.style.display = (filter === "all" || card.dataset.cat === filter) ? "" : "none";
      });
    });
  });

  /* ── SKILL BAR ANIMATION ── */
  const fills  = document.querySelectorAll(".sk-fill");
  const widths = [];

  fills.forEach(el => {
    widths.push(el.style.width);
    el.style.width = "0";
  });

  const skillsObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        fills.forEach((el, i) => {
          setTimeout(() => { el.style.width = widths[i]; }, i * 55);
        });
        skillsObs.disconnect();
      }
    });
  }, { threshold: 0.2 });

  const skillsCard = document.querySelector(".skills-card");
  if (skillsCard) skillsObs.observe(skillsCard);

  /* ── SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll(".reveal");

  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  revealEls.forEach(el => revealObs.observe(el));

  /* ── ACTIVE NAV LINK ON SCROLL ── */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  const navObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => a.classList.remove("active-link"));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add("active-link");
      }
    });
  }, { rootMargin: "-50% 0px -50% 0px" });

  sections.forEach(s => navObs.observe(s));

  /* ── SCROLL-TO-TOP BUTTON ── */
  const scrollBtn = document.createElement("button");
  scrollBtn.id        = "scrollTop";
  scrollBtn.innerHTML = "↑";
  scrollBtn.title     = "Back to top";
  Object.assign(scrollBtn.style, {
    position:     "fixed",
    bottom:       "28px",
    right:        "28px",
    width:        "42px",
    height:       "42px",
    borderRadius: "50%",
    background:   "var(--teal)",
    color:        "#fff",
    border:       "none",
    fontSize:     "18px",
    fontWeight:   "700",
    cursor:       "pointer",
    boxShadow:    "0 4px 16px rgba(1,126,132,.4)",
    opacity:      "0",
    transform:    "translateY(12px)",
    transition:   "all .25s",
    zIndex:       "999",
  });
  document.body.appendChild(scrollBtn);

  window.addEventListener("scroll", () => {
    const show = window.scrollY > 400;
    scrollBtn.style.opacity   = show ? "1" : "0";
    scrollBtn.style.transform = show ? "translateY(0)" : "translateY(12px)";
  });

  scrollBtn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );

  /* ── STAT COUNTER ANIMATION ── */
  const statNums = document.querySelectorAll(".stat-n");

  const countUp = (el) => {
    const target = parseInt(el.textContent.replace(/\D/g, ""), 10);
    const suffix = el.textContent.replace(/[0-9]/g, "");
    if (isNaN(target)) return;
    let current = 0;
    const step  = Math.max(1, Math.floor(target / 40));
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + suffix;
      if (current >= target) clearInterval(timer);
    }, 30);
  };

  const statObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statNums.forEach(countUp);
        statObs.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const statsBar = document.querySelector(".stats-bar");
  if (statsBar) statObs.observe(statsBar);

  /* ── MOBILE HAMBURGER NAV ── */
  const nav        = document.querySelector(".nav");
  const navLinksEl = document.querySelector(".nav-links");

  const hamburger = document.createElement("button");
  hamburger.innerHTML = "☰";
  hamburger.id = "hamburger";
  Object.assign(hamburger.style, {
    display:    "none",
    background: "transparent",
    border:     "none",
    color:      "#fff",
    fontSize:   "22px",
    cursor:     "pointer",
    padding:    "6px",
  });
  nav.appendChild(hamburger);

  const mq = window.matchMedia("(max-width: 900px)");

  const handleMQ = (e) => {
    if (e.matches) {
      hamburger.style.display  = "block";
      navLinksEl.style.display = "none";
      navLinksEl.style.cssText = "display:none;position:absolute;top:62px;left:0;right:0;background:rgba(13,27,46,.98);padding:16px 24px;flex-direction:column;gap:4px;z-index:199;";
    } else {
      hamburger.style.display  = "none";
      navLinksEl.style.cssText = "";
    }
  };

  mq.addEventListener("change", handleMQ);
  handleMQ(mq);

  hamburger.addEventListener("click", () => {
    const isOpen = navLinksEl.style.display === "flex";
    navLinksEl.style.display = isOpen ? "none" : "flex";
    hamburger.innerHTML      = isOpen ? "☰" : "✕";
  });

  navLinksEl.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      if (mq.matches) {
        navLinksEl.style.display = "none";
        hamburger.innerHTML      = "☰";
      }
    });
  });

});
