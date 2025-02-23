
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data - replace with real API data later
const generateMockData = () => {
  const data = [];
  let price = 150;
  
  for (let i = 0; i < 30; i++) {
    price = price + (Math.random() - 0.5) * 10;
    data.push({
      date: new Date(2024, 0, i + 1).toLocaleDateString(),
      price: price.toFixed(2)
    });
  }
  
  return data;
};

interface StockChartProps {
  ticker: string;
}

const StockChart = ({ ticker }: StockChartProps) => {
  const data = generateMockData();

  return (
    <div className="glass-card p-6 h-[400px] animate-in">
      <h2 className="text-xl font-semibold mb-4">{ticker} Stock Price</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
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
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(17, 25, 40, 0.9)",
              border: "none",
              borderRadius: "8px",
              padding: "12px",
            }}
            labelStyle={{ color: "#94A3B8" }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#10B981"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;
