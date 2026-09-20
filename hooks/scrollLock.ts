"use client";

const UNLOCK_EVENT = "invitation:scroll-unlocked";

/**
 * Runs `callback` once the cover's scroll-lock is released — immediately,
 * if the page is already unlocked when called, otherwise as soon as
 * useOpenInvitation's open() animation finishes and calls
 * notifyScrollUnlocked().
 *
 * Every ScrollTrigger-based reveal hook (useTextReveal, useRevealOnScroll,
 * useHeadingReveal, Wishes' own inline one) needs this: they all mount on
 * initial page load, which is *before* "Buka Undangan" is pressed — while
 * html.scroll-locked (overflow: hidden) is still applied. Creating a
 * ScrollTrigger while the page can't scroll makes GSAP miscalculate that
 * trigger's start/end against a zero-scrollable-range page, so its
 * `once: true` onEnter fires immediately instead of waiting for the
 * visitor to actually scroll there — and a later ScrollTrigger.refresh()
 * can't undo a once-only callback that already fired. Waiting for the
 * real unlock before creating the trigger at all is the only fix.
 *
 * Returns a cleanup function: unregisters the pending listener if the
 * component unmounts before unlock ever happens.
 */
export function whenScrollUnlocked(callback: () => void): () => void {
  if (typeof document === "undefined") return () => {};

  if (!document.documentElement.classList.contains("scroll-locked")) {
    callback();
    return () => {};
  }

  const handler = () => callback();
  window.addEventListener(UNLOCK_EVENT, handler, { once: true });
  return () => window.removeEventListener(UNLOCK_EVENT, handler);
}

/** Called by useOpenInvitation the moment scroll-locked is actually lifted. */
export function notifyScrollUnlocked() {
  window.dispatchEvent(new Event(UNLOCK_EVENT));
}
