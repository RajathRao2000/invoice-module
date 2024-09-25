import React, { useEffect, useState } from "react";
import Tablerow from "./tableRow";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ItemCollection, Data } from "@/utils/types";

interface ItemsEntryProps {
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  setData: React.Dispatch<React.SetStateAction<Data>>;
}

const ItemsEntry: React.FC<ItemsEntryProps> = ({ setTotal, setData }) => {
  const [totals, setTotals] = useState({
    quantity: 0,
    discount: 0,
    tax: 0,
    total: 0,
  });
  const [tableData, setTableData] = useState<ItemCollection>({
    "1": {
      item: "",
      qty: 0,
      unit: "BAGS (BAG)",
      price: 0,
      discount_percent: 0,
      discount: 0,
      gst: "",
      gstper: 0,
      tax: 0,
      total: 0,
    },
  });

  useEffect(() => {
    setTotals((prev) => {
      prev.quantity = 0;
      prev.discount = 0;
      prev.tax = 0;
      prev.total = 0;
      return { ...prev };
    });
    Object.keys(tableData).forEach((key) => {
      setTotals((prev) => {
        prev.quantity += Number(tableData[key].qty);
        prev.discount += Number(tableData[key].discount);
        prev.tax += Number(tableData[key].tax);
        prev.total += Number(tableData[key].total);
        return { ...prev };
      });
    });
  }, [tableData]);

  useEffect(() => {
    setTotal(totals.total);
    setData((prev) => {
      prev.tableData = tableData;
      prev.totals = totals;
      return { ...prev };
    });
  }, [totals]);

  function handler(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name, id } = e.target;
    const _id = id.slice(-1);
    setTableData((prev) => {
      prev[_id] = {
        ...prev[_id],
        [name]:
          Number.isNaN(Number(value)) || value.length === 0
            ? value
            : Number(value),
      };
      if (value.length === 0) {
        prev[_id].discount = 0;
        prev[_id].total = 0;
        return { ...prev };
      }

      if (name == "discount_percent") {
        prev[_id][name] = Number(prev[_id][name]);
        prev[_id].discount = Number(
          (prev[_id].discount_percent / 100).toFixed(2),
        );
      }
      prev[_id].discount = Number(
        (prev[_id].discount_percent / 100).toFixed(2),
      );
      prev[_id].tax = Number(
        (
          (prev[_id].gstper *
            (prev[_id].qty * prev[_id].price - prev[_id].discount)) /
          100
        ).toFixed(2),
      );
      prev[_id].total = Number(
        (
          prev[_id].qty * prev[_id].price -
          prev[_id].discount +
          prev[_id].tax
        ).toFixed(2),
      );

      return { ...prev };
    });
  }

  return (
    <div className="overflow-auto">
      <Table className="min-w-[1800px] bg-white">
        <TableHeader>
          <TableRow className="*:border">
            <TableHead className="">#</TableHead>
            <TableHead className="">Item</TableHead>
            <TableHead>QTY</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead className="">Price/Unit</TableHead>
            <TableHead className="h-auto px-0 text-center">
              Discount
              <div className="flex justify-between border-t">
                <div className="w-1/2 border-r text-center">%</div>
                <div className="w-1/2 p-0 text-center">Amount</div>
              </div>
            </TableHead>
            <TableHead className="px-0 text-center">
              Tax
              <div className="flex justify-between border-t">
                <div className="w-1/2 border-r p-0 text-center">%</div>
                <div className="w-1/2 p-0 text-center">Amount</div>
              </div>
            </TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.keys(tableData).map((key, index) => {
            return (
              <Tablerow
                index={index}
                key={key}
                id={key}
                handler={handler}
                setTableData={setTableData}
                tableData={tableData}
              />
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell></TableCell>
            <TableCell className="flex items-center justify-between">
              <Button
                onClick={() => {
                  let arr = Object.keys(tableData);
                  let key = (Number(arr[arr.length - 1]) + 1).toString();
                  setTableData((prev) => {
                    prev[key] = {
                      item: "",
                      qty: 0,
                      unit: "BAGS (BAG)",
                      price: 0,
                      discount_percent: 0,
                      discount: 0,
                      gst: "",
                      gstper: 0,
                      tax: 0,
                      total: 0,
                    };
                    return { ...prev };
                  });
                }}
              >
                Add Row
              </Button>
              Total
            </TableCell>
            <TableCell>{totals.quantity}</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell className="px-0 text-center">
              <div className="flex justify-between">
                <TableCell className="w-1/2 p-0 text-center"></TableCell>
                <TableCell className="w-1/2 p-0 text-center">
                  {totals.discount}
                </TableCell>
              </div>
            </TableCell>
            <TableCell className="px-0 text-center">
              <div className="flex justify-between">
                <TableCell className="w-1/2 p-0 text-center"></TableCell>
                <TableCell className="w-1/2 p-0 text-center">
                  {totals.tax}
                </TableCell>
              </div>
            </TableCell>
            <TableCell>{totals.total}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default ItemsEntry;
