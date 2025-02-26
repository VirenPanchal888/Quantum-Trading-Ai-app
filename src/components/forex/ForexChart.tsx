
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    TradingView: any;
  }
}

interface ForexChartProps {
  pair: string;
}

export const ForexChart = ({ pair }: ForexChartProps) => {
  const container = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

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
          autosize: true,
          symbol: `FX:${pair.replace('/', '')}`,
          interval: "D",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "en",
          toolbar_bg: "#1e293b",
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: container.current.id,
          hide_side_toolbar: false,
          studies: [
            "MASimple@tv-basicstudies",
            "RSI@tv-basicstudies",
            "MACD@tv-basicstudies",
            "StochasticRSI@tv-basicstudies"
          ],
          withdateranges: true,
          range: "YTD",
          height: 600,
          save_image: true,
          show_popup_button: true,
        });
      }
    }

    return () => {
      if (container.current) {
        container.current.innerHTML = '';
      }
    };
  }, [pair]);

  return (
    <div className="rounded-lg border border-gray-800 bg-black/40 p-6">
      <h2 className="text-xl font-semibold text-white mb-4">{pair} Chart</h2>
      <div 
        ref={container} 
        id={`tradingview_forex_${pair.replace('/', '')}`} 
        className="w-full h-[600px]"
      />
    </div>
  );
};
