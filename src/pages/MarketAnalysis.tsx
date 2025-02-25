
import React from "react";
import Layout from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const marketData = [
  { date: "2024-01", sp500: 4800, nasdaq: 15200, djia: 37500 },
  { date: "2024-02", sp500: 5100, nasdaq: 16100, djia: 38900 },
  { date: "2024-03", sp500: 5300, nasdaq: 16800, djia: 39800 },
];

const MarketAnalysis = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <h1 className="text-3xl font-bold text-white">Market Analysis</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 bg-white/5 backdrop-blur-lg border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4">Major Indices</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={marketData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sp500" stroke="#8884d8" />
                <Line type="monotone" dataKey="nasdaq" stroke="#82ca9d" />
                <Line type="monotone" dataKey="djia" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default MarketAnalysis;
