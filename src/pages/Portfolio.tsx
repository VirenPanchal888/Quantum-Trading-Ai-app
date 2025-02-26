import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Transaction } from "@/data/forexList";

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
    let amount = 0;
    
    if (transaction.transactionType === 'stock') {
      amount = transaction.quantity;
    } else if (transaction.transactionType === 'forex') {
      amount = transaction.lotSize;
    } else if (transaction.transactionType === 'ipo') {
      amount = transaction.shares;
    }
    
    const profitLoss = transaction.type === "buy" 
      ? (currentPrice - transaction.price) * amount
      : (transaction.price - currentPrice) * amount;
    const profitLossPercentage = (profitLoss / (transaction.price * amount)) * 100;

    return {
      currentPrice,
      profitLoss,
      profitLossPercentage,
    };
  };

  const getAmount = (transaction: Transaction) => {
    switch (transaction.transactionType) {
      case 'forex':
        return transaction.lotSize;
      case 'stock':
        return transaction.quantity;
      case 'ipo':
        return transaction.shares;
    }
  };

  const getTransactionDisplayInfo = (transaction: Transaction) => {
    if (transaction.transactionType === 'forex') {
      return `${transaction.pair} ${transaction.type.toUpperCase()}`;
    } else if (transaction.transactionType === 'ipo') {
      return `${transaction.symbol} ${transaction.type.toUpperCase()}`;
    } else {
      return `${transaction.ticker} ${transaction.type.toUpperCase()}`;
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto bg-white min-h-screen p-6">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-900">Portfolio</h1>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Asset</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Action</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-900">Amount</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-900">Price</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-900">Current</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-900">P/L</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {transactions.map((transaction) => {
                  const { currentPrice, profitLoss, profitLossPercentage } = calculateMetrics(transaction);
                  return (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        {transaction.date.toLocaleDateString()}
                        <div className="text-xs text-gray-500">
                          {transaction.date.toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {transaction.transactionType}
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-900">
                          {'ticker' in transaction ? transaction.ticker : transaction.pair}
                        </div>
                        <div className="text-xs text-gray-500">
                          {'sector' in transaction ? transaction.sector : 'Forex'}
                        </div>
                      </td>
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
                      <td className="px-4 py-3 text-right text-gray-900">
                        {getAmount(transaction)}
                      </td>
                      <td className="px-4 py-3 text-right text-gray-900">
                        ${transaction.price.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-right text-gray-900">
                        ${currentPrice.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span
                          className={profitLoss >= 0 ? "text-green-600" : "text-red-600"}
                        >
                          ${Math.abs(profitLoss).toFixed(2)}
                          <div className="text-xs">
                            {profitLossPercentage.toFixed(2)}%
                          </div>
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
