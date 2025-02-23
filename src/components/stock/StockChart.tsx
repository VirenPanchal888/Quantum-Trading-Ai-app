
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

// Mock candlestick data - replace with real API data later
const generateCandlestickData = () => {
  const data = [];
  let price = 150;
  
  for (let i = 0; i < 30; i++) {
    const open = price + (Math.random() - 0.5) * 5;
    const close = open + (Math.random() - 0.5) * 5;
    const high = Math.max(open, close) + Math.random() * 2;
    const low = Math.min(open, close) - Math.random() * 2;
    
    data.push({
      date: new Date(2024, 0, i + 1).toLocaleDateString(),
      open,
      close,
      high,
      low,
      color: close >= open ? "#10B981" : "#E11D48"
    });
    
    price = close;
  }
  
  return data;
};

interface StockChartProps {
  ticker: string;
}

const StockChart = ({ ticker }: StockChartProps) => {
  const data = generateCandlestickData();

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900/90 p-3 rounded-lg border border-white/10 shadow-xl">
          <p className="text-sm font-medium">{data.date}</p>
          <p className="text-sm">Open: ${data.open.toFixed(2)}</p>
          <p className="text-sm">Close: ${data.close.toFixed(2)}</p>
          <p className="text-sm">High: ${data.high.toFixed(2)}</p>
          <p className="text-sm">Low: ${data.low.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card p-6 h-[400px] animate-in">
      <h2 className="text-xl font-semibold mb-4">{ticker} Stock Price</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis
            dataKey="date"
            stroke="#94A3B8"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#94A3B8"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip content={<CustomTooltip />} />
          {data.map((entry, index) => (
            <React.Fragment key={index}>
              <Bar
                dataKey="high"
                fill={entry.color}
                stroke={entry.color}
              />
              <ReferenceLine
                y={entry.low}
                stroke={entry.color}
                strokeWidth={1}
              />
            </React.Fragment>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;
