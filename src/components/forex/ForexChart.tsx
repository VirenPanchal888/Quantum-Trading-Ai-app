
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
          width: "100%",
          height: 500,
          symbol: `FX:${pair.replace('/', '')}`,
          interval: "D",
          timezone: "Etc/UTC",
          theme: "light",
          style: "1",
          locale: "en",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          allow_symbol_change: false,
          container_id: container.current.id,
          hide_side_toolbar: false,
          studies: [
            "MASimple@tv-basicstudies",
            "RSI@tv-basicstudies",
            "MACD@tv-basicstudies"
          ],
          disabled_features: [
            "use_localstorage_for_settings"
          ],
          enabled_features: [
            "study_templates"
          ],
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
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{pair} Chart</h2>
      <div 
        ref={container} 
        id={`tradingview_forex_${pair.replace('/', '')}`} 
        className="w-full"
      />
    </div>
  );
};
