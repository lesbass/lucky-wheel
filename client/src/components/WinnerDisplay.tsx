import { motion, AnimatePresence } from "framer-motion";
import { Player } from "@shared/schema";
import { Trophy, RotateCcw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface WinnerDisplayProps {
  winner: Player | null;
  onReset: () => void;
}

export function WinnerDisplay({ winner, onReset }: WinnerDisplayProps) {
  return (
    <AnimatePresence>
      {winner && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
        >
          <Card className="w-full max-w-sm mx-4">
            <CardContent className="pt-6 space-y-6">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="flex justify-center"
              >
                <Trophy className="w-16 h-16 text-yellow-500" />
              </motion.div>
              <motion.h2 
                className="text-2xl font-bold text-center bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
              >
                {winner.name}
              </motion.h2>
              <p className="text-center mt-2 text-muted-foreground">is driving today!</p>

              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2"
                onClick={onReset}
              >
                <RotateCcw className="w-4 h-4" />
                Try Again
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}