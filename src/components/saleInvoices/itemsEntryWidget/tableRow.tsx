import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import SelectC from "@/components/ui/selectC";
import { Input } from "@/components/ui/input";
import { unit, gst } from "@/utils/dummydata";
import { ItemCollection } from "@/utils/types";

interface TablerowProps {
  id: string;
  index: number;
  handler: React.ChangeEventHandler<HTMLInputElement>;
  setTableData: React.Dispatch<React.SetStateAction<ItemCollection>>;
  tableData: ItemCollection;
}
const Tablerow: React.FC<TablerowProps> = ({
  id,
  index,
  handler,
  setTableData,
  tableData,
}) => {
  return (
    <TableRow>
      <TableCell className="font-medium">{index + 1}</TableCell>
      <TableCell>
        <Input
          id={`item${id}`}
          name="item"
          onChange={(e) => handler(e)}
          value={tableData[id].item}
        />
      </TableCell>
      <TableCell>
        <Input
          id={`qty${id}`}
          name="qty"
          onChange={(e) => handler(e)}
          value={tableData[id].qty || undefined}
          type="number"
        />
      </TableCell>
      <TableCell>
        <SelectC
          name="unit"
          defaultValue="BAGS (BAG)"
          onValueChange={(value) => {
            setTableData((prev) => {
              prev[id].unit = value;
              return { ...prev };
            });
          }}
          placeholder="unit"
          options={unit}
        />
      </TableCell>
      <TableCell>
        <Input
          id={`price${id}`}
          min={1}
          name="price"
          onChange={(e) => handler(e)}
          value={tableData[id].price || undefined}
          type="number"
        />
      </TableCell>
      <TableCell className="px-0 text-center">
        <div className="flex justify-between">
          <div className="w-1/2 p-0 text-center">
            <Input
              id={`dis${id}`}
              name="discount_percent"
              value={tableData[id].discount_percent || undefined}
              type="number"
              onChange={(e) => handler(e)}
            />
          </div>
          <div className="w-1/2 p-0 text-center">{tableData[id].discount}</div>
        </div>
      </TableCell>
      <TableCell className="px-0 text-center">
        <div className="flex justify-between">
          <div className="w-1/2 p-0 text-center">
            <SelectC
              defaultValue="GST@0%"
              className="w-[130px]"
              name="gst"
              onValueChange={(value) => {
                const percent = Number(
                  value.split("@")[1].replace(/[^0-9.]/g, ""),
                );
                console.log(percent);
                setTableData((prev) => {
                  prev[id] = { ...prev[id], gst: value };
                  prev[id].gstper = percent;

                  prev[id].tax = Number(
                    (
                      (percent *
                        ((prev[id].qty || 0) * (prev[id].price || 0) -
                          prev[id].discount)) /
                      100
                    ).toFixed(2),
                  );
                  prev[id].total = Number(
                    (
                      (prev[id].qty || 0) * (prev[id].price || 0) -
                      prev[id].discount +
                      prev[id].tax
                    ).toFixed(2),
                  );
                  return { ...prev };
                });
              }}
              placeholder="GST"
              options={gst}
            />
          </div>
          <div className="w-1/2 p-0 text-center">
            {tableData[id].tax || "n/a"}
          </div>
        </div>
      </TableCell>
      <TableCell>{tableData[id].total}</TableCell>
    </TableRow>
  );
};

export default Tablerow;
