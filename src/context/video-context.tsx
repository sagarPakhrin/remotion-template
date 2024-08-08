import { createStrictContext } from "./strict-context";

export interface VideoState {
  showExplorer?: boolean;
  currentSequenceIndex: number;
  paths: string[];
}

export interface VideoContext extends VideoState {}

const [Provider, useContext] = createStrictContext<VideoContext>();

type Props = {
  children: React.ReactNode;
  value: VideoState;
};

const VideoProvider = ({ children, ...props }: Props) => {
  return <Provider {...props}>{children}</Provider>;
};

export { VideoProvider, useContext as useVideoContext };
