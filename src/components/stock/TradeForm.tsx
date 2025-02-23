
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Stock, Transaction } from "@/data/stockList";

interface TradeFormProps {
  stock: Stock;
  onTrade: (transaction: Transaction) => void;
}

export const TradeForm = ({ stock, onTrade }: TradeFormProps) => {
  const [quantity, setQuantity] = useState<string>("");
  const { toast } = useToast();

  const getCurrentPrice = () => {
    // Mock current price - replace with real API data
    return parseFloat((Math.random() * 100 + 50).toFixed(2));
  };

  const handleTrade = (type: "buy" | "sell") => {
    if (!quantity || isNaN(parseInt(quantity)) || parseInt(quantity) <= 0) {
      toast({
        title: "Invalid quantity",
        description: "Please enter a valid number of shares",
        variant: "destructive",
      });
      return;
    }

    const currentPrice = getCurrentPrice();
    const transaction: Transaction = {
      id: Math.random().toString(36).substring(7),
      date: new Date(),
      ticker: stock.ticker,
      name: stock.name,
      sector: stock.sector,
      type,
      quantity: parseInt(quantity),
      price: currentPrice,
    };

    onTrade(transaction);
    setQuantity("");
    
    toast({
      title: `${type === "buy" ? "Bought" : "Sold"} ${quantity} shares of ${stock.ticker}`,
      description: `Price: $${currentPrice.toFixed(2)}`,
    });
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{stock.name}</h3>
          <p className="text-sm text-gray-400">{stock.sector}</p>
        </div>
        <div className="flex items-center gap-3">
          <Input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantity"
            className="w-32 bg-white/5 border-white/10"
          />
          <Button
            className="bg-emerald-600 hover:bg-emerald-700"
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
