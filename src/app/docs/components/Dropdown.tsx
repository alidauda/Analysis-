import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function DropDown({
  setState,
  placeholder,
  data,
  label,
}: {
  setState: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  data: string[];
  label: string;
}) {
  return (
    <Select onValueChange={(e) => setState(e)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {data.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
