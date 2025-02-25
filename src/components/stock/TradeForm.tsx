
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Stock, StockTransaction, AIRecommendation } from "@/data/stockList";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Brain } from "lucide-react";

interface TradeFormProps {
  stock: Stock;
  onTrade: (transaction: StockTransaction) => void;
}

export const TradeForm = ({ stock, onTrade }: TradeFormProps) => {
  const [quantity, setQuantity] = useState<string>("");
  const [prediction, setPrediction] = useState<AIRecommendation | null>(null);
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
    const transaction: StockTransaction = {
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

  const getPrediction = () => {
    // Mock AI prediction - replace with real API call
    const random = Math.random();
    let prediction: AIRecommendation;

    if (random < 0.33) {
      prediction = {
        action: "buy",
        confidence: Math.random() * 30 + 70,
        reason: "Strong upward trend in price movement and positive market sentiment.",
      };
    } else if (random < 0.66) {
      prediction = {
        action: "hold",
        confidence: Math.random() * 30 + 70,
        reason: "Stock shows stability with balanced risk indicators.",
      };
    } else {
      prediction = {
        action: "sell",
        confidence: Math.random() * 30 + 70,
        reason: "Recent decline in performance metrics and negative market trends.",
      };
    }

    setPrediction(prediction);
  };

  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">{stock.name}</h3>
          <p className="text-sm text-gray-400">{stock.sector} • Market Cap: {stock.marketCap}</p>
        </div>
        <div className="flex items-center gap-3">
          <Input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantity"
            className="w-32 bg-white/5 border-white/10 text-white"
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
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={getPrediction}>
                <Brain className="w-4 h-4 mr-2" />
                AI Prediction
              </Button>
            </DialogTrigger>
            {prediction && (
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>AI Trading Recommendation</DialogTitle>
                  <DialogDescription>
                    Based on our analysis of {stock.ticker}
                  </DialogDescription>
                </DialogHeader>
                <div className="p-4 rounded-lg bg-gray-50">
                  <div className={`text-lg font-semibold mb-2 ${
                    prediction.action === 'buy' ? 'text-emerald-600' :
                    prediction.action === 'sell' ? 'text-red-600' :
                    'text-blue-600'
                  }`}>
                    Recommendation: {prediction.action.toUpperCase()}
                  </div>
                  <div className="text-sm text-gray-600">
                    Confidence: {prediction.confidence.toFixed(1)}%
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    {prediction.reason}
                  </div>
                </div>
              </DialogContent>
            )}
          </Dialog>
        </div>
      </div>
    </div>
  );
};
