import { Block, HighlightedCodeBlock, parseRoot } from "codehike/blocks";
import { z } from "zod";
import { AbsoluteFill, Composition, Sequence, useCurrentFrame } from "remotion";
import { Code } from "./code";

import Content from "./content.md";
import { Step } from "./types";
import { VideoProvider } from "../../context/video-context";

const { steps }: { steps: Step[] } = parseRoot(
  Content,
  Block.extend({
    steps: z.array(
      Block.extend({
        code: HighlightedCodeBlock,
        duration: z.string().transform((v) => parseInt(v, 10)),
      }),
    ),
  }),
);

export default function RemotionRoot() {
  const duration = steps.reduce((acc, step) => acc + step.duration, 0);
  return (
    <Composition
      id="Sagar"
      component={Video}
      defaultProps={{ steps }}
      durationInFrames={duration}
      fps={60}
      width={1920}
      height={1080}
    />
  );
}

export function VerticalRoot() {
  const duration = steps.reduce((acc, step) => acc + step.duration, 0);
  return (
    <Composition
      id="SagarVertical"
      component={Video}
      defaultProps={{ steps, isVertical: true }}
      durationInFrames={duration}
      fps={60}
      width={1080}
      height={1920}
    />
  );
}

type VideoProps = { steps: Step[]; isVertical?: boolean };

function Video({ steps, isVertical }: VideoProps) {
  let stepEnd = 0;

  const paths = steps.map((step) => {
    return step.code.meta;
  });

  const frame = useCurrentFrame();

  let currentIndex = 0;
  let nextStart = steps[currentIndex].duration;
  while (nextStart <= frame) {
    currentIndex++;
    nextStart += steps[currentIndex].duration;
  }

  return (
    <AbsoluteFill style={{ backgroundColor: "#10121a" }}>
      <VideoProvider
        value={{
          showExplorer: !isVertical,
          currentSequenceIndex: currentIndex,
          paths,
        }}
      >
        <>
          {/* <ProgressBar steps={steps} /> */}
          {steps.map((step, index) => {
            stepEnd += step.duration;
            return (
              <Sequence
                key={index}
                from={stepEnd - step.duration}
                durationInFrames={step.duration}
                name={step.title}
                className="px-8 py-11"
              >
                <Code
                  oldCode={steps[index - 1]?.code}
                  newCode={step.code}
                  durationInFrames={90}
                />
              </Sequence>
            );
          })}
        </>
      </VideoProvider>
    </AbsoluteFill>
  );
}
