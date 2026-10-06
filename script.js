const root = document.documentElement;
const body = document.body;

const header =
  document.querySelector(".header");

const navLinksContainer =
  document.querySelector(".nav-links");

const menuToggle =
  document.querySelector(".menu-toggle");

const themeToggle =
  document.querySelector(".theme-toggle");

const themeIcon =
  document.querySelector(".theme-icon");

const dynamicRole =
  document.querySelector("#dynamic-role");

const year =
  document.querySelector("#year");


const reduceMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


const desktopPointer =
  window.matchMedia(
    "(min-width: 1000px) and (hover: hover) and (pointer: fine)"
  );


/* ==========================================
   ANO AUTOMÁTICO
========================================== */

if (year) {

  year.textContent =
    new Date().getFullYear();

}


/* ==========================================
   TEMA CLARO / ESCURO
========================================== */

const savedTheme =
  localStorage.getItem(
    "portfolio-theme"
  );


const systemPrefersLight =
  window.matchMedia(
    "(prefers-color-scheme: light)"
  ).matches;


const initialTheme =
  savedTheme ||
  (
    systemPrefersLight
      ? "light"
      : "dark"
  );


function applyTheme(theme) {

  root.dataset.theme =
    theme;


  if (themeIcon) {

    themeIcon.textContent =
      theme === "light"
        ? "☀"
        : "☾";

  }


  localStorage.setItem(
    "portfolio-theme",
    theme
  );

}


applyTheme(initialTheme);


themeToggle?.addEventListener(
  "click",
  () => {

    const nextTheme =
      root.dataset.theme === "light"
        ? "dark"
        : "light";


    applyTheme(nextTheme);

  }
);


/* ==========================================
   MENU MOBILE
========================================== */

function closeMenu() {

  navLinksContainer?.classList.remove(
    "open"
  );


  menuToggle?.classList.remove(
    "open"
  );


  menuToggle?.setAttribute(
    "aria-expanded",
    "false"
  );


  menuToggle?.setAttribute(
    "aria-label",
    "Abrir menu"
  );

}


menuToggle?.addEventListener(
  "click",
  () => {

    const isOpen =
      navLinksContainer?.classList.toggle(
        "open"
      );


    menuToggle.classList.toggle(
      "open",
      Boolean(isOpen)
    );


    menuToggle.setAttribute(
      "aria-expanded",
      String(Boolean(isOpen))
    );


    menuToggle.setAttribute(
      "aria-label",
      isOpen
        ? "Fechar menu"
        : "Abrir menu"
    );

  }
);


document
  .querySelectorAll(".nav-link")
  .forEach((link) => {

    link.addEventListener(
      "click",
      closeMenu
    );

  });


document.addEventListener(
  "click",
  (event) => {

    const clickedInsideNav =
      event.target.closest(".nav");


    if (!clickedInsideNav) {

      closeMenu();

    }

  }
);


/* ==========================================
   HEADER QUANDO ROLA
========================================== */

function updateHeader() {

  header?.classList.toggle(
    "scrolled",
    window.scrollY > 12
  );

}


updateHeader();


window.addEventListener(
  "scroll",
  updateHeader,
  {
    passive: true
  }
);


/* ==========================================
   ANIMAÇÕES AO ROLAR
========================================== */

const revealElements =
  document.querySelectorAll(
    ".reveal"
  );


revealElements.forEach(
  (element) => {

    const delay =
      Number(
        element.dataset.delay || 0
      );


    element.style.setProperty(
      "--reveal-delay",
      `${delay}ms`
    );

  }
);


if (
  !reduceMotion &&
  "IntersectionObserver" in window
) {

  const revealObserver =
    new IntersectionObserver(

      (
        entries,
        observer
      ) => {

        entries.forEach(
          (entry) => {

            if (
              entry.isIntersecting
            ) {

              entry.target
                .classList
                .add("visible");


              observer.unobserve(
                entry.target
              );

            }

          }
        );

      },

      {
        threshold: 0.13,

        rootMargin:
          "0px 0px -28px 0px"
      }

    );


  revealElements.forEach(
    (element) => {

      revealObserver.observe(
        element
      );

    }
  );

}
else {

  revealElements.forEach(
    (element) => {

      element
        .classList
        .add("visible");

    }
  );

}


/* ==========================================
   LINK ATIVO DO MENU
========================================== */

const sections =
  [
    ...document.querySelectorAll(
      "main section[id]"
    )
  ];


