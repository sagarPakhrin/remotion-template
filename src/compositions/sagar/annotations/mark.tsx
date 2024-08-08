import { interpolate, interpolateColors, useCurrentFrame } from "remotion";
import { AnnotationHandler } from "codehike/code";

const highlightColor = "#13202e";

export const mark: AnnotationHandler = {
  name: "mark",
  Inline: ({ children, annotation }) => {
    const parts = annotation.query.split(" ");

    const delay = +parts[0] || 80;
    const duration = +parts[1] || 20;
    const color = parts[2] || highlightColor;

    const frame = useCurrentFrame();
    const progress = interpolate(frame, [delay, delay + duration], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    const backgroundColor = interpolateColors(
      progress,
      [0, 1],
      ["rgba(0, 0, 0, 0)", color],
    );
    return (
      <div
        style={{
          display: "inline-block",
          backgroundColor,
          borderRadius: 4,
          padding: "0 16px",
          margin: "0 -16px",
        }}
      >
        {children}
      </div>
    );
  },
  Block: ({ children, annotation }) => {
    const parts = annotation.query.split(" ");

    const delay = +parts[0] || 80;
    const duration = +parts[1] || 20;

    const color = parts[2] || highlightColor;

    const frame = useCurrentFrame();

    const progress = interpolate(frame, [delay, delay + duration], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    const background = interpolateColors(
      progress,
      [0, 1],
      ["rgba(0, 0, 0, 0)", color],
    );

    return (
      <div style={{ background }} className="-mx-4 px-4">
        {children}
      </div>
    );
  },
};
