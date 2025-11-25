document.addEventListener("DOMContentLoaded", () => {
  if (window.motion) {
    const { animate, stagger } = window.motion;

    // --- Staggered Title Animation ---
    const title = document.querySelector(".header-text .title");
    if (title) {
      const words = title.textContent.split(" ").map((word) => {
        return `<span class="word-wrapper" style="display: inline-block; overflow: hidden;"><span class="word" style="display: inline-block; transform: translateY(100%);">${word}</span></span>`;
      });
      title.innerHTML = words.join(" ");

      const wordElements = title.querySelectorAll(".word");
      animate(
        wordElements,
        { transform: "translateY(0)" },
        {
          duration: 0.8,
          delay: stagger(0.1),
          ease: [0.22, 1, 0.36, 1],
        },
      );
    }

    // --- General Scroll-triggered Animations ---
    const intersectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target;
            const animationType = element.dataset.animation;

            if (animationType === "fade-up") {
              animate(
                element,
                { opacity: [0, 1], y: [20, 0] },
                { duration: 0.8, ease: "easeOut" },
              );
            } else if (animationType === "project-stagger") {
              const cards = element.querySelectorAll(".project-card");
              animate(
                cards,
                { opacity: [0, 1], y: [30, 0] },
                {
                  duration: 0.6,
                  delay: stagger(0.15),
                  ease: "easeOut",
                },
              );
            }
            observer.unobserve(element);
          }
        });
      },
      { threshold: 0.2 },
    );

    // Assign animations to elements
    document
      .querySelectorAll(".header-text .subtitle, .header-text .description, .contact-button, .header-image")
      .forEach((el) => {
        el.dataset.animation = "fade-up";
        el.style.opacity = 0;
        intersectionObserver.observe(el);
      });

    const projectSection = document.querySelector(".project-cards");
    if (projectSection) {
      projectSection.dataset.animation = "project-stagger";
      projectSection.style.opacity = 0; // Hide the container initially
      setTimeout(() => { // Delay observation slightly to ensure proper trigger
        projectSection.style.opacity = 1;
        intersectionObserver.observe(projectSection);
      }, 200);
    }
    
    document.querySelectorAll('.skills-title, .projects-title, #contact h2, .contact-content').forEach(el => {
        el.dataset.animation = "fade-up";
        el.style.opacity = 0;
        intersectionObserver.observe(el);
    });

  }
});