const navLinks =
  [
    ...document.querySelectorAll(
      ".nav-link"
    )
  ];


if (
  "IntersectionObserver" in window
) {

  const sectionObserver =
    new IntersectionObserver(

      (entries) => {

        entries.forEach(
          (entry) => {

            if (
              !entry.isIntersecting
            ) {

              return;

            }


            navLinks.forEach(
              (link) => {

                const targetId =
                  link.getAttribute(
                    "href"
                  );


                link.classList.toggle(
                  "active",

                  targetId ===
                    `#${entry.target.id}`
                );

              }
            );

          }
        );

      },

      {
        rootMargin:
          "-35% 0px -55% 0px",

        threshold:
          0
      }

    );


  sections.forEach(
    (section) => {

      sectionObserver.observe(
        section
      );

    }
  );

}


/* ==========================================
   TEXTO MUDANDO NO HERO
========================================== */

const roles = [

  "Front-end",

  "Back-end",

  "Software",

  "Web"

];


let roleIndex = 0;


if (
  dynamicRole &&
  !reduceMotion
) {

  window.setInterval(
    () => {

      dynamicRole
        .classList
        .add("switching");


      window.setTimeout(
        () => {

          roleIndex =
            (
              roleIndex + 1
            ) % roles.length;


          dynamicRole.textContent =
            roles[roleIndex];


          dynamicRole
            .classList
            .remove(
              "switching"
            );

        },

        190
      );

    },

    2400
  );

}


/* ==========================================
   EFEITO TOUCH NOS CARDS
========================================== */

const interactiveCards =
  document.querySelectorAll(
    ".interactive-card"
  );


interactiveCards.forEach(
  (card) => {

    card.addEventListener(

      "pointerdown",

      (event) => {

        if (
          desktopPointer.matches
        ) {

          return;

        }


        const rect =
          card.getBoundingClientRect();


        const x =
          event.clientX -
          rect.left;


        const y =
          event.clientY -
          rect.top;


        card.style.setProperty(
          "--mouse-x",
          `${x}px`
        );


        card.style.setProperty(
          "--mouse-y",
          `${y}px`
        );


        card.classList.add(
          "touch-active"
        );


        window.setTimeout(
          () => {

            card.classList.remove(
              "touch-active"
            );

          },

          420
        );

      },

      {
        passive: true
      }

    );

  }
);


/* ==========================================
   CURSOR CUSTOMIZADO
========================================== */

const pointerGlow =
  document.querySelector(
    ".pointer-glow"
  );


const cursorDot =
  document.querySelector(
    ".cursor-dot"
  );


const cursorOutline =
  document.querySelector(
    ".cursor-outline"
  );


let mouseX =
  window.innerWidth / 2;


let mouseY =
  window.innerHeight / 2;


let outlineX =
  mouseX;


let outlineY =
  mouseY;


let cursorAnimationId =
  null;


/* CURSOR SUAVE */

function animateCursor() {

  outlineX +=
    (
      mouseX -
      outlineX
    ) * 0.18;


  outlineY +=
    (
      mouseY -
      outlineY
    ) * 0.18;


  if (cursorDot) {

    cursorDot.style.left =
      `${mouseX}px`;

    cursorDot.style.top =
      `${mouseY}px`;

  }


  if (cursorOutline) {

    cursorOutline.style.left =
      `${outlineX}px`;

    cursorOutline.style.top =
      `${outlineY}px`;

  }


  cursorAnimationId =
    requestAnimationFrame(
      animateCursor
    );

}


/* ==========================================
   ATIVA EFEITOS DESKTOP
========================================== */

function enableDesktopEffects() {

  if (
    !desktopPointer.matches ||
    reduceMotion
  ) {

    return;

  }


  document.addEventListener(

    "pointermove",

    onPointerMove,

    {
      passive: true
    }

  );


  /* LUZ NOS CARDS */

  interactiveCards.forEach(
    (card) => {

      card.addEventListener(

        "pointermove",

        updateCardSpotlight

      );

    }
  );


  /* TILT 3D */

  document
    .querySelectorAll(
      "[data-tilt]"
    )
    .forEach(
      (element) => {

        element.addEventListener(
          "pointermove",
          handleTilt
        );


        element.addEventListener(
          "pointerleave",
          resetTilt
        );

      }
    );


  /* BOTÕES MAGNÉTICOS */

  document
    .querySelectorAll(
      ".magnetic"
    )
    .forEach(
      (element) => {

        element.addEventListener(
          "pointermove",
          handleMagnetic
        );


        element.addEventListener(
          "pointerleave",
          resetMagnetic
        );

      }
    );


  /* CURSOR GRANDE EM LINKS */

  document
    .querySelectorAll(
      "a, button, .interactive-card"
    )
    .forEach(
      (element) => {

        element.addEventListener(
          "pointerenter",
          () => {

            body.classList.add(
              "cursor-hover"
            );

          }
        );


        element.addEventListener(
          "pointerleave",
          () => {

            body.classList.remove(
              "cursor-hover"
            );

          }
        );

      }
    );


  if (
    !cursorAnimationId
  ) {

    animateCursor();

  }

}


