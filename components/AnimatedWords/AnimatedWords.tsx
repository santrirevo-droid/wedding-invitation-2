"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { useTextReveal, type TextRevealVariant } from "@/hooks/useTextReveal";

/** Splits into small phrase clusters, not single words — animating every
 * individual word in a long sentence reads as a busy typewriter effect;
 * 2–3 word groups keep the same "text arriving" feeling while staying
 * elegant rather than frantic. */
function groupWords(text: string, groupSize: number): string[] {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const groups: string[] = [];
  for (let i = 0; i < words.length; i += groupSize) {
    groups.push(words.slice(i, i + groupSize).join(" "));
  }
  return groups;
}

/**
 * Renders `text` as a sequence of small inline-block phrase groups and
 * reveals them in a stagger (see useTextReveal) once scrolled into view.
 *
 * Deliberately takes a plain `text` string rather than arbitrary JSX
 * children — splitting real React children (mixed text + embedded
 * elements) into animatable groups is a much harder problem than this
 * page needs; callers with dynamic values (a name, a date) just
 * interpolate them into the string before passing it in.
 */
export default function AnimatedWords({
  text,
  variant = "rise",
  groupSize = 3,
  as: Tag = "span",
  className = "",
  wordClassName = "inline-block",
  ...rest
}: {
  text: string;
  variant?: TextRevealVariant;
  groupSize?: number;
  as?: ElementType;
  className?: string;
  wordClassName?: string;
} & Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null);
  useTextReveal(ref, variant);

  const groups = groupWords(text, groupSize);

  const content: ReactNode[] = [];
  groups.forEach((group, i) => {
    content.push(
      <span key={i} data-word-group className={wordClassName}>
        {group}
      </span>
    );
    if (i < groups.length - 1) content.push(" ");
  });

  return (
    <Tag ref={ref} className={className} {...rest}>
      {content}
    </Tag>
  );
}
