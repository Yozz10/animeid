import { User, Settings, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Profile() {
  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 md:py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <User className="w-8 h-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold font-display" data-testid="heading-profile">
            Profil
          </h1>
        </div>

        {/* Profile card */}
        <Card className="p-6 border-card-border">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src="https://i.pravatar.cc/150?img=12" alt="User" />
              <AvatarFallback>RA</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center md:text-left space-y-2">
              <h2 className="text-2xl font-bold" data-testid="text-username">Riyo AE</h2>
              <p className="text-muted-foreground" data-testid="text-level">Level 1356 (27%)</p>
              <div className="flex gap-2 justify-center md:justify-start flex-wrap">
                <Button variant="outline" size="sm" data-testid="button-edit-profile">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profil
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <Separator />

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-6 text-center border-card-border">
            <p className="text-3xl font-bold text-primary mb-2" data-testid="text-anime-watched">42</p>
            <p className="text-sm text-muted-foreground">Anime Ditonton</p>
          </Card>
          <Card className="p-6 text-center border-card-border">
            <p className="text-3xl font-bold text-chart-2 mb-2" data-testid="text-episodes-watched">587</p>
            <p className="text-sm text-muted-foreground">Episode Selesai</p>
          </Card>
          <Card className="p-6 text-center border-card-border">
            <p className="text-3xl font-bold text-chart-4 mb-2" data-testid="text-watch-time">234h</p>
            <p className="text-sm text-muted-foreground">Waktu Menonton</p>
          </Card>
        </div>

        {/* About */}
        <Card className="p-6 border-card-border">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Tentang AnimeID</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            AnimeID adalah platform streaming anime terbaik dengan koleksi lengkap anime terbaru dan populer. 
            Nikmati pengalaman menonton anime dengan kualitas HD dan subtitle Indonesia.
          </p>
        </Card>
      </div>
    </div>
  );
}
