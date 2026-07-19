/* SalonBook explainer — tiny progressive-enhancement layer.
   Everything degrades gracefully if JS is off. */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- 1. Sticky nav shadow on scroll ---- */
  var nav = document.getElementById("nav");
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle("is-stuck", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- 2. Smooth scroll for in-page anchors (respects reduced motion) ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start"
      });
      // move focus for keyboard users without an extra jump
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  });

  /* ---- 3. Interactive touch: the "nudge on WhatsApp" widget ----
     Tapping the button animates each client being messaged, then
     ticks up a counter — the whole SalonBook promise in one gesture. */
  var btn = document.getElementById("nudgeBtn");
  var ghost = document.getElementById("nudgeGhost");
  var list = document.getElementById("cadenceList");

  var names = ["Priya Sharma", "Rahul Mehta", "Ananya Kulkarni"];
  var messages = [
    "Hi Priya! You're due for your haircut & blow-dry at Glow & Co. 💇 Shall we save your usual Saturday slot?",
    "Hi Rahul! Time for your beard trim — your chair's ready whenever you are. Reply to book. ✂️",
    "Hi Ananya! Your next spa facial is due this week 🌸 Want your regular 4 pm?"
  ];

  if (btn && ghost && list) {
    var sending = false;
    btn.addEventListener("click", function () {
      if (sending) return;
      sending = true;
      btn.disabled = true;

      var rows = list.querySelectorAll(".cadence__row");
      var i = 0;

      var step = function () {
        if (i < names.length) {
          // show the message being sent for this client
          ghost.textContent = "📲 " + messages[i];
          var row = rows[i];
          if (row) {
            var due = row.querySelector(".cadence__due");
            if (due) {
              due.textContent = "✓ Nudged";
              due.style.color = "#8A6A1E";
            }
          }
          i++;
          setTimeout(step, reduceMotion ? 120 : 900);
        } else {
          // done — confirm and animate a tiny counter
          btn.classList.add("is-sent");
          countUp(btn, 3);
          ghost.textContent = "3 regulars nudged. This is how the chair stays full.";
        }
      };
      step();
    });
  }

  /* ---- animated counter used on completion ---- */
  function countUp(el, total) {
    if (reduceMotion) {
      el.textContent = "Sent to " + total + " — chair staying full ✓";
      return;
    }
    var n = 0;
    var tick = function () {
      n++;
      el.textContent = "Sent " + n + " of " + total + " …";
      if (n < total) {
        setTimeout(tick, 260);
      } else {
        el.textContent = "All " + total + " nudged ✓";
      }
    };
    tick();
  }
})();
