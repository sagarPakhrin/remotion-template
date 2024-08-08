import { Pre, HighlightedCode } from "codehike/code";

import { loadFont } from "@remotion/google-fonts/RobotoMono";
import { tokenTransitions, useTokenTransitions } from "./token-transitions";
import { mark } from "./annotations/mark";
import { Explorer } from "./file-tree";
import { useVideoContext } from "../../context/video-context";
const { fontFamily } = loadFont();

export function Code({
  oldCode,
  newCode,
  durationInFrames = 30,
}: {
  oldCode?: HighlightedCode;
  newCode: HighlightedCode;
  durationInFrames?: number;
}) {
  const { code, ref } = useTokenTransitions(oldCode, newCode, durationInFrames);
  const { showExplorer } = useVideoContext();

  return (
    <div
      style={{
        fontSize: 20,
        lineHeight: 1.6,
        fontFamily,
        color: "#fffa",
        width: "100%",
      }}
      className="flex"
    >
      {showExplorer && (
        <div className="h-full border-r border-gray-800 w-56 pr-5">
          <Explorer />
        </div>
      )}
      <div className="flex-col flex-1">
        <div className="px-5 text-left w-full border-b border-gray-800 text-gray-400 mb-5 pb-4">
          {newCode.meta}
        </div>
        <Pre ref={ref} code={code} handlers={[mark, tokenTransitions]} />
      </div>
    </div>
  );
}
