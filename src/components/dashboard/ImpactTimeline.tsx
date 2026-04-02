import { CheckCircle, FileText, Heart, Package, Camera } from "lucide-react";
import type { RequestStatus } from "@/lib/constants";
import { TIMELINE_STAGES } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  FileText, CheckCircle, Heart, Package, Camera,
};

interface ImpactTimelineProps {
  currentStatus: RequestStatus;
}

export default function ImpactTimeline({ currentStatus }: ImpactTimelineProps) {
  const statusOrder = ["pending", "verified", "funded", "delivered", "impact_proof"];
  const currentIdx = statusOrder.indexOf(currentStatus);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0 w-full">
      {TIMELINE_STAGES.map((stage, i) => {
        const Icon = iconMap[stage.icon];
        const isCompleted = i <= currentIdx;
        const isCurrent = i === currentIdx;

        return (
          <div key={stage.key} className="flex items-center flex-1 w-full sm:w-auto">
            <div className="flex flex-col items-center text-center min-w-[80px]">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                  isCompleted
                    ? "bg-primary border-primary text-primary-foreground"
                    : "bg-muted border-border text-muted-foreground"
                } ${isCurrent ? "ring-4 ring-primary/20" : ""}`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <span className={`text-xs mt-1 ${isCompleted ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                {stage.label}
              </span>
            </div>
            {i < TIMELINE_STAGES.length - 1 && (
              <div className={`hidden sm:block flex-1 h-0.5 mx-1 ${i < currentIdx ? "bg-primary" : "bg-border"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
