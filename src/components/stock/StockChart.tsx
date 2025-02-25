
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
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const [timeframe, setTimeframe] = useState<"1D" | "1W" | "1M" | "3M" | "1Y">("1D");

  const timeframeIntervals = {
    "1D": "5",
    "1W": "15",
    "1M": "60",
    "3M": "D",
    "1Y": "W"
  };

  useEffect(() => {
    if (!scriptRef.current) {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/tv.js';
      script.async = true;
      script.onload = () => initializeWidget();
      document.body.appendChild(script);
      scriptRef.current = script;
    } else {
      initializeWidget();
    }

    function initializeWidget() {
      if (container.current && window.TradingView) {
        container.current.innerHTML = '';
        new window.TradingView.widget({
          width: "100%",
          height: 500,
          symbol: ticker.includes(':') ? ticker : `NYSE:${ticker}`,
          interval: timeframeIntervals[timeframe],
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "en",
          toolbar_bg: "#1e293b",
          enable_publishing: false,
          allow_symbol_change: false,
          container_id: container.current.id,
          hide_side_toolbar: false,
          studies: [
            "MASimple@tv-basicstudies",
            "VWAP@tv-basicstudies"
          ],
          disabled_features: [
            "use_localstorage_for_settings"
          ],
          enabled_features: [
            "hide_left_toolbar_by_default"
          ],
        });
      }
    }

    return () => {
      if (container.current) {
        container.current.innerHTML = '';
      }
    };
  }, [ticker, timeframe]);

  return (
    <div className="glass-card p-6 animate-in">
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
        id={`tradingview_${ticker}`} 
        className="w-full"
      />
    </div>
  );
};

export default StockChart;
