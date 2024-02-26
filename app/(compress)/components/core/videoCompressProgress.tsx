import { XCircle } from "lucide-react";
import { Progress } from "~/components/ui/progress";

type VideoCompressProgressProps = {
  timeConsumedRef: React.RefObject<HTMLParagraphElement>;
  progress: number;
};

export const VideoCompressProgress = ({
  progress,
  timeConsumedRef,
}: VideoCompressProgressProps) => (
  <div className="flex justify-between items-center gap-2 p-0.5">
    <div className="flex-1">
      <div className="flex justify-between text-sm mb-1">
        <p>Compressing</p>
        <p ref={timeConsumedRef}></p>
      </div>
      <Progress value={progress} />
    </div>
    <div>
      <XCircle className="w-5 h-5 text-white" fill="#000" />
    </div>
  </div>
);
