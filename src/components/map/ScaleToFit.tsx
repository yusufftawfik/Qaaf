"use client";

import * as React from "react";

/**
 * Renders its children at a fixed `designWidth` and uniformly scales the whole
 * block down (or up) so it always fits the available width — like viewing a
 * poster image. This keeps the full horizontal Manhaj Al-Noor layout intact on
 * every screen instead of reflowing it into a vertical stack.
 */
export function ScaleToFit({
  designWidth,
  children,
}: {
  designWidth: number;
  children: React.ReactNode;
}) {
  const outerRef = React.useRef<HTMLDivElement>(null);
  const innerRef = React.useRef<HTMLDivElement>(null);
  const [scale, setScale] = React.useState(1);
  const [height, setHeight] = React.useState<number | undefined>(undefined);

  React.useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const update = () => {
      const w = outer.clientWidth;
      const s = w / designWidth;
      setScale(s);
      setHeight(inner.offsetHeight * s);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(outer);
    ro.observe(inner);
    return () => ro.disconnect();
  }, [designWidth]);

  return (
    <div ref={outerRef} className="w-full overflow-hidden" style={{ height }}>
      <div
        ref={innerRef}
        style={{
          width: designWidth,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}
