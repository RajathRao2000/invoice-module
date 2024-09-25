import React from "react";
import { SelectProps } from "@radix-ui/react-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectCProps extends SelectProps {
  placeholder: string;
  options: string[];
  className?: string;
}
const SelectC: React.FC<SelectCProps> = ({
  className,
  placeholder,
  options,
  onValueChange,
  name,
  defaultValue,
}) => {
  return (
    <Select
      defaultValue={defaultValue}
      name={name}
      onValueChange={onValueChange}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectC;
