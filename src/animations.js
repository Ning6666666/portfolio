import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EASE = "expo.out";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Portfolio opening + scroll reveal choreography.
 * Returns a cleanup function that kills timelines and triggers.
 */
export function initPortfolioAnimations() {
  // Reduced motion: leave every revealable element visible, no animation.
  if (prefersReducedMotion()) {
    document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-visible"));
    return () => undefined;
  }

  const timelines = [];
  const tweens = [];

  /* ---------- 1. Hero opening timeline ---------- */
  const hero = document.querySelector(".hero");
  if (hero) {
    const tl = gsap.timeline({ defaults: { ease: EASE } });

    tl.fromTo(
      ".hero__eyebrow",
      { y: 24, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.9 },
      0.15,
    )
      .fromTo(
        ".hero__intro",
        { y: 24, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.9 },
        0.28,
      )
      .fromTo(
        ".hero-line > span",
        { yPercent: 112, scale: 0.92 },
        { yPercent: 0, scale: 1, duration: 1.15, stagger: 0.12 },
        0.4,
      )
      .fromTo(
        ".hero__script",
        { y: 22, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8 },
        0.72,
      )
      .fromTo(
        ".hero__stamp",
        { y: 22, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8 },
        0.8,
      )
      .fromTo(
        ".hero__lead",
        { y: 22, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8 },
        0.88,
      )
      .fromTo(
        ".hero__actions",
        { y: 22, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8 },
        0.96,
      )
      .fromTo(
        ".hero__foot",
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.8 },
        1.04,
      )
      .fromTo(
        ".hero__side-note",
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.8 },
        1.04,
      );

    timelines.push(tl);
  }

  /* ---------- 2. Section labels ---------- */
  document.querySelectorAll(".section-label").forEach((el) => {
    const tween = gsap.fromTo(
      el,
      { y: 28, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.9,
        ease: EASE,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      },
    );
    tweens.push(tween);
  });

  /* ---------- 3. Large headings ---------- */
  const headings = document.querySelectorAll(
    ".about__statement, .work__heading h2, .capabilities__intro h2, .contact__main h2",
  );
  headings.forEach((el) => {
    const tween = gsap.fromTo(
      el,
      { y: 60, autoAlpha: 0, scale: 0.96 },
      {
        y: 0,
        autoAlpha: 1,
        scale: 1,
        duration: 1.1,
        ease: EASE,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      },
    );
    tweens.push(tween);
  });

  /* ---------- 4. Card groups (stagger) ---------- */
  const cardGroups = [
    ".about__summary",
    ".work__featured",
    ".work__grid",
    ".project-boards",
    ".capability-grid",
  ];
  cardGroups.forEach((groupSel) => {
    const group = document.querySelector(groupSel);
    if (!group || !group.children.length) return;
    const tween = gsap.fromTo(
      group.children,
      { y: 44, autoAlpha: 0, scale: 0.98 },
      {
        y: 0,
        autoAlpha: 1,
        scale: 1,
        duration: 0.9,
        ease: EASE,
        stagger: 0.1,
        scrollTrigger: { trigger: group, start: "top 88%", once: true },
      },
    );
    tweens.push(tween);
  });

  /* ---------- 5. Standalone reveal blocks ---------- */
  const soloReveals = document.querySelectorAll(
    ".about__details, .about__timeline, .tool-strip, .contact__kicker, .contact__actions, .footer",
  );
  soloReveals.forEach((el) => {
    const tween = gsap.fromTo(
      el,
      { y: 32, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.9,
        ease: EASE,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      },
    );
    tweens.push(tween);
  });

  /* ---------- 6. Media reveal + light parallax ---------- */
  const media = document.querySelectorAll(
    ".project__visual img, .project__visual video, .about__portrait img",
  );
  media.forEach((mediaEl) => {
    const reveal = gsap.fromTo(
      mediaEl,
      { scale: 1.18, y: 24 },
      {
        scale: 1,
        y: 0,
        duration: 1.2,
        ease: EASE,
        scrollTrigger: { trigger: mediaEl, start: "top 90%", once: true },
      },
    );
    tweens.push(reveal);

    const host =
      mediaEl.closest("article") || mediaEl.closest(".about__portrait") || mediaEl;
    const parallax = gsap.to(mediaEl, {
      yPercent: 3,
      ease: "none",
      scrollTrigger: { trigger: host, start: "top bottom", end: "bottom top", scrub: true },
    });
    tweens.push(parallax);
  });

  return () => {
    timelines.forEach((tl) => tl.kill());
    tweens.forEach((tween) => {
      if (tween && typeof tween.kill === "function") tween.kill();
    });
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  };
}
