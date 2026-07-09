"use client";

import * as React from "react";

/**
 * Renders children at a fixed `designWidth`, centered, and scales the whole
 * block DOWN to fit narrower viewports (never up past its natural size). This
 * keeps the full horizontal poster visible and readable at 100% zoom, works in
 * RTL, and lets normal browser zoom enlarge a word.
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
      const s = Math.min(1, w / designWidth); // only shrink, never enlarge
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
    <div
      ref={outerRef}
      className="flex w-full items-start justify-center overflow-hidden"
      style={{ height }}
    >
      <div
        ref={innerRef}
        style={{
          width: designWidth,
          flex: "none",
          transform: `scale(${scale})`,
          transformOrigin: "top center",
        }}
      >
        {children}
      </div>
    </div>
  );
}
