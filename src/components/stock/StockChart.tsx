
import React, { useEffect, useRef } from "react";

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

  useEffect(() => {
    // Add TradingView script if it doesn't exist
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
          symbol: `NASDAQ:${ticker}`,
          interval: "D",
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
  }, [ticker]);

  return (
    <div className="glass-card p-6 animate-in">
      <h2 className="text-xl font-semibold mb-4">{ticker} Stock Price</h2>
      <div 
        ref={container} 
        id={`tradingview_${ticker}`} 
        className="w-full"
      />
    </div>
  );
};

export default StockChart;
