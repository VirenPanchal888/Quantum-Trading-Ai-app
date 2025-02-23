
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Transaction } from "@/data/stockList";

const Portfolio = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const savedTransactions = localStorage.getItem("transactions");
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions).map((t: Transaction) => ({
        ...t,
        date: new Date(t.date),
      })));
    }
  }, []);

  const calculateMetrics = (transaction: Transaction) => {
    // Mock current price - replace with real API data
    const currentPrice = Math.random() * 100 + 50;
    const profitLoss = transaction.type === "buy" 
      ? (currentPrice - transaction.price) * transaction.quantity
      : (transaction.price - currentPrice) * transaction.quantity;
    const profitLossPercentage = (profitLoss / (transaction.price * transaction.quantity)) * 100;

    return {
      currentPrice,
      profitLoss,
      profitLossPercentage,
    };
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="glass-card p-6">
          <h1 className="text-2xl font-bold mb-6">Portfolio</h1>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-3">Date</th>
                  <th className="text-left p-3">Stock</th>
                  <th className="text-left p-3">Type</th>
                  <th className="text-right p-3">Quantity</th>
                  <th className="text-right p-3">Price</th>
                  <th className="text-right p-3">Current</th>
                  <th className="text-right p-3">P/L</th>
                  <th className="text-right p-3">P/L %</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => {
                  const { currentPrice, profitLoss, profitLossPercentage } = calculateMetrics(transaction);
                  return (
                    <tr
                      key={transaction.id}
                      className="border-b border-white/5 hover:bg-white/5"
                    >
                      <td className="p-3">
                        {transaction.date.toLocaleDateString()}
                        <div className="text-xs text-gray-400">
                          {transaction.date.toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="font-medium">{transaction.ticker}</div>
                        <div className="text-xs text-gray-400">{transaction.sector}</div>
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            transaction.type === "buy"
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-rose-500/20 text-rose-400"
                          }`}
                        >
                          {transaction.type}
                        </span>
                      </td>
                      <td className="p-3 text-right">{transaction.quantity}</td>
                      <td className="p-3 text-right">${transaction.price.toFixed(2)}</td>
                      <td className="p-3 text-right">${currentPrice.toFixed(2)}</td>
                      <td className="p-3 text-right">
                        <span
                          className={profitLoss >= 0 ? "text-emerald-400" : "text-rose-400"}
                        >
                          ${Math.abs(profitLoss).toFixed(2)}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <span
                          className={profitLossPercentage >= 0 ? "text-emerald-400" : "text-rose-400"}
                        >
                          {profitLossPercentage.toFixed(2)}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Portfolio;
