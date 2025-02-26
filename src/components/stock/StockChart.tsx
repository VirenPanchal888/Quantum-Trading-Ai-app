
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    TradingView: any;
  }
}

interface StockChartProps {
  ticker: string;
}

const StockChart = ({ ticker }: StockChartProps) => {
  const container = useRef<HTMLDivElement>(null);
  const [timeframe, setTimeframe] = useState<"1D" | "1W" | "1M" | "3M" | "1Y">("1D");

  const timeframeIntervals = {
    "1D": "5",
    "1W": "15",
    "1M": "60",
    "3M": "D",
    "1Y": "W"
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;

    const config = {
      "autosize": true,
      "symbol": ticker.includes(':') ? ticker : `NYSE:${ticker}`,
      "interval": timeframeIntervals[timeframe],
      "timezone": "exchange",
      "theme": "dark",
      "style": "1",
      "locale": "en",
      "enable_publishing": false,
      "allow_symbol_change": true,
      "support_host": "https://www.tradingview.com",
      "backgroundColor": "rgba(0, 0, 0, 1)",
      "gridColor": "rgba(41, 41, 41, 1)",
      "hide_top_toolbar": false,
      "hide_side_toolbar": false,
      "withdateranges": true,
      "save_image": true,
      "studies": [
        "MASimple@tv-basicstudies",
        "RSI@tv-basicstudies",
        "MACD@tv-basicstudies"
      ],
      "container_id": `tradingview_${ticker.replace(':', '_')}`,
      "height": 600
    };

    if (container.current) {
      container.current.innerHTML = `<div class="tradingview-widget-container">
        <div id="tradingview_${ticker.replace(':', '_')}" style="height: 600px;"></div>
      </div>`;
      
      script.innerHTML = JSON.stringify(config);
      container.current.appendChild(script);
    }

    return () => {
      if (container.current) {
        container.current.innerHTML = '';
      }
    };
  }, [ticker, timeframe]);

  return (
    <div className="rounded-lg bg-black/40 backdrop-blur-xl border border-white/10 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">{ticker} Stock Price</h2>
        <div className="flex gap-2">
          {(Object.keys(timeframeIntervals) as Array<keyof typeof timeframeIntervals>).map((tf) => (
            <Button
              key={tf}
              variant={timeframe === tf ? "default" : "outline"}
              onClick={() => setTimeframe(tf)}
              className="text-sm"
            >
              {tf}
            </Button>
          ))}
        </div>
      </div>
      <div 
        ref={container}
        className="w-full relative"
      />
    </div>
  );
};

export default StockChart;
