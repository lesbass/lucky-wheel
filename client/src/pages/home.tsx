import { useQuery } from "@tanstack/react-query";
import { PlayerForm } from "@/components/PlayerForm";
import { WheelOfFortune } from "@/components/WheelOfFortune";
import { WinnerDisplay } from "@/components/WinnerDisplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Player } from "@shared/schema";
import { useState } from "react";

export default function Home() {
  const [winner, setWinner] = useState<Player | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const { data: players = [] } = useQuery({
    queryKey: ["/api/players"],
  });

  const handleSpinComplete = (winner: Player) => {
    setWinner(winner);
  };

  const handleReset = () => {
    setWinner(null);
    setIsSpinning(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Who's Driving Today?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <PlayerForm />
            <WheelOfFortune 
              players={players} 
              onSpinComplete={handleSpinComplete}
              isSpinning={isSpinning}
              setIsSpinning={setIsSpinning}
            />
          </CardContent>
        </Card>
      </div>
      <WinnerDisplay 
        winner={winner} 
        onReset={handleReset}
      />
    </div>
  );
}