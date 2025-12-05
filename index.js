// Loading Screen Handler
document.addEventListener("DOMContentLoaded", function () {
  const loadingScreen = document.getElementById("loadingScreen");
  const MIN_LOADING_MS = 3000;
  const FADE_MS = 600;
  const startedAt = performance.now();

  const hideLoaderNow = () => {
    if (loadingScreen) loadingScreen.style.display = "none";
  };

  // safety fallback in case 'load' never fires
  const fallbackTimer = setTimeout(
    hideLoaderNow,
    MIN_LOADING_MS + FADE_MS + 1000
  );

  window.addEventListener("load", function () {
    const elapsed = performance.now() - startedAt;
    const remaining = Math.max(0, MIN_LOADING_MS - elapsed);
    // wait remaining visible time + fade time, then remove loader
    setTimeout(() => {
      hideLoaderNow();
      clearTimeout(fallbackTimer);
    }, remaining + FADE_MS);
  });
});

// ===================== HAMBURGER MENU FUNCTIONALITY =====================
document.addEventListener("DOMContentLoaded", function () {
  // Create mobile navigation structure
  createMobileNav();

  // Get elements
  const menuToggle = document.querySelector(".menu-icon .toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  const mobileNavOverlay = document.querySelector(".mobile-nav-overlay");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-list a");
  const body = document.body;

  // Toggle menu function
  function toggleMenu() {
    menuToggle.classList.toggle("active");
    mobileNav.classList.toggle("active");
    mobileNavOverlay.classList.toggle("active");
    body.classList.toggle("menu-open");
  }

  // Close menu function
  function closeMenu() {
    menuToggle.classList.remove("active");
    mobileNav.classList.remove("active");
    mobileNavOverlay.classList.remove("active");
    body.classList.remove("menu-open");
  }

  // Menu toggle click event
  if (menuToggle) {
    menuToggle.addEventListener("click", toggleMenu);
  }

  // Overlay click to close
  if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener("click", closeMenu);
  }

  // Close menu when clicking nav links
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Allow navigation to happen
      closeMenu();
    });
  });

  // Close menu on escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && mobileNav.classList.contains("active")) {
      closeMenu();
    }
  });

  // Handle window resize
  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (window.innerWidth > 768) {
        closeMenu();
      }
    }, 250);
  });

  // Prevent scroll on touch move when menu is open
  mobileNav.addEventListener("touchmove", function (e) {
    e.stopPropagation();
  });
});

