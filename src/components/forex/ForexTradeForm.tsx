
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { ForexPair, ForexTransaction } from "@/data/forexList";

interface ForexTradeFormProps {
  pair: ForexPair;
  onTrade: (transaction: ForexTransaction) => void;
}

export const ForexTradeForm = ({ pair, onTrade }: ForexTradeFormProps) => {
  const [lotSize, setLotSize] = useState<string>("");
  const { toast } = useToast();

  const getCurrentPrice = () => {
    // Mock current price - replace with real API data
    return parseFloat((Math.random() * 2 + 1).toFixed(4));
  };

  const handleTrade = (type: "buy" | "sell") => {
    if (!lotSize || isNaN(parseFloat(lotSize)) || parseFloat(lotSize) <= 0) {
      toast({
        title: "Invalid lot size",
        description: "Please enter a valid lot size",
        variant: "destructive",
      });
      return;
    }

    const currentPrice = getCurrentPrice();
    const transaction: ForexTransaction = {
      id: Math.random().toString(36).substring(7),
      date: new Date(),
      type,
      price: currentPrice,
      pair: pair.symbol,
      lotSize: parseFloat(lotSize),
      leverage: 100,
      transactionType: 'forex'
    };

    onTrade(transaction);
    setLotSize("");
    
    toast({
      title: `${type === "buy" ? "Bought" : "Sold"} ${lotSize} lots of ${pair.symbol}`,
      description: `Price: ${currentPrice.toFixed(4)}`,
    });
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{pair.name}</h3>
          <p className="text-sm text-gray-500">{pair.category.charAt(0).toUpperCase() + pair.category.slice(1)} Pair</p>
        </div>
        <div className="flex items-center gap-3">
          <Input
            type="number"
            value={lotSize}
            onChange={(e) => setLotSize(e.target.value)}
            placeholder="Lot size"
            className="w-32 bg-white border-gray-200"
            step="0.01"
            min="0.01"
          />
          <Button
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={() => handleTrade("buy")}
          >
            Buy
          </Button>
          <Button
            variant="destructive"
            onClick={() => handleTrade("sell")}
          >
            Sell
          </Button>
        </div>
      </div>
    </div>
  );
};
