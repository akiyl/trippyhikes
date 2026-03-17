import React from "react";
import SplitServer from "./SplitServer";
import HeadingAnimator from "./HeadingAnimator";

type Props = {
  text: string;
  level?: 1 | 2 | 3 | 4;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
};

export default function AnimatedHeading({
  text,
  level = 1,
  as = "h1",
  className,
}: Props) {
  const id = `animated-heading-${Math.random().toString(36).slice(2, 9)}`;

  const Tag: any = as;

  return (
    <>
      <Tag id={id} className={className}>
        <SplitServer text={text} type="words" />
      </Tag>
      {/* client animator picks up the server-rendered spans */}
      <HeadingAnimator id={id} level={level} />
    </>
  );
}
