import { Pre, HighlightedCode } from "codehike/code";

import { loadFont } from "@remotion/google-fonts/RobotoMono";
import { tokenTransitions, useTokenTransitions } from "./token-transitions";
import { mark } from "./annotations/mark";
import { Explorer } from "./file-tree";
const { fontFamily } = loadFont();

export function Code({
  oldCode,
  newCode,
  durationInFrames = 30,
  paths,
  currentIndex,
}: {
  oldCode?: HighlightedCode;
  newCode: HighlightedCode;
  durationInFrames?: number;
  paths: string[];
  currentIndex: number;
}) {
  const { code, ref } = useTokenTransitions(oldCode, newCode, durationInFrames);
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
      <div className="h-full border-r border-gray-800 w-80 pr-5">
        <Explorer paths={paths} currentIndex={currentIndex} />
      </div>
      <div className="px-5 flex-col w-full">
        <div
          className="text-left w-full border-b border-gray-800 text-gray-400 mb-5 pb-4"
          // style={{ textAlign: "center", height: "1.5rem" }}
        >
          {newCode.meta}
        </div>
        <Pre ref={ref} code={code} handlers={[tokenTransitions, mark]} />
      </div>
    </div>
  );
}