// Function to create mobile navigation structure dynamically
function createMobileNav() {
  // Check if mobile nav already exists
  if (document.querySelector(".mobile-nav")) {
    return;
  }

  // Create overlay
  const overlay = document.createElement("div");
  overlay.className = "mobile-nav-overlay";
  document.body.appendChild(overlay);

  // Create mobile nav container
  const mobileNav = document.createElement("nav");
  mobileNav.className = "mobile-nav";

  // Create header
  const header = document.createElement("div");
  header.className = "mobile-nav-header";

  const profileImg = document.createElement("img");
  profileImg.src = "assests/imgs/dpbp.png";
  profileImg.alt = "Profile";

  const name = document.createElement("span");
  name.className = "name";
  name.textContent = "Vargav";

  header.appendChild(profileImg);
  header.appendChild(name);

  // Create navigation list
  const navList = document.createElement("ul");
  navList.className = "mobile-nav-list";

  // Navigation items
  const navItems = [
    { text: "Home", href: "#main-home" },
    { text: "About Me", href: "#about" },
    { text: "Work", href: "#our-work" },
    { text: "Education", href: "#Education" },
    { text: "Skills", href: "#skills" },
    { text: "Contact", href: "#contact" },
  ];

  navItems.forEach((item) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = item.href;
    a.className = "mobile-nav-link";
    a.textContent = item.text;
    li.appendChild(a);
    navList.appendChild(li);
  });

  // Create connect button section
  const connectSection = document.createElement("div");
  connectSection.className = "mobile-nav-connect";

  const connectBtn = document.createElement("button");
  connectBtn.className = "connectBtn";
  connectBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512" fill="white">
            <path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"></path>
        </svg>
        Connect
    `;

  connectSection.appendChild(connectBtn);

  // Assemble mobile nav
  mobileNav.appendChild(header);
  mobileNav.appendChild(navList);
  mobileNav.appendChild(connectSection);

  // Add to body
  document.body.appendChild(mobileNav);
}
// ===================== Education Section =====================

gsap.registerPlugin(ScrollTrigger);

// constants
let allowScroll = true; // sometimes we want to ignore scroll-related stuff, like when an Observer-based section is transitioning.
let scrollTimeout = gsap.delayedCall(1, () => (allowScroll = true)).pause(); // controls how long we should wait after an Observer-based animation is initiated before we allow another scroll-related action
const time = 0.5; // animation duration
let animating = false; // state

// Progressive enhancement
gsap.set(".card", {
  y: (index) => 20 * index,
  transformOrigin: "center top",
});

//--------------------------------//
// The timeline
//--------------------------------//
const tl = gsap.timeline({
  paused: true,
});

tl.add("card2");
tl.to(".card:nth-child(1)", {
  scale: 0.85,
  duration: time,
  backgroundColor: "#3498db",
});
tl.from(
  ".card:nth-child(2)",
  {
    y: () => window.innerHeight,
    duration: time,
  },
  "<"
);

tl.add("card3");
tl.to(".card:nth-child(2)", {
  scale: 0.9,
  duration: time,
  backgroundColor: "#3498db",
});
tl.from(
  ".card:nth-child(3)",
  {
    y: () => window.innerHeight,
    duration: time,
  },
  "<"
);

tl.add("card4");
tl.to(".card:nth-child(3)", {
  scale: 0.95,
  duration: time,
  backgroundColor: "#3498db",
});
tl.from(
  ".card:nth-child(4)",
  {
    y: () => window.innerHeight,
    duration: time,
  },
  "<"
);
tl.add("card5");
// END The timeline --------------//

function tweenToLabel(direction, isScrollingDown) {
  if (
    (!tl.nextLabel() && isScrollingDown) ||
    (!tl.previousLabel() && !isScrollingDown)
  ) {
    cardsObserver.disable(); // resume native scroll
    return;
  }
  if (!animating && direction) {
    // Check if we're already animating
    animating = true;
    tl.tweenTo(direction, { onComplete: () => (animating = false) });
  }
}

//--------------------------------//
// Observer plugin
//--------------------------------//
const cardsObserver = Observer.create({
  // type: "wheel,touch,pointer",
  wheelSpeed: -1,
  onDown: (self) => tweenToLabel(tl.previousLabel(), false),
  onUp: (self) => tweenToLabel(tl.nextLabel(), true),
  tolerance: 10,
  preventDefault: true,
  onEnable(self) {
    allowScroll = false;
    scrollTimeout.restart(true);
    // when enabling, we should save the scroll position and freeze it. This fixes momentum-scroll on Macs, for example.
    let savedScroll = self.scrollY();
    self._restoreScroll = () => self.scrollY(savedScroll); // if the native scroll repositions, force it back to where it should be
    document.addEventListener("scroll", self._restoreScroll, {
      passive: false,
    });
  },
  onDisable: (self) =>
    document.removeEventListener("scroll", self._restoreScroll),
});

cardsObserver.disable(); // Disable one page load
// END Observer plugin --------------//

//--------------------------------//
// ScrollTrigger that disables the scroll and has the Observer plugin take over
//--------------------------------//
// 🔒 Lock the Education section while cards are scrolling
ScrollTrigger.create({
  id: "EDU-CARDS",

  // The whole education block
  trigger: ".edu-section",

  // Pin the section itself so it pushes the Skills section down
  pin: true,
  pinSpacing: true, // ✅ ensures space is added so Skills is NOT overlapped

  start: "top top",

  // scroll distance = one viewport for each extra card
  end: () => {
    const cards = document.querySelectorAll(".card");
    if (!cards.length) return "+=0";
    return "+=" + (cards.length - 1) * window.innerHeight;
  },

  // When we ENTER the education section, take over scroll for cards
  onEnter: () => {
    if (!cardsObserver.isEnabled) cardsObserver.enable();
  },

  // When we go back up into education, re-enable the card scroll
  onEnterBack: () => {
    if (!cardsObserver.isEnabled) cardsObserver.enable();
  },

  // 👉 When we've scrolled past the last card, RELEASE everything
  onLeave: () => {
    if (cardsObserver.isEnabled) cardsObserver.disable();
  },

  // 👉 When we scroll back above education, also restore normal behaviour
  onLeaveBack: () => {
    if (cardsObserver.isEnabled) cardsObserver.disable();
  },
});

// ===================== NAVBAR CLICK SHOULD ALWAYS WORK =====================

// Select ALL nav links (desktop + mobile)
const allNavLinks = document.querySelectorAll(
    ".nav-list a, .mobile-nav-list a"
);

allNavLinks.forEach(link => {
    link.addEventListener("click", (e) => {

        // 1️⃣ Disable GSAP observer instantly so scroll unlocks
        if (cardsObserver && cardsObserver.isEnabled) {
            cardsObserver.disable();
        }

        // 2️⃣ Allow normal scrolling again
        allowScroll = true;

        // 3️⃣ Close mobile nav if open
        document.body.classList.remove("menu-open");

        // 4️⃣ Let the normal anchor navigation work naturally
        // (No preventDefault on purpose)
    });
});


// ===================== PHONE NUMBER HANDLER =====================
// (Keep your existing phone number code)

document.addEventListener("DOMContentLoaded", function () {
  const countrySelect = document.getElementById("country-code");
  const phoneDisplay = document.getElementById("phone-display");
  const phoneHidden = document.getElementById("phone-hidden");
  const contactForm = document.getElementById("contactForm");

  // Update hidden field whenever either input changes
  function updateHiddenPhone() {
    const countryCode = countrySelect.value;
    const phoneNumber = phoneDisplay.value;
    phoneHidden.value = `+${countryCode}${phoneNumber}`;
  }

  if (countrySelect) {
    countrySelect.addEventListener("change", updateHiddenPhone);
  }

  if (phoneDisplay) {
    phoneDisplay.addEventListener("input", updateHiddenPhone);
  }

  // Ensure the hidden field is updated before form submission
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      updateHiddenPhone();
    });
  }
});
//contact me submit button
document.addEventListener("DOMContentLoaded", function () {
  var el = document.querySelector(".button-bird");
  var text = document.querySelector(".button-bird__text");
  el.addEventListener("click", function () {
    el.classList.toggle("active");

    if (el.classList.contains("active")) {
      console.log("true");
      text.innerHTML = "DONE";
    } else {
      text.innerHTML = "SEND";
    }
  });
});

//phone number contact me section
(function () {
  const form = document.getElementById("contactForm");
  const countrySelect = document.getElementById("country-code");
  const phoneDisplay = document.getElementById("phone-display");
  const phoneHidden = document.getElementById("phone-hidden");

  form.addEventListener("submit", function (e) {
    const code =
      countrySelect && countrySelect.value
        ? countrySelect.value.toString().trim()
        : "";
    const raw =
      phoneDisplay && phoneDisplay.value
        ? phoneDisplay.value.toString().trim()
        : "";

    const normalized = raw.replace(/^\+/, "").replace(/\s+/g, "");

    let final = normalized;
    if (code && !normalized.startsWith(code)) {
      final = code + normalized;
    }

    phoneHidden.value = final ? "+" + final : "";

    const stray = form.querySelectorAll('[name="country-code"]');
    stray.forEach((el) => el.remove());

    if (countrySelect) countrySelect.disabled = true;
  });
})();

// skills marquee
// document.addEventListener("DOMContentLoaded", () => {
//     const list = document.querySelector(".slider .list");
//     if (list) {
//         const clone = list.cloneNode(true);
//         list.parentElement.appendChild(clone);
//     }
// });
