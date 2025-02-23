
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { ForexSearch } from "@/components/forex/ForexSearch";
import { ForexChart } from "@/components/forex/ForexChart";
import { ForexTradeForm } from "@/components/forex/ForexTradeForm";
import { ForexPair, ForexTransaction } from "@/data/forexList";

const Forex = () => {
  const [selectedPair, setSelectedPair] = useState<ForexPair | null>(null);
  const [transactions, setTransactions] = useState<ForexTransaction[]>([]);

  useEffect(() => {
    const savedTransactions = localStorage.getItem("forexTransactions");
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions).map((t: ForexTransaction) => ({
        ...t,
        date: new Date(t.date),
      })));
    }
  }, []);

  const handleTrade = (transaction: ForexTransaction) => {
    setTransactions(prev => {
      const newTransactions = [...prev, transaction];
      localStorage.setItem("forexTransactions", JSON.stringify(newTransactions));
      return newTransactions;
    });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6 bg-white min-h-screen">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Forex Trading</h1>
            <ForexSearch onSelect={setSelectedPair} />
          </div>

          {selectedPair && (
            <>
              <ForexChart pair={selectedPair.symbol} />
              <ForexTradeForm pair={selectedPair} onTrade={handleTrade} />
            </>
          )}

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Trades</h2>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Pair</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Type</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-900">Lot Size</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-900">Price</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-900">P/L</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {transaction.date.toLocaleDateString()}
                        <div className="text-xs text-gray-500">
                          {transaction.date.toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{transaction.pair}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            transaction.type === "buy"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {transaction.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">{transaction.lotSize}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">${transaction.price.toFixed(4)}</td>
                      <td className="px-4 py-3 text-sm text-right">
                        <span
                          className={transaction.profitLoss && transaction.profitLoss >= 0 
                            ? "text-green-600" 
                            : "text-red-600"}
                        >
                          ${transaction.profitLoss?.toFixed(2) || "0.00"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Forex;
