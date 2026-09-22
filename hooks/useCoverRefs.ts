"use client";

import { useRef } from "react";
import type { MusicPlayerHandle } from "@/components/MusicPlayer";

/**
 * Single source of truth for the refs shared between the Hero's two
 * animation hooks — useOpenInvitation (Tahap 2, click) and
 * useScrollReveal (Tahap 3, scroll) both animate the same DOM nodes.
 */
export function useCoverRefs() {
  return {
    section: useRef<HTMLElement>(null),
    coverInner: useRef<HTMLDivElement>(null),
    background: useRef<HTMLDivElement>(null),
    video: useRef<HTMLVideoElement>(null),
    // a second, separate <video> for the seamless ambient loop that takes
    // over once `video` (the curtain-parting clip) finishes — see
    // useOpenInvitation's ended-handler. Kept as its own element (rather
    // than reusing `video` and swapping its `src`) so the swap is a plain
    // opacity crossfade between two already-decoded frames instead of a
    // src change, which briefly falls back to `video`'s poster image
    // while the new source buffers.
    loopVideo: useRef<HTMLVideoElement>(null),
    glow: useRef<HTMLDivElement>(null),
    content: useRef<HTMLDivElement>(null),
    title: useRef<HTMLHeadingElement>(null),
    // wraps the button + "tap to open" hint so both fade together on open
    button: useRef<HTMLDivElement>(null),
    // the "scroll down" cue that replaces it once the cover has opened
    scrollCue: useRef<HTMLButtonElement>(null),
    music: useRef<MusicPlayerHandle>(null),
  };
}

export type CoverRefs = ReturnType<typeof useCoverRefs>;
