import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { IPOData, IPOTransaction, ipoList } from "@/data/forexList";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const IPO = () => {
  const [selectedIPO, setSelectedIPO] = useState<IPOData | null>(null);
  const { toast } = useToast();

  const handleSubscribe = (ipo: IPOData, shares: number) => {
    const transaction: IPOTransaction = {
      id: Math.random().toString(36).substring(7),
      date: new Date(),
      type: 'buy',
      price: ipo.offerPrice,
      ticker: ipo.ticker,
      name: ipo.name,
      sector: ipo.sector,
      shares,
      transactionType: 'ipo'
    };

    // Save to localStorage
    const savedTransactions = localStorage.getItem('transactions');
    const transactions = savedTransactions ? JSON.parse(savedTransactions) : [];
    localStorage.setItem('transactions', JSON.stringify([...transactions, transaction]));

    toast({
      title: "IPO Subscription Successful",
      description: `Subscribed to ${shares} shares of ${ipo.name} at $${ipo.offerPrice} per share`,
    });
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto bg-white min-h-screen p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Initial Public Offerings</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ipoList.map((ipo) => (
            <div
              key={ipo.ticker}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{ipo.name}</h3>
                  <p className="text-sm text-gray-500">{ipo.ticker} - {ipo.sector}</p>
                </div>
                
                <p className="text-sm text-gray-600">{ipo.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Offer Price</p>
                    <p className="font-medium text-gray-900">${ipo.offerPrice}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Shares Offered</p>
                    <p className="font-medium text-gray-900">{(ipo.shares / 1000000).toFixed(1)}M</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Market Cap</p>
                    <p className="font-medium text-gray-900">${(ipo.marketCap / 1000000).toFixed(1)}M</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Listing Date</p>
                    <p className="font-medium text-gray-900">{new Date(ipo.listingDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="pt-4">
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => handleSubscribe(ipo, 100)}
                  >
                    Subscribe to IPO
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default IPO;
