import { useState } from "react";
import { Wheel } from "react-custom-roulette";
import type { Player } from "@shared/schema";
import { Howl } from "howler";

interface WheelProps {
  players: Player[];
  onSpinComplete: (winner: Player) => void;
  isSpinning: boolean;
  setIsSpinning: (spinning: boolean) => void;
}

const spinSound = new Howl({
  src: ["https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3"],
  volume: 0.5,
});

// Modern, vibrant colors for 2025
const wheelColors = [
  "#FF0080", // Neon Pink
  "#7928CA", // Electric Purple
  "#00DFD8", // Cyber Turquoise
  "#FF4D4D", // Bright Coral
  "#00F5A0", // Neo Mint
  "#FFC700", // Vivid Yellow
  "#0070F3", // Bright Blue
  "#F5A623", // Vivid Orange
  "#7B61FF", // Electric Violet
  "#00C9A7", // Bright Teal
  "#FF3366", // Hot Pink
  "#3CDFFF", // Electric Blue
];

export function WheelOfFortune({
  players,
  onSpinComplete,
  isSpinning,
  setIsSpinning,
}: WheelProps) {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    if (!mustSpin && players.length >= 2) {
      // Get random number between 0 and players.length - 1
      const newPrizeNumber = Math.floor(Math.random() * players.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
      setIsSpinning(true);
      spinSound.play();
    }
  };

  const data = players.map((player) => ({
    option: player.name,
    style: { backgroundColor: wheelColors[player.id % wheelColors.length] },
  }));

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div
        onClick={handleSpinClick}
        className="flex justify-center"
        style={{
          opacity: players.length < 2 ? 0.5 : 1,
          cursor: isSpinning
            ? "not-allowed"
            : players.length < 2
              ? "not-allowed"
              : "pointer",
        }}
      >
        {players.length >= 2 && (
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data}
            onStopSpinning={() => {
              setMustSpin(false);
              setIsSpinning(false);
              onSpinComplete(players[prizeNumber]);
            }}
            spinDuration={0.8}
            outerBorderColor="#2D3748"
            outerBorderWidth={3}
            innerBorderColor="#2D3748"
            innerBorderWidth={2}
            radiusLineColor="#2D3748"
            radiusLineWidth={2}
            fontSize={16}
            textColors={["#fff"]}
            backgroundColors={data.map((d) => d.style.backgroundColor)}
          />
        )}
      </div>
      {players.length < 2 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-muted-foreground text-center">
            Add at least 2 players to spin the wheel
          </p>
        </div>
      )}
    </div>
  );
}
