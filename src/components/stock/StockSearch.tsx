
import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Mock data - replace with real API data later
const mockStocks = [
  { ticker: "AAPL", name: "Apple Inc.", sector: "Technology" },
  { ticker: "GOOGL", name: "Alphabet Inc.", sector: "Technology" },
  { ticker: "MSFT", name: "Microsoft Corporation", sector: "Technology" },
  { ticker: "AMZN", name: "Amazon.com Inc.", sector: "Consumer Cyclical" },
  { ticker: "META", name: "Meta Platforms Inc.", sector: "Technology" },
];

interface Stock {
  ticker: string;
  name: string;
  sector: string;
}

interface StockSearchProps {
  onSelect: (stock: Stock) => void;
}

const StockSearch = ({ onSelect }: StockSearchProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-white/5 border-white/10 hover:bg-white/10"
        >
          {value ? value : "Search stocks..."}
          <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search stocks..." />
          <CommandList>
            <CommandEmpty>No stocks found.</CommandEmpty>
            {Object.entries(
              mockStocks.reduce((acc, stock) => {
                if (!acc[stock.sector]) {
                  acc[stock.sector] = [];
                }
                acc[stock.sector].push(stock);
                return acc;
              }, {} as Record<string, Stock[]>)
            ).map(([sector, stocks]) => (
              <CommandGroup key={sector} heading={sector}>
                {stocks.map((stock) => (
                  <CommandItem
                    key={stock.ticker}
                    onSelect={() => {
                      setValue(stock.ticker);
                      onSelect(stock);
                      setOpen(false);
                    }}
                    className="flex items-center"
                  >
                    <span className="font-medium">{stock.ticker}</span>
                    <span className="ml-2 text-sm text-muted-foreground">
                      {stock.name}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StockSearch;
