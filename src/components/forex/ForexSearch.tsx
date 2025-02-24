
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
import { forexPairs, ForexPair } from "@/data/forexList";

interface ForexSearchProps {
  onSelect: (pair: ForexPair) => void;
}

export const ForexSearch = ({ onSelect }: ForexSearchProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between bg-white border-gray-200 text-gray-900 hover:bg-gray-50"
        >
          {value || "Search currency pairs..."}
          <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search currency pairs..." />
          <CommandList>
            <CommandEmpty>No currency pair found.</CommandEmpty>
            {["major", "minor", "exotic"].map((category) => (
              <CommandGroup key={category} heading={category.charAt(0).toUpperCase() + category.slice(1) + " Pairs"}>
                {forexPairs
                  .filter((pair) => pair.category === category)
                  .map((pair) => (
                    <CommandItem
                      key={pair.pair}
                      onSelect={() => {
                        setValue(pair.pair);
                        onSelect(pair);
                        setOpen(false);
                      }}
                      className="flex items-center"
                    >
                      <span className="font-medium">{pair.pair}</span>
                      <span className="ml-2 text-sm text-gray-500">
                        {pair.description}
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
