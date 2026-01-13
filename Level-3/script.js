// Page load animation (timeline)
gsap.registerPlugin(ScrollTrigger);
const heroTimeline = gsap.timeline({ defaults: { ease: "power2.out" } });

heroTimeline
  .from(".hero-title", {
    opacity: 0,
    y: 30,
    duration: 0.8
  })
  .from(".hero-text", {
    opacity: 0,
    y: 20,
    duration: 0.6
  }, "-=0.4")
  .from(".hero-btn", {
    opacity: 0,
    y: 20,
    duration: 0.6
  }, "-=0.3");

// Button hover micro-interaction
const button = document.querySelector(".hero-btn");

button.addEventListener("mouseenter", () => {
  gsap.to(button, {
    scale: 1.05,
    duration: 0.2
  });
});

button.addEventListener("mouseleave", () => {
  gsap.to(button, {
    scale: 1,
    duration: 0.2
  });
});

// Cards animation on scroll (simple & lightweight)
gsap.from(".card", {
  opacity: 0,
  y: 40,
  duration: 0.8,
  stagger: 0.2,
  scrollTrigger: {
    trigger: ".cards-section",
    start: "top 80%"
  }
});
button.addEventListener("click", () => {
  document.querySelector(".cards-section").scrollIntoView({
    behavior: "smooth"
  });
});

