
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Stock } from "@/data/stockList";
import StockSearch from "@/components/stock/StockSearch";
import StockChart from "@/components/stock/StockChart";

interface OptionOrder {
  type: "call" | "put";
  strike: number;
  expiry: string;
  premium: number;
  quantity: number;
}

const Options = () => {
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [optionType, setOptionType] = useState<"call" | "put">("call");
  const [strike, setStrike] = useState("");
  const [expiry, setExpiry] = useState("");
  const [quantity, setQuantity] = useState("");
  const { toast } = useToast();

  const expiryDates = [
    "2024-04-19",
    "2024-05-17",
    "2024-06-21",
    "2024-07-19",
    "2024-08-16"
  ];

  const calculatePremium = (strike: string, type: "call" | "put") => {
    // Mock premium calculation - replace with real options pricing model
    const basePrice = 100; // Mock current stock price
    const strikePrice = parseFloat(strike);
    const timeFactor = 0.5; // Time to expiration factor
    const volatility = 0.3; // Mock volatility

    if (type === "call") {
      return Math.max(0, (basePrice - strikePrice) * timeFactor * volatility);
    } else {
      return Math.max(0, (strikePrice - basePrice) * timeFactor * volatility);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStock || !strike || !expiry || !quantity) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const premium = calculatePremium(strike, optionType);
    const order: OptionOrder = {
      type: optionType,
      strike: parseFloat(strike),
      expiry,
      premium,
      quantity: parseInt(quantity),
    };

    toast({
      title: "Option Order Placed",
      description: `${quantity} ${optionType.toUpperCase()} options for ${selectedStock.ticker} at strike $${strike}`,
    });

    // Reset form
    setStrike("");
    setQuantity("");
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Options Trading</h1>
          <p className="text-gray-400 mt-2">Trade stock options with advanced analytics</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {!selectedStock ? (
              <div className="glass-card p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Select a Stock</h2>
                <StockSearch onSelect={setSelectedStock} />
              </div>
            ) : (
              <>
                <StockChart ticker={selectedStock.ticker} />
                <div className="glass-card p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm text-gray-400">Option Type</label>
                        <Select
                          value={optionType}
                          onValueChange={(value: "call" | "put") => setOptionType(value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="call">Call</SelectItem>
                            <SelectItem value="put">Put</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-gray-400">Strike Price</label>
                        <Input
                          type="number"
                          value={strike}
                          onChange={(e) => setStrike(e.target.value)}
                          placeholder="Enter strike price"
                          className="bg-white/5 border-white/10 text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm text-gray-400">Expiry Date</label>
                        <Select
                          value={expiry}
                          onValueChange={setExpiry}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select expiry" />
                          </SelectTrigger>
                          <SelectContent>
                            {expiryDates.map((date) => (
                              <SelectItem key={date} value={date}>
                                {date}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-gray-400">Quantity</label>
                        <Input
                          type="number"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          placeholder="Enter quantity"
                          className="bg-white/5 border-white/10 text-white"
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full">
                      Place Option Order
                    </Button>
                  </form>
                </div>
              </>
            )}
          </div>

          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Options Chain</h2>
            {selectedStock ? (
              <div className="space-y-4">
                <div className="text-sm text-gray-400">
                  Selected Stock: {selectedStock.ticker}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-white font-medium mb-2">Calls</h3>
                    <div className="space-y-2">
                      {[90, 95, 100, 105, 110].map((strike) => (
                        <div key={`call-${strike}`} className="flex justify-between text-sm">
                          <span className="text-gray-400">Strike ${strike}</span>
                          <span className="text-gray-400">${calculatePremium(strike.toString(), "call").toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-2">Puts</h3>
                    <div className="space-y-2">
                      {[90, 95, 100, 105, 110].map((strike) => (
                        <div key={`put-${strike}`} className="flex justify-between text-sm">
                          <span className="text-gray-400">Strike ${strike}</span>
                          <span className="text-gray-400">${calculatePremium(strike.toString(), "put").toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-400">Select a stock to view options chain</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Options;
