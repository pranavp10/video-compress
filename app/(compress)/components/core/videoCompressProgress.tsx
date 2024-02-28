import { Loader, XCircle } from "lucide-react";
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
      <div className="flex justify-between text-sm mb-2">
        <div className="flex gap-2 items-center">
          {progress ? <p>Compressing</p> : <p>Loading Video</p>}
          <Loader className="animate-spin w-4 h-4" />
        </div>
        <p ref={timeConsumedRef} className="text-sm" />
      </div>
      <Progress value={progress} />
    </div>
  </div>
);
