import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import type { RefObject } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, DrawSVGPlugin);

export function usePageMotion(root: RefObject<HTMLDivElement | null>, enabled: boolean) {
  useGSAP(
    () => {
      if (!enabled) return;
      const media = gsap.matchMedia();
      media.add(
        "(prefers-reduced-motion: no-preference)",
        () => {
          const headline = SplitText.create(".hero-title", { type: "words", mask: "words" });
          const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
          intro
            .from(
              headline.words,
              { yPercent: 110, rotation: 3, duration: 1.1, stagger: 0.08 },
              0.08,
            )
            .from(".hero-disc", { scale: 0.8, autoAlpha: 0, duration: 1.3 }, 0)
            .from(".orbit-line", { drawSVG: 0, duration: 1.5, stagger: 0.035 }, 0.15)
            .from(".card-back", { y: 80, rotation: -20, autoAlpha: 0, duration: 1.2 }, 0.25)
            .from(".card-front", { y: 120, rotation: 15, autoAlpha: 0, duration: 1.25 }, 0.4)
            .from(".hero-support", { y: 24, autoAlpha: 0, duration: 0.7, stagger: 0.1 }, 0.75);

          gsap.to(".card-drift", {
            y: -55,
            rotation: 5,
            ease: "none",
            scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.8 },
          });
          const statement = SplitText.create(".manifesto", { type: "words" });
          gsap.from(statement.words, {
            opacity: 0.22,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: {
              trigger: ".manifesto",
              start: "top 82%",
              end: "bottom 48%",
              scrub: 0.4,
            },
          });
          for (const title of gsap.utils.toArray<HTMLElement>(".reveal-title")) {
            SplitText.create(title, {
              type: "lines",
              mask: "lines",
              autoSplit: true,
              onSplit(self) {
                return gsap.from(self.lines, {
                  yPercent: 105,
                  duration: 0.9,
                  stagger: 0.11,
                  ease: "power3.out",
                  scrollTrigger: { trigger: title, start: "top 91%", once: true },
                });
              },
            });
          }
          for (const group of gsap.utils.toArray<HTMLElement>(".reveal-group")) {
            gsap.from(group.children, {
              y: 26,
              opacity: 0,
              duration: 0.75,
              stagger: 0.09,
              scrollTrigger: { trigger: group, start: "top 92%", once: true },
            });
          }
          gsap.from(".goal-line", {
            drawSVG: 0,
            duration: 1.5,
            ease: "power2.inOut",
            scrollTrigger: { trigger: ".savings", start: "top 75%", once: true },
          });
          gsap.from(".footer-word", {
            yPercent: 22,
            ease: "none",
            scrollTrigger: {
              trigger: ".site-footer",
              start: "top bottom",
              end: "bottom bottom",
              scrub: 0.5,
            },
          });
          gsap.fromTo(
            ".life-line-one",
            { xPercent: 9 },
            {
              xPercent: -5,
              ease: "none",
              scrollTrigger: {
                trigger: ".life-interlude",
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
              },
            },
          );
          gsap.fromTo(
            ".life-line-two",
            { xPercent: -10 },
            {
              xPercent: 6,
              ease: "none",
              scrollTrigger: {
                trigger: ".life-interlude",
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
              },
            },
          );
          gsap.to(".life-star", {
            rotation: 110,
            ease: "none",
            scrollTrigger: {
              trigger: ".life-interlude",
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          });
          gsap.from(".plinth-glyph", {
            rotation: -35,
            scale: 0.75,
            opacity: 0,
            duration: 1,
            scrollTrigger: { trigger: ".product-preview", start: "top 85%", once: true },
          });
          media.add("(hover: hover) and (pointer: fine)", () => {
            const art = root.current?.querySelector<HTMLElement>(".hero-art");
            const card = root.current?.querySelector<HTMLElement>(".card-parallax");
            if (!art || !card) return;
            const rx = gsap.quickTo(card, "rotationX", { duration: 0.7, ease: "power3.out" });
            const ry = gsap.quickTo(card, "rotationY", { duration: 0.7, ease: "power3.out" });
            const x = gsap.quickTo(card, "x", { duration: 0.7, ease: "power3.out" });
            const y = gsap.quickTo(card, "y", { duration: 0.7, ease: "power3.out" });
            const move = (event: PointerEvent) => {
              const box = art.getBoundingClientRect();
              const px = (event.clientX - box.left) / box.width - 0.5;
              const py = (event.clientY - box.top) / box.height - 0.5;
              rx(-py * 13);
              ry(px * 16);
              x(px * 18);
              y(py * 12);
            };
            const leave = () => {
              rx(0);
              ry(0);
              x(0);
              y(0);
            };
            art.addEventListener("pointermove", move);
            art.addEventListener("pointerleave", leave);
            return () => {
              art.removeEventListener("pointermove", move);
              art.removeEventListener("pointerleave", leave);
            };
          });
        },
        root,
      );
      return () => media.revert();
    },
    { scope: root, dependencies: [enabled], revertOnUpdate: true },
  );
}

export { gsap, ScrollTrigger, useGSAP };
