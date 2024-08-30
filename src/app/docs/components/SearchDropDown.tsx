import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { CheckedState } from "@radix-ui/react-checkbox";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  label: string;
  setState: Dispatch<SetStateAction<string[]>>;
  setSearch: Dispatch<SetStateAction<string>>;
  search: string;
  data: string[];
  value: string[];
}

export default function SearchDropDown({
  label,
  setState,
  search,
  setSearch,
  data,
  value,
}: Props) {
  const [selectAll, setSelectAll] = useState(true);

  const handleSelectAllChange = (e: CheckedState) => {
    const newSelectAll = !selectAll;
    // Update the selectAll state
    setSelectAll(newSelectAll);
    // Update the state of all checkboxes based on the newSelectAll value
    setState(newSelectAll ? value : []);
  };
  const handleCheckboxChange = ({
    e,
  }: {
    e: { value: string; checked: CheckedState };
  }) => {
    const { value, checked } = e;

    if (checked) {
      // Add the checked item to the array
      setState((prevItems) => [...prevItems, value]);
    } else {
      // Remove the unchecked item from the array
      setState((prevItems) => prevItems.filter((item) => item !== value));
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="w-56 shadow p-1 rounded border hover:cursor-pointer">
          {label}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-56 space-y-4 h-56 overflow-y-auto">
        <div>
          <Input
            type="search"
            placeholder="search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="all"
            checked={selectAll}
            onCheckedChange={handleSelectAllChange}
          />
          <label
            htmlFor="all"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            all
          </label>
        </div>
        {value
          .filter((item) =>
            item.toLowerCase().includes(search.trim().toLowerCase())
          )
          .map((item) => (
            <div className="flex items-center space-x-2" key={item}>
              <Checkbox
                id={item}
                value={item}
                checked={data.includes(item)}
                onCheckedChange={(e) =>
                  handleCheckboxChange({
                    e: {
                      checked: e,
                      value: item,
                    },
                  })
                }
              />
              <label
                htmlFor={item}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {item}
              </label>
            </div>
          ))}
      </PopoverContent>
    </Popover>
  );
}
