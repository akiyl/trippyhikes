// Server component: renders text already split into spans so SSR matches client
import React from "react";

type Props = {
  text: string;
  type?: "words" | "chars";
  className?: string;
};

export default function SplitServer({
  text,
  type = "words",
  className,
}: Props) {
  const parts =
    type === "chars"
      ? text.split("").map((ch) => (ch === " " ? "\u00A0" : ch))
      : text.split(/(\s+)/).filter(Boolean);

  return (
    <span className={className} aria-label={text} role="heading">
      {parts.map((p, i) => (
        <span
          key={i}
          className="split-item inline-block mr-2 overflow-hidden"
          aria-hidden
        >
          <span className="inline-block">{p}</span>
        </span>
      ))}
    </span>
  );
}
