import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles } from "lucide-react";
import { GRATITUDE_QUOTES } from "@/lib/constants";

interface GratitudePopupProps {
  open: boolean;
  onClose: () => void;
  amount: number;
  requestTitle: string;
}

export default function GratitudePopup({ open, onClose, amount, requestTitle }: GratitudePopupProps) {
  const [visibleQuotes, setVisibleQuotes] = useState(1);

  const showMore = () => {
    setVisibleQuotes((prev) => Math.min(prev + 2, GRATITUDE_QUOTES.length));
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md bg-gradient-to-br from-pink to-background border-pink sm:rounded-2xl p-0 overflow-hidden">
        <div className="p-8 text-center space-y-6">
          {/* Animated heart */}
          <div className="relative mx-auto w-20 h-20">
            <Heart className="w-20 h-20 text-accent-foreground fill-accent animate-float" />
            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-warning animate-pulse" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-accent-foreground">Thank You! 💖</h2>
            <p className="text-sm text-accent-foreground/80">
              Your donation of <span className="font-bold">₹{amount.toLocaleString("en-IN")}</span> for "{requestTitle}" has been received!
            </p>
          </div>

          {/* Quotes */}
          <div className="space-y-4">
            {GRATITUDE_QUOTES.slice(0, visibleQuotes).map((quote, i) => (
              <div
                key={i}
                className="bg-background/60 rounded-xl p-4 text-sm whitespace-pre-line animate-scale-in backdrop-blur-sm border border-border/50"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {quote}
              </div>
            ))}
          </div>

          {visibleQuotes < GRATITUDE_QUOTES.length && (
            <Button variant="outline" onClick={showMore} className="border-accent-foreground/30 text-accent-foreground hover:bg-accent/50">
              <Sparkles className="mr-2 h-4 w-4" /> See More Kind Words
            </Button>
          )}

          <Button onClick={onClose} className="w-full">
            Continue Making Impact
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
