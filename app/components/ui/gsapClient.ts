// This module is safe to import on the server.
// It only imports GSAP dynamically at runtime (client-side).

export async function getGsap() {
  const { default: gsap } = await import("gsap");
  return gsap;
}

export async function getScrollTrigger() {
  const { ScrollTrigger } = await import("gsap/ScrollTrigger");
  return ScrollTrigger;
}

export async function getSplitText() {
  const { SplitText } = await import("gsap/SplitText");
  return SplitText;
}