/* ==========================================
   DESATIVA EFEITOS
========================================== */

function disableDesktopEffects() {

  document.removeEventListener(
    "pointermove",
    onPointerMove
  );


  interactiveCards.forEach(
    (card) => {

      card.removeEventListener(
        "pointermove",
        updateCardSpotlight
      );


      card.style.removeProperty(
        "--mouse-x"
      );


      card.style.removeProperty(
        "--mouse-y"
      );

    }
  );


  document
    .querySelectorAll(
      "[data-tilt]"
    )
    .forEach(
      (element) => {

        element.removeEventListener(
          "pointermove",
          handleTilt
        );


        element.removeEventListener(
          "pointerleave",
          resetTilt
        );


        element.style.removeProperty(
          "transform"
        );

      }
    );


  document
    .querySelectorAll(
      ".magnetic"
    )
    .forEach(
      (element) => {

        element.removeEventListener(
          "pointermove",
          handleMagnetic
        );


        element.removeEventListener(
          "pointerleave",
          resetMagnetic
        );


        element.style.removeProperty(
          "transform"
        );

      }
    );


  body.classList.remove(
    "cursor-hover"
  );


  if (
    cursorAnimationId
  ) {

    cancelAnimationFrame(
      cursorAnimationId
    );


    cursorAnimationId =
      null;

  }

}


/* ==========================================
   LUZ QUE SEGUE O MOUSE
========================================== */

function onPointerMove(event) {

  mouseX =
    event.clientX;


  mouseY =
    event.clientY;


  root.style.setProperty(
    "--pointer-x",
    `${mouseX}px`
  );


  root.style.setProperty(
    "--pointer-y",
    `${mouseY}px`
  );


  if (pointerGlow) {

    pointerGlow.style.opacity =
      "1";

  }

}


/* ==========================================
   LUZ INTERNA NOS CARDS
========================================== */

function updateCardSpotlight(event) {

  const card =
    event.currentTarget;


  const rect =
    card.getBoundingClientRect();


  card.style.setProperty(

    "--mouse-x",

    `${
      event.clientX -
      rect.left
    }px`

  );


  card.style.setProperty(

    "--mouse-y",

    `${
      event.clientY -
      rect.top
    }px`

  );

}


/* ==========================================
   TILT 3D
========================================== */

function handleTilt(event) {

  const element =
    event.currentTarget;


  const rect =
    element.getBoundingClientRect();


  const x =
    event.clientX -
    rect.left;


  const y =
    event.clientY -
    rect.top;


  const rotateY =
    (
      (
        x /
        rect.width
      ) -
      0.5
    ) * 5;


  const rotateX =
    (
      (
        y /
        rect.height
      ) -
      0.5
    ) * -5;


  element.style.transform = `

    perspective(900px)

    rotateX(
      ${rotateX}deg
    )

    rotateY(
      ${rotateY}deg
    )

    translateY(-3px)

  `;

}


function resetTilt(event) {

  event
    .currentTarget
    .style
    .transform = "";

}


/* ==========================================
   BOTÃO MAGNÉTICO
========================================== */

function handleMagnetic(event) {

  const element =
    event.currentTarget;


  const rect =
    element.getBoundingClientRect();


  const x =

    event.clientX -

    rect.left -

    rect.width / 2;


  const y =

    event.clientY -

    rect.top -

    rect.height / 2;


  element.style.transform = `

    translate(
      ${x * 0.10}px,
      ${y * 0.10}px
    )

  `;

}


function resetMagnetic(event) {

  event
    .currentTarget
    .style
    .transform = "";

}


/* ==========================================
   INICIALIZAÇÃO
========================================== */

enableDesktopEffects();


desktopPointer.addEventListener?.(

  "change",

  (event) => {

    if (
      event.matches
    ) {

      enableDesktopEffects();

    }
    else {

      disableDesktopEffects();

    }

  }

);