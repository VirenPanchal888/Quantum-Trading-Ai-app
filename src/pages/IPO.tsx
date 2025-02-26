import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { IPOData, IPOTransaction, ipoList } from "@/data/forexList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const IPO = () => {
  const [selectedIPO, setSelectedIPO] = useState<IPOData | null>(null);
  const [shares, setShares] = useState("");
  const [transactions, setTransactions] = useState<IPOTransaction[]>([]);

  const onSubscribe = (transaction: IPOTransaction) => {
    setTransactions((prev) => [...prev, transaction]);
    const savedTransactions = localStorage.getItem('ipoTransactions');
    const allTransactions = savedTransactions ? JSON.parse(savedTransactions) : [];
    localStorage.setItem('ipoTransactions', JSON.stringify([...allTransactions, transaction]));
  };

  const handleSubscribe = () => {
    if (selectedIPO) {
      const transaction: IPOTransaction = {
        id: crypto.randomUUID(),
        date: new Date(),
        symbol: selectedIPO.symbol,
        companyName: selectedIPO.companyName,
        shares: parseInt(shares),
        price: selectedIPO.offerPrice,
        type: "subscribe",
        transactionType: "ipo"
      };
      onSubscribe(transaction);
      setShares("");
    }
  };

  const calculateTotalAmount = () => {
    if (selectedIPO && shares) {
      return parseInt(shares) * selectedIPO.offerPrice;
    }
    return 0;
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto min-h-screen p-6 space-y-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent text-center pb-8">
          Upcoming IPOs
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ipoList.map((ipo) => (
            <Card
              key={ipo.symbol}
              className="bg-white/5 hover:bg-white/10 backdrop-blur-lg border border-white/20 transition-all duration-300 hover:scale-105"
              onClick={() => setSelectedIPO(ipo)}
            >
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-white">{ipo.name}</CardTitle>
                <CardDescription className="text-gray-400">{ipo.sector}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">{ipo.description.substring(0, 100)}...</p>
              </CardContent>
              <CardFooter className="justify-between">
                <span className="text-sm text-gray-400">Expected: {ipo.expectedDate}</span>
                <Button variant="secondary">View Details</Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {selectedIPO && (
          <div className="rounded-xl border border-white/20 p-6 backdrop-blur-lg bg-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">{selectedIPO.name} Subscription</h2>
            <div className="space-y-4">
              <div>
                <label className="text-white block mb-2 text-sm font-bold">
                  Number of Shares:
                </label>
                <Input
                  type="number"
                  placeholder="Enter shares"
                  value={shares}
                  onChange={(e) => setShares(e.target.value)}
                  className="bg-black/40 border-white/50 text-white placeholder:text-gray-400"
                />
              </div>
              <div>
                <label className="text-white block mb-2 text-sm font-bold">
                  Price per Share:
                </label>
                <p className="text-gray-400">${selectedIPO.offerPrice}</p>
              </div>
              <div>
                <label className="text-white block mb-2 text-sm font-bold">
                  Total Amount:
                </label>
                <p className="text-gray-400">${calculateTotalAmount()}</p>
              </div>
              <Button onClick={handleSubscribe}>Subscribe</Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default IPO;
