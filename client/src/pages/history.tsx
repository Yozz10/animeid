import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ContinueWatching } from "@/components/continue-watching";
import { Clock } from "lucide-react";
import type { WatchHistory } from "@shared/schema";

export default function History() {
  const { data: watchHistory, isLoading } = useQuery<WatchHistory[]>({
    queryKey: ["/api/watch-history"],
  });

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Clock className="w-8 h-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold font-display" data-testid="heading-history">
            Riwayat Tontonan
          </h1>
        </div>

        {/* History list */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        ) : watchHistory && watchHistory.length > 0 ? (
          <ContinueWatching history={watchHistory} />
        ) : (
          <Card className="p-12 text-center border-card-border">
            <Clock className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Belum Ada Riwayat</h3>
            <p className="text-muted-foreground">
              Mulai menonton anime untuk melihat riwayat tontonan Anda di sini
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
