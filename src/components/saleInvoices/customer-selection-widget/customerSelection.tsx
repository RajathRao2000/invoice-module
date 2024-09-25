import React, { useEffect, useState, useMemo } from "react";
import { companies, states } from "@/utils/dummydata";
import { format } from "date-fns";
import { LuCalendar as CalendarIcon, LuChevronDown } from "react-icons/lu";
import { CustomerFormData, Data } from "@/utils/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { LuArrowDownLeft } from "react-icons/lu";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface CustomerSelectionProps {
  setData: React.Dispatch<React.SetStateAction<Data>>;
}
const CustomerSelection: React.FC<CustomerSelectionProps> = ({
  setData: _setData,
}) => {
  const [selected, setSelected] = useState("Select Company");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<CustomerFormData>({
    name: "",
    phoneNumber: "",
    state: "",
    date: "",
  });
  const invoice = useMemo(() => generateInvoiceNumber(), []);

  const [date, setDate] = React.useState<Date>();

  function handler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }
  useEffect(() => {
    _setData((prev) => {
      prev.form = data;
      prev.form.invoice = invoice;
      return { ...prev };
    });
  }, [data]);

  function generateInvoiceNumber() {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1000);
    return `${timestamp}${randomNum}`;
  }

  return (
    <div className="flex justify-between">
      <div>
        <div className="relative">
          <button
            className="mb-4 flex items-center gap-5 rounded-md bg-white p-5 hover:brightness-90"
            onClick={() => setOpen(!open)}
          >
            {selected}
            <LuChevronDown className={`${open && "rotate-180"}`} />
          </button>
          {open && (
            <div className="absolute z-50 flex flex-col gap-3 rounded-md bg-white p-1">
              {companies.map((company) => {
                return (
                  <button
                    className="z-50 flex items-center justify-between gap-3 bg-white p-2 hover:brightness-90"
                    onClick={() => {
                      setSelected(company.name);
                      setData(company);
                      setOpen(false);
                    }}
                    key={company.name}
                  >
                    <div className="flex w-60 flex-col items-start">
                      <p>{company.name}</p>
                      <p>{company.phoneNumber}</p>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      {company.balance}
                      <div className="rounded-lg bg-green-700 p-1">
                        <LuArrowDownLeft color="white" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <p>Billing Address</p>
          <Input name="name" value={data.name} onChange={(e) => handler(e)} />
          <Input
            type="number"
            name="phoneNumber"
            value={data.phoneNumber}
            onChange={(e) => handler(e)}
          />
          <Input name="state" value={data.state} onChange={(e) => handler(e)} />
        </div>
      </div>
      <div>
        <div>
          <p>Invoice Number:</p>
          <p>{invoice}</p>
        </div>
        <div className="datepicker">
          <p>invoice Date</p>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !date && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => {
                  setDate(date);
                  setData((prev) => {
                    prev.date = date?.toLocaleDateString();
                    return { ...prev };
                  });
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="state">
          <p>State of Supply:</p>
          <div>
            <Select
              onValueChange={(value) => {
                setData((prev) => {
                  prev.state = value;
                  return { ...prev };
                });
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(states).map((state: string) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSelection;
